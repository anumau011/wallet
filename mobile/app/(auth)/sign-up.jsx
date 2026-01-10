import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { Link, useNavigation } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import {styles} from "@/assets/styles/auth.styles.js";
import { styles } from "@/assets/styles/auth.styles.js";
import { Image } from "expo-image"
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";


export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isSignupLoading } = useAuth();
  const navigation = useNavigation();
  const [error, setError] = useState("");

  const handleSignup = async () => {

    try {
      await signup({ name, email, password });
      navigation.navigate("otpScreen");
    } catch (error) {
      setError(error.message);
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
        <Image source={require("@/assets/images/revenue-i2.png")} style={styles.illustration} />
        {/* Header */}
        <Text style={styles.title}>
          Sign Up
        </Text>
        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Inputs */}
        <TextInput
          placeholder="Full name"
          placeholderTextColor="#666"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Email address"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        {/* Button */}
        <TouchableOpacity
          style={[
            styles.button,
            isSignupLoading && styles.buttonDisabled
          ]}
          disabled={isSignupLoading}
          onPress={handleSignup}
        >
          <Text style={styles.buttonText}>
            {isSignupLoading ? "Sending OTP..." : "Send OTP"}
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href={"/sign-in"} asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Login</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
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
