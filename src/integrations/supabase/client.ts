import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://prwputlmcjmusorpnzwu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByd3B1dGxtY2ptdXNvcnBuend1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4Nzc1ODYsImV4cCI6MjA4NjQ1MzU4Nn0.1QGLrftbbpyimtcYc-8ih80wtspGfeLqqEHscN-ZoEw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
