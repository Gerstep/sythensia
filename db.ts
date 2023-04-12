import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config()

console.log('SUPABASE: ' + process.env.SUPABASE_URL)
const supabaseUrl: string = process.env.SUPABASE_URL as string;
const supabaseApiKey: string = process.env.SUPABASE_API_KEY as string;

export const db = createClient(supabaseUrl, supabaseApiKey);
