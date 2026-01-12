// env.js
// Central place to export Supabase env variables

import Constants from 'expo-constants';

// Export the Supabase URL and API key from app.config.js
export const supabaseUrl = Constants.expoConfig.extra.supabaseUrl;
export const supabaseAnonKey = Constants.expoConfig.extra.supabaseAnonKey;
