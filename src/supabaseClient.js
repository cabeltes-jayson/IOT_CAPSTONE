// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yioqcpzasigmtylocxam.supabase.co';
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlpb3FjcHphc2lnbXR5bG9jeGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxNDU5NjIsImV4cCI6MjA0NDcyMTk2Mn0.eumzrEwSdS4iOYmLJqdzqCf1wmdduNXAwGjHDbyiPH0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
