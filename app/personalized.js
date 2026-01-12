// app/personalized.js
import { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchPersonalizedPosts } from '../lib/personalization'; // Custom logic to get personalized posts
import { supabase } from '../services/supabaseClient';
import PostCard from '../components/PostCard';

export default function PersonalizedFeed() {
  const [posts, setPosts] = useState([]); // Store personalized posts
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch personalized posts for the logged-in user
  const getPersonalized = async () => {
    const { data: { user } } = await supabase.auth.getUser(); // Get current user
    const personalized = await fetchPersonalizedPosts(user); // Call personalization logic
    setPosts(personalized); // Store posts in state
    setLoading(false); // Stop loading indicator
  };

  useEffect(() => {
    getPersonalized(); // Run once on component mount
  }, []);

  // Show spinner while loading
  if (loading) return <ActivityIndicator style={styles.loader} size="large" />;

  return (
    <View style={styles.container}>
      {/* Render personalized posts using FlatList */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </View>
  );
}

// Styles for personalized feed screen
const styles = StyleSheet.create({
  container: { padding: 10, paddingTop: 40 }, // Outer container style
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' }, // Centered loader
});
