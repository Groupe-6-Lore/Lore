import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://beywnoejybmflodwfyfh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJleXdub2VqeWJtZmxvZHdmeWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMzU2MTEsImV4cCI6MjA3MjkxMTYxMX0.16m5Rd76S00tXDXM_MB5hGp2ZW3A2R8P5RotnQpECcY'

export const supabase = createClient(supabaseUrl, supabaseKey)