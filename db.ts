import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseApiKey = process.env.SUPABASE_API_KEY || '';

export const db = createClient(supabaseUrl, supabaseApiKey);
