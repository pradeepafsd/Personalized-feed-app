import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { supabase } from "../services/supabaseClient";
import { useState } from "react";
import { Link } from "expo-router";
import { formatDate } from "../lib/formatDate";
import { Ionicons } from "@expo/vector-icons";

// PostCard component displays individual post details along with upvote and bookmark actions
export default function PostCard({ post }) {
  const [upvoted, setUpvoted] = useState(false); // Track upvote state
  const [bookmarked, setBookmarked] = useState(false); // Track bookmark state

  // Handle upvoting a post
  const handleUpvote = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser(); // Get current user

    if (!user) {
      console.log("Upvote blocked — user not logged in.");
      return Alert.alert("Please log in to upvote");
    }

    // Insert upvote record into Supabase
    const { error } = await supabase.from("upvotes").insert([
      {
        user_id: user.id,
        post_id: post.id,
      },
    ]);

    if (error) {
      console.log("Upvote error:", error.message);
      Alert.alert("Upvote failed", error.message);
    } else {
      console.log("Post upvoted:", post.id);
      setUpvoted(true); // Update UI state
    }
  };

  // Handle bookmarking a post
  const handleBookmark = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser(); // Get current user

    if (!user) {
      console.log("Bookmark blocked — user not logged in.");
      return Alert.alert("Please log in to bookmark");
    }

    // Insert bookmark record into Supabase
    const { error } = await supabase.from("bookmarks").insert([
      {
        user_id: user.id,
        post_id: post.id,
      },
    ]);

    if (error) {
      console.log("Bookmark error:", error.message);
      Alert.alert("Bookmark failed", error.message);
    } else {
      console.log("Post bookmarked:", post.id);
      setBookmarked(true); // Update UI state
    }
  };

  return (
    <View style={styles.card}>
      {/* Navigate to post detail page */}
      <Link href={`/post/${post.id}`}>
        <Text style={styles.title}>{post.title}</Text>
      </Link>

      {/* Display author and formatted date */}
      <Text style={styles.meta}>
        By <Text style={styles.author}>{post.author}</Text> •{" "}
        {formatDate(post.created_at)}
      </Text>

      {/* Post description */}
      <Text style={styles.desc}>{post.description}</Text>

      {/* Display tags */}
      <View style={styles.tags}>
        {post.tags?.map((tag, i) => (
          <Text key={i} style={styles.tag}>
            #{tag}
          </Text>
        ))}
      </View>

      {/* Upvote and Bookmark buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={handleUpvote}
          disabled={upvoted}
          style={[
            styles.iconButton,
            upvoted && styles.activeButton,
          ]}
        >
          <Ionicons
            name={upvoted ? "thumbs-up" : "thumbs-up-outline"}
            size={20}
            color={upvoted ? "#2563eb" : "#1f2937"}
          />
          <Text style={styles.buttonText}>
            {upvoted ? "Upvoted" : "Upvote"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleBookmark}
          disabled={bookmarked}
          style={[
            styles.iconButton,
            bookmarked && styles.activeButton,
          ]}
        >
          <Ionicons
            name={bookmarked ? "bookmark" : "bookmark-outline"}
            size={20}
            color={bookmarked ? "#2563eb" : "#1f2937"}
          />
          <Text style={styles.buttonText}>
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles for the PostCard component
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 18,
    marginBottom: 18,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    ...Platform.select({
      web: { boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)" }, // Web-specific shadow
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: { elevation: 4 }, // Android shadow
    }),
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1d4ed8",
    marginBottom: 8,
  },
  meta: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 10,
  },
  author: {
    fontWeight: "600",
    color: "#111827",
  },
  desc: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 20,
    marginBottom: 12,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 14,
  },
  tag: {
    backgroundColor: "#e0f2fe",
    color: "#0284c7",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 6,
    borderRadius: 50,
  },
  actions: {
    flexDirection: "row",
    gap: 16,
    marginTop: 4,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  activeButton: {
    backgroundColor: "#e0f2fe",
    borderColor: "#2563eb",
  },
  buttonText: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
  },
});
