/*
  # Add Wishlist Feature

  1. New Tables
    - `wishlists`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `product_id` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on wishlists table
    - Add policies for authenticated users to manage their wishlist
*/

CREATE TABLE IF NOT EXISTS wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  product_id integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own wishlist
CREATE POLICY "Users can view own wishlist"
  ON wishlists
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to add items to their wishlist
CREATE POLICY "Users can add to wishlist"
  ON wishlists
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to remove items from their wishlist
CREATE POLICY "Users can remove from wishlist"
  ON wishlists
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);