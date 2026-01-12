import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../../services/supabaseClient';

export default function PostDetail() {
  const { id } = useLocalSearchParams(); // Get the post ID from the route
  const [post, setPost] = useState(null); // Store fetched post data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // If ID is missing or not a valid string, stop loading and return
    if (!id || typeof id !== 'string') {
      setLoading(false);
      return;
    }

    // Fetch the post by ID from Supabase
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single(); // Expect only one post

      if (error || !data) {
        console.error('Fetch post error:', error?.message);
        setPost(null); // Set post to null if fetch fails
      } else {
        setPost(data); // Set fetched post
      }

      setLoading(false); // Stop loading
    };

    fetchPost();
  }, [id]);

  // Show loading spinner while fetching
  if (loading) return <ActivityIndicator style={styles.loader} />;

  // If no ID or post not found, show error message
  if (!id || !post) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>Post not found.</Text>
      </View>
    );
  }

  // Render the post details
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>By {post.author}</Text>
      <Text style={styles.description}>{post.description}</Text>

      {/* Render tags if available */}
      {post.tags?.length > 0 && (
        <View style={styles.tags}>
          {post.tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>#{tag}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

// Styles for the PostDetail screen
const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' }, // Center loading spinner
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }, // Center "not found" message
  container: { flex: 1, padding: 20 }, // Main container
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 }, // Post title
  author: { color: '#888', marginBottom: 10 }, // Author name
  description: { fontSize: 16 }, // Post content
  message: { fontSize: 16, color: 'red' }, // Error message
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }, // Tags container
  tag: {
    fontSize: 12,
    marginRight: 8,
    color: '#007bff',
    backgroundColor: '#e6f0ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  }, // Individual tag style
});
