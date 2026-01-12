// app/_layout.js
import { Tabs, router } from 'expo-router';
import { Button, Alert } from 'react-native';
import { supabase } from '../services/supabaseClient';
import { useEffect, useState } from 'react';

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login state

  useEffect(() => {
    // Check current login status on mount
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user); // Set login state based on user presence
    };

    checkUser();

    // Listen to auth state changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    // Clean up listener on component unmount
    return () => listener?.subscription?.unsubscribe?.();
  }, []);

  // Handle logout with confirmation dialog
  const handleLogout = async () => {
    if (!isLoggedIn) {
      console.log("Logout clicked but no user is logged in.");
      return Alert.alert("You are not logged in.");
    }

    // Confirm logout with the user
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase.auth.signOut();
          if (error) {
            console.error("Logout error:", error.message);
            Alert.alert("Logout failed", error.message);
          } else {
            console.log("Logged out successfully");
            Alert.alert("Success", "You have been logged out.");
            router.replace("/login"); // Redirect to login screen
          }
        },
      },
    ]);
  };

  // Layout with bottom tabs and logout button in header
  return (
    <Tabs
      screenOptions={{
        headerRight: () =>
          <Button title="Logout" onPress={handleLogout} color="#ef4444" />, // Logout button in header
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Global Feed' }} />
      <Tabs.Screen name="personalized" options={{ title: 'For You' }} />
      <Tabs.Screen name="create-post" options={{ title: 'Create' }} />
    </Tabs>
  );
}
