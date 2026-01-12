import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { supabase } from '../services/supabaseClient';

// Complete any ongoing browser auth sessions (required for Expo AuthSession)
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  // Handle login using Google OAuth
  const handleGoogleLogin = async () => {
    // Get redirect URL using Expo proxy
    const redirectUrl = AuthSession.makeRedirectUri({ useProxy: true });

    // Initiate sign-in with Supabase using Google provider
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
      },
    });

    // Log any error that occurs during login
    if (error) console.error(error.message);
  };

  return (
    <View style={styles.container}>
      {/* App title and subtitle */}
      <Text style={styles.title}>Welcome to Swaraj</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      {/* Google sign-in button */}
      <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleLogin}>
        <Image
          source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }}
          style={styles.googleIcon}
        />
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the login screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 30,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
});
