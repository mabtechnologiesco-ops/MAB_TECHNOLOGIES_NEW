/*
# Create enquiries table for MAB Technologies contact form

1. New Tables
- `enquiries`
  - `id` (uuid, primary key)
  - `name` (text, not null) — submitter's full name
  - `business_name` (text, nullable) — optional business name
  - `email` (text, not null) — contact email
  - `phone` (text, nullable) — optional phone number
  - `service_requested` (text, not null) — selected service category
  - `package_requested` (text, nullable) — optional selected pricing package
  - `project_description` (text, not null) — free-text project details
  - `status` (text, not null, default 'new') — enquiry workflow status
  - `created_at` (timestamptz, default now())
  - `source` (text, nullable) — origin of the enquiry (contact_form, ai_assistant, pricing_card, etc.)

2. Security
- Enable RLS on `enquiries`.
- INSERT: allow anon + authenticated to create new enquiries (public contact form + AI assistant).
- SELECT / UPDATE / DELETE: deny public access. Only service role (admin) can read/manage enquiries.
  This ensures visitors cannot read other customers' private enquiries.
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  business_name text,
  email text NOT NULL,
  phone text,
  service_requested text NOT NULL,
  package_requested text,
  project_description text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  source text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_enquiries" ON enquiries;
CREATE POLICY "public_insert_enquiries"
ON enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "public_select_enquiries" ON enquiries;
DROP POLICY IF EXISTS "public_update_enquiries" ON enquiries;
DROP POLICY IF EXISTS "public_delete_enquiries" ON enquiries;
