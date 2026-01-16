import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { store } from "expo-router/build/global-state/router-store";
import { sortRoutes } from "expo-router/build/sortRoutes";

const AuthContext = createContext();
// const API_URL = "https://wallet-efxm.onrender.com/api"
const API_URL = process.env.EXPO_PUBLIC_API_URL;
const TOKEN_KEY = "auth_token";

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("idle");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [loading, setLoading] = useState(false)


  function decodeJwt(token) {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  }
  // Load token on app start
  useEffect(() => {

    (async () => {
      try {
        setIsAuthLoading(true)
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        // await new Promise((resolve) => setTimeout(resolve, 5000));
        if (storedToken) {
          setUserToken(storedToken)
          setUser(decodeJwt(storedToken))
          setStatus("authenticated")
        }
        else {
          setStatus("idel")
        }
      } catch (e) {
        console.error("Failed to load token", e);
      } finally {
        setIsAuthLoading(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    setIsLoginLoading(true);
    console.log(API_URL)
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const { token } = await res.json();
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      setUser(decodeJwt(token))
      setUserToken(token)
      setStatus("authenticated");
    } finally {
      setIsLoginLoading(false);
    }
  };


  const signup = async (payload) => {
    setIsSignupLoading(true);
    try {
      console.log(payload,`${API_URL}/auth/signup`)

      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }
      setPendingEmail(payload.email);
      return data;
    }
    finally {
      setIsSignupLoading(false);
    }
  };

  const verifyOtp = async (otp) => {
    if (!pendingEmail) {
      throw new Error("Email not found");
    }

    setLoading(true);
    try {
      const payload = { email: pendingEmail, otp }
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed");
      }
      await SecureStore.setItemAsync(TOKEN_KEY, data.token);
      setStatus("authenticated");
      setUserToken(data.token)
      setUser(decodeJwt(data.token))
      return data;
    } finally {
      setLoading(false);
    }
  };

  const clearPendingEmail = () => {
    setPendingEmail(null);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setUser(null)
    setStatus("idle");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthLoading,
        isLoginLoading,
        login,
        logout,
        signup,
        verifyOtp,
        isSignupLoading,
        setIsSignupLoading,
        loading,
        setLoading, 
        status, 
        setStatus,
        user,
        setUser,
        setUserToken,
        userToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

/*
make code to this

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "otp" | "authenticated">("idle");
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [user, setUser] = useState(null);

  const withLoading = async (fn: () => Promise<any>) => {
    setLoading(true);
    try {
      return await fn();
    } finally {
      setLoading(false);
    }
  };

  const signup = (data) =>
    withLoading(async () => {
      await authService.signup(data);
      setPendingEmail(data.email);
      setStatus("otp");
    });

  const verifyOtp = (otp) =>
    withLoading(async () => {
      const res = await authService.verifyOtp({ email: pendingEmail, otp });
      setUser(res.user);
      setPendingEmail(null);
      setStatus("authenticated");
    });

  const login = (data) =>
    withLoading(async () => {
      const res = await authService.login(data);
      setUser(res.user);
      setStatus("authenticated");
    });

  const logout = () =>
    withLoading(async () => {
      await authService.logout();
      setUser(null);
      setStatus("idle");
    });

  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        verifyOtp,
        logout,
        loading,
        status,
        user,
        pendingEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

*/