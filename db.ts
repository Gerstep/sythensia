import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config()

console.log('SUPABASE: ' + process.env.SUPABASE_URL + ' pwd ' + process.env.SUPABASE_API_KEY)
const supabaseUrl: string = process.env.SUPABASE_URL as string;
const supabaseApiKey: string = process.env.SUPABASE_API_KEY as string;

export const db = createClient("https://iolaelmcstjuiddlhwym.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvbGFlbG1jc3RqdWlkZGxod3ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyMjIwNDIsImV4cCI6MTk5Njc5ODA0Mn0.qqGSnRm2QvPGVKNg4CM_OAN3WYrl4GffFAGFkbgk08E");
