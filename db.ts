import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config()

export const db = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_API_KEY
)