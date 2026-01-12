// lib/personalization.js
import { supabase } from '../services/supabaseClient';

// Fetch personalized posts based on tags user might care about
export const fetchPersonalizedPosts = async (user) => {
  const tagsYouCareAbout = ['tech', 'news']; // Placeholder logic: Replace with user-based tags later

  const { data, error } = await supabase
    .from('posts')
    .select('*') // Select all post fields
    .contains('tags', tagsYouCareAbout) // Filter posts that contain any of the preferred tags
    .order('created_at', { ascending: false }); // Sort by most recent

  if (error) {
    console.error('Personalized Feed Error:', error); // Log any errors
    return []; // Return empty array on error
  }

  return data; // Return fetched posts
};
