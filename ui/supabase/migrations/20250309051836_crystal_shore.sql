/*
  # Create websites monitoring table

  1. New Tables
    - `websites`
      - `id` (uuid, primary key)
      - `url` (text, not null)
      - `name` (text, not null)
      - `is_online` (boolean)
      - `last_checked` (timestamp)
      - `created_at` (timestamp)
      - `check_interval` (integer, minutes)

  2. Security
    - Enable RLS on `websites` table
    - Add policy for full access (private website)
*/

CREATE TABLE IF NOT EXISTS websites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  name text NOT NULL,
  is_online boolean DEFAULT true,
  last_checked timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  check_interval integer DEFAULT 5
);

-- Enable RLS
ALTER TABLE websites ENABLE ROW LEVEL SECURITY;

-- Allow all operations (private website)
CREATE POLICY "Allow all operations" ON websites
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);