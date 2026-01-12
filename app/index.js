// app/index.js
import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { supabase } from '../services/supabaseClient';
import PostCard from '../components/PostCard';

export default function GlobalFeed() {
  const [posts, setPosts] = useState([]); // Store fetched posts
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false }); // Latest posts first

    if (error) {
      console.error(error);
      Alert.alert('Error fetching posts'); // Show alert if error occurs
    } else {
      setPosts(data); // Update state with fetched posts
    }

    setLoading(false); // Stop loading indicator
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
  }, []);

  // Show loading spinner while fetching
  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <View style={styles.container}>
      {/* Display list of posts using FlatList */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

// Styles for the GlobalFeed screen
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 10 }, // Main container
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' }, // Center loading spinner
});
