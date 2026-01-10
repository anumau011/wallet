import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, Alert, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "@/assets/styles/auth.styles.js";
import { Image } from "expo-image"
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

export default function Page() {
  const { login, isLoginLoading } = useAuth();
  const router = useRouter()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState("");

  // Handle the submission of the sign-in form
  const handleLogin = async () => {
    try {
      await login(email, password);
    }
    catch (err) {
      console.log(err)
      setError(err.message);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Image source={require("@/assets/images/revenue-i4.png")} style={styles.illustration} />

        {/* Title */}
        <Text style={styles.title}>Welcome Back</Text>
        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}
        {/* Email */}

        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor="#999"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Button */}
        <TouchableOpacity
          style={[
            styles.button,
            isLoginLoading && styles.buttonDisabled,
          ]}
          onPress={handleLogin}
          disabled={isLoginLoading}
        >
          {isLoginLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don’t have an account?</Text>
          <Link href="/sign-up" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}> Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 24,
//     backgroundColor: "#fff",
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#111",
//     marginBottom: 6,
//   },

//   subtitle: {
//     fontSize: 15,
//     color: "#666",
//     marginBottom: 32,
//   },

//   inputContainer: {
//     backgroundColor: "#F3F4F6",
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     marginBottom: 16,
//   },

//   input: {
//     height: 52,
//     fontSize: 16,
//     color: "#111",
//   },

//   button: {
//     height: 54,
//     borderRadius: 14,
//     backgroundColor: "#111827",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 12,
//   },

//   buttonDisabled: {
//     opacity: 0.7,
//   },

//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },

//   footer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 24,
//   },

//   footerText: {
//     color: "#666",
//     fontSize: 14,
//   },

//   link: {
//     color: "#2563EB",
//     fontSize: 14,
//     fontWeight: "600",
//   },
// });
