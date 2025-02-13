/*
  # Fix Signup and Profile Creation

  1. Changes
    - Drop and recreate policies with proper permissions
    - Update trigger function to better handle profile creation
    - Add policy for authenticated users to create their own profiles
    - Ensure proper error handling in trigger function

  2. Security
    - Maintain RLS while allowing proper profile creation
    - Ensure users can only access their own data
    - Allow service role necessary permissions
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON profiles;
DROP POLICY IF EXISTS "Enable update for users based on id" ON profiles;

-- Create comprehensive policies
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Service role full access"
  ON profiles
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Improved trigger function with better error handling
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  BEGIN
    INSERT INTO public.profiles (id, name)
    VALUES (
      NEW.id,
      COALESCE(
        NEW.raw_user_meta_data->>'name',
        SPLIT_PART(NEW.email, '@', 1)
      )
    )
    ON CONFLICT (id) DO UPDATE
    SET name = EXCLUDED.name
    WHERE profiles.name IS NULL;
  EXCEPTION WHEN OTHERS THEN
    -- Log error details but don't prevent user creation
    RAISE NOTICE 'Error creating profile for user %: %', NEW.id, SQLERRM;
  END;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE handle_new_user();