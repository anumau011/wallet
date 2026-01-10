import { Redirect } from "expo-router";
import { Stack } from "expo-router/stack";
import { useAuth } from '../../contexts/AuthContext';
import { ActivityIndicator } from "react-native"

export default function Layout() {

  const { isAuthenticated, isLoginLoading, status } = useAuth();
  if (status === "authenticated") { 
    return (
      // <Redirect href={"/"}/>
    <Stack screenOptions={{ headerShown: false }} />
) 
  };
  return <Redirect href={"/sign-in"}/>;
}