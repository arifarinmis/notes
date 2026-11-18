-- ============================================================================
-- THINGSYOURNEED.COM - NFC SUB-APP (notes.thingsyourneed.com)
-- Supabase Database Schema (Zero-Knowledge Privacy Separated Architecture)
-- ============================================================================

-- 1. ADMIN METADATA TABLE (No list content or item names are EVER stored here)
CREATE TABLE IF NOT EXISTS public.nfc_accounts (
  slot INTEGER PRIMARY KEY CHECK (slot >= 1 AND slot <= 1000),
  token TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'passive')),
  admin_note TEXT NOT NULL DEFAULT '',
  last_accessed_at TIMESTAMPTZ,
  item_count INTEGER NOT NULL DEFAULT 0 CHECK (item_count >= 0 AND item_count <= 1000),
  list_count INTEGER NOT NULL DEFAULT 0,
  reset_version INTEGER NOT NULL DEFAULT 1,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. USER ENCRYPTED VAULT TABLE (Client-side AES-GCM encrypted payload)
-- Admin panel never queries this table, and payloads are encrypted using the user's token.
CREATE TABLE IF NOT EXISTS public.nfc_vaults (
  token_hash TEXT PRIMARY KEY,
  encrypted_payload TEXT NOT NULL,
  reset_version INTEGER NOT NULL DEFAULT 1,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.nfc_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nfc_vaults ENABLE ROW LEVEL SECURITY;

-- Policies for passwordless NFC token access & Admin management
CREATE POLICY "Allow public read/update on nfc_accounts"
  ON public.nfc_accounts
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public access to encrypted nfc_vaults"
  ON public.nfc_vaults
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Enable Realtime for instant multi-phone sync when scanning the same NFC tag
ALTER PUBLICATION supabase_realtime ADD TABLE public.nfc_accounts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.nfc_vaults;
