// services/supabaseClient.js
// Supabase client using environment variables

import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from '../env'; // from env.js

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
