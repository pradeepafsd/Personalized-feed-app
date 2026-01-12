// components/TagBadge.js
import { Text, StyleSheet, View } from 'react-native';

// TagBadge component displays a single tag in a styled badge
export default function TagBadge({ tag }) {
  return (
    <View style={styles.badge}>
      {/* Display tag text with # prefix */}
      <Text style={styles.text}>#{tag}</Text>
    </View>
  );
}

// Styles for the badge and text
const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#e0f0ff', // Light blue background
    borderRadius: 12, // Rounded corners
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  text: {
    fontSize: 12,
    color: '#0077cc', // Blue text color
    fontWeight: 'bold',
  },
});
