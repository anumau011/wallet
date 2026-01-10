import { Redirect, Stack } from 'expo-router'
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function AuthRoutesLayout() {
  const { isAuthenticated, isAuthLoading, status } = useAuth();
  if (isAuthLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  };

  if (status === "authenticated") {
    return <Redirect href={'/'} />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="otpScreen" />
      <Stack.Screen name="sign-in" />

    </Stack>)
}