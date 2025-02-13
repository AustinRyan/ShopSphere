/*
  # Fix Profile Creation and Wishlist Functionality

  1. Changes
    - Drop and recreate profiles table with proper constraints
    - Drop and recreate wishlists table with proper constraints
    - Add proper RLS policies for both tables
    - Add improved trigger for automatic profile creation on signup
    - Add service role policies for system operations

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
    - Add service role policies
*/

-- First, drop existing tables if they exist
DROP TABLE IF EXISTS wishlists;
DROP TABLE IF EXISTS profiles;

-- Create profiles table with NOT NULL constraints where needed
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL DEFAULT 'User',
  phone text,
  address text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Service role can manage all profiles"
  ON profiles
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create wishlists table with proper constraints
CREATE TABLE wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS on wishlists
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies for wishlists
CREATE POLICY "Users can view own wishlist"
  ON wishlists FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into own wishlist"
  ON wishlists FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from own wishlist"
  ON wishlists FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create an improved trigger function for profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_name text;
BEGIN
  -- Get the name from metadata or create one from email
  new_name := COALESCE(
    NEW.raw_user_meta_data->>'name',
    SPLIT_PART(NEW.email, '@', 1),
    'User'
  );

  -- Insert the profile immediately after user creation
  INSERT INTO public.profiles (
    id,
    name,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    new_name,
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    name = EXCLUDED.name,
    updated_at = now()
  WHERE profiles.name IS NULL;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log error but don't prevent user creation
  RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
  
  -- Try one more time with default values
  BEGIN
    INSERT INTO public.profiles (id, name)
    VALUES (NEW.id, 'User')
    ON CONFLICT (id) DO NOTHING;
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Fallback profile creation failed: %', SQLERRM;
  END;
  
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;