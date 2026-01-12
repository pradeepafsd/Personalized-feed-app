// app.config.js
// Inject .env variables into your Expo app

import 'dotenv/config'; // Load variables from .env

export default () => ({
  expo: {
    name: 'MyApp',
    slug: 'my-app',
    version: '1.0.0',

    // Inject Supabase credentials via "extra"
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
  },
});
