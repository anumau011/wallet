import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Redirect, useNavigation } from "expo-router";
import { styles } from "@/assets/styles/auth.styles.js";

export default function OtpScreen() {
  const [otp, setOtp] = useState("");
  const { verifyOtp, loading } = useAuth();
  const navigation = useNavigation();

  const handleVerify = async () => {
    await verifyOtp(otp);
    // <Redirect href={"/"}/>
  };
  return (
    <View style={styles.verificationContainer}>
      <Text style={styles.title}>Verify OTP</Text>
<Text style={{ fontSize: 13, color: "#9a8478", textAlign: "center",marginBottom:10 }}>
  Didn’t receive the email? Please check your Spam or Junk folder.
</Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
          placeholder="Enter Your Verification Code"
          placeholderTextColor="#9a8478"
          style={styles.verificationInput}
          textAlign="left"
          writingDirection="ltr"
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        disabled={loading}
        onPress={handleVerify}
      >
        <Text style={styles.buttonText}>
          {loading ? "Verifying..." : "Verify"}
        </Text>
      </TouchableOpacity>

      {/* <View style={styles.footer}>
        <Text style={styles.footerText}>Didn’t receive code? </Text>
        <TouchableOpacity>
          <Text style={styles.link}>Resend</Text>
        </TouchableOpacity>
      </View> */}
    </View>
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
