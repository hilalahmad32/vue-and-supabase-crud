
import { createClient } from '@supabase/supabase-js'
const url = "https://hnodwvzrqawesibnayjf.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhub2R3dnpycWF3ZXNpYm5heWpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYyODg2MDcsImV4cCI6MTk2MTg2NDYwN30.YHUPjTf2roloInpjtALqDohJhGDTQhpqP83uB2BdPeQ"

export const supabase = createClient(url, key);
