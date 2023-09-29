import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fjijtepdkallxqysrfqf.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
export const DBConn = createClient(supabaseUrl, supabaseKey);