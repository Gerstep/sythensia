import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config()

export const db = createClient(
  SUPABASE_URL, 
  SUPABASE_API_KEY
)