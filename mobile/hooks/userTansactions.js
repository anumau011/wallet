import { useAuth } from "@/contexts/AuthContext";
import { useState, useCallback } from "react";
import { Alert } from "react-native";

// import { API_URL } from "../constants/api";
const API_URL = "http://192.168.1.40:4000/api";

export const useTransactions = (userId) => {
  const { userToken } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchTransaction = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/transactions`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/transactions/summary`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setSummary(data);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {

    try {
      await Promise.all([fetchTransaction(), fetchSummary()]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchSummary, fetchTransaction, userId]);

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to delete transaction");

      // Refresh data after deletion
      loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", error.message);
    }
  };
  return { transactions, summary, isLoading, loadData, deleteTransaction };
};
