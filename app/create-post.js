import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { supabase } from '../services/supabaseClient';
import { router } from 'expo-router';

export default function CreatePost() {
  const [title, setTitle] = useState(''); // Post title input state
  const [description, setDescription] = useState(''); // Post description input state
  const [tags, setTags] = useState(''); // Post tags input (comma-separated)

  // Handles post creation logic
  const handleSubmit = async () => {
    try {
      console.log("Create Post clicked");

      // Fetch currently logged-in user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log("User fetched:", user);

      if (userError || !user) {
        console.log("Not logged in", userError);
        return Alert.alert('Authentication Error', 'You must be logged in to create a post.');
      }

      // Trim input fields
      const trimmedTitle = title.trim();
      const trimmedDesc = description.trim();

      // Validate required fields
      if (!trimmedTitle || !trimmedDesc) {
        return Alert.alert('Missing Fields', 'Title and description are required.');
      }

      // Convert tags string into array
      const tagsArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);

      // Prepare data payload
      const payload = {
        title: trimmedTitle,
        description: trimmedDesc,
        tags: tagsArray,
        author: user.email,
      };

      console.log("Insert Payload:", payload);

      // Insert new post into Supabase
      const { error } = await supabase.from("posts").insert([payload]);

      if (error) {
        console.error("Post insert error:", error.message);
        return Alert.alert("Post Failed", error.message);
      }

      // Success: Clear form and navigate to home
      console.log("Post created successfully");
      Alert.alert("Success", "Post created!");
      setTitle('');
      setDescription('');
      setTags('');
      router.replace('/');
    } catch (err) {
      console.error("Unexpected error:", err.message);
      Alert.alert("Unexpected Error", err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create New Post</Text>

      {/* Title input field */}
      <View style={styles.field}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Enter a catchy title"
          placeholderTextColor="#9ca3af"
        />
      </View>

      {/* Description input field */}
      <View style={styles.field}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.textArea]}
          placeholder="Write something meaningful..."
          placeholderTextColor="#9ca3af"
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Tags input field */}
      <View style={styles.field}>
        <Text style={styles.label}>Tags (comma-separated)</Text>
        <TextInput
          value={tags}
          onChangeText={setTags}
          style={styles.input}
          placeholder="e.g. tech, design, travel"
          placeholderTextColor="#9ca3af"
        />
      </View>

      {/* Submit button */}
      <Pressable
        onPress={handleSubmit}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>Create Post</Text>
      </Pressable>
    </ScrollView>
  );
}

// Styles for the CreatePost screen
const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9fafb',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111827',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontSize: 15,
    color: '#111827',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#1e40af',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
