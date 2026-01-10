import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "@/components/SafeScreen";
import { View, Text,ActivityIndicator } from "react-native";
import { Slot,Redirect} from "expo-router";
import { AuthProvider, useAuth } from "@/contexts/AuthContext"

export default function RootLayout() {
  const { status, loading } = useAuth();
  return (
    <AuthProvider>
      <SafeScreen>
        <AuthGate />
      </SafeScreen>
    </AuthProvider>
  );
}


function AuthGate() {
  const { status, isAuthLoading } = useAuth();

  // ⏳ Prevent flicker while restoring session
  if (isAuthLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  };

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {status === "authenticated" ? (
      <Stack.Screen name="(root)" /> 
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}


