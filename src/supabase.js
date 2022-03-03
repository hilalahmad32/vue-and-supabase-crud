
import { createClient } from '@supabase/supabase-js'
const url = "";
const key = "";
export const supabase = createClient(url, key);
