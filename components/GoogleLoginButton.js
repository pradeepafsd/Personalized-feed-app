// components/GoogleLoginButton.js
import { Alert, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { supabase } from '../services/supabaseClient';

// Required for expo-auth-session to handle browser flow correctly
WebBrowser.maybeCompleteAuthSession();

export default function GoogleLoginButton() {
  // Handles Google Sign-In via Supabase and Expo AuthSession
  const handleLogin = async () => {
    // Get the redirect URL that will be used after successful login
    const redirectTo = AuthSession.makeRedirectUri({ useProxy: true });

    // Request Supabase to initiate OAuth login with Google
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });

    // If there was an error initiating login
    if (error) {
      Alert.alert('Login Error', error.message);
    } else {
      // Start the OAuth session in a browser window
      const result = await AuthSession.startAsync({ authUrl: data.url });

      // If the login was successful, show confirmation
      if (result?.type === 'success') {
        Alert.alert('Login Successful 🎉');
      }
    }
  };

  // Render a native button for Google Sign-In
  return <Button title="Sign in with Google" onPress={handleLogin} />;
}
