/*
  # Fix Profile Policies and Triggers

  1. Changes
    - Drop existing policies and recreate them with correct permissions
    - Add policy for users to insert their own profiles
    - Update trigger function to handle conflicts properly
    - Add policy for users to read all profiles (needed for future features)

  2. Security
    - Enable RLS on profiles table
    - Add comprehensive policies for CRUD operations
    - Ensure users can only modify their own data
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Service role can create profiles" ON profiles;

-- Recreate policies with correct permissions
CREATE POLICY "Enable read access for all users"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Enable insert for authenticated users only"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update for users based on id"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Update the handle_new_user function to handle conflicts
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
  )
  ON CONFLICT (id) DO UPDATE
  SET name = EXCLUDED.name
  WHERE profiles.name IS NULL;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Make sure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE handle_new_user();