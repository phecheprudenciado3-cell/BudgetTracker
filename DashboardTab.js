import React, { useContext } from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { BudgetContext } from "./BudgetContext";

export default function DashboardTab() {

  const {
    budget,
    totalExpenses,
    remainingBalance,
  } = useContext(BudgetContext);

  const formatMoney = (amount) => {
    return "₱" + amount.toLocaleString("en-PH");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        My Budget Tracker
      </Text>

      <Text style={styles.subtitle}>
        Manage your money wisely!
      </Text>

      <View style={styles.balanceCard}>
        <Text style={styles.cardLabel}>
          Remaining Balance
        </Text>

        <Text style={styles.balance}>
          {formatMoney(remainingBalance)}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>
          Total Budget
        </Text>

        <Text style={styles.amount}>
          {formatMoney(budget)}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>
          Total Expenses
        </Text>

        <Text style={styles.expense}>
          {formatMoney(totalExpenses)}
        </Text>
      </View>

      <Text style={styles.footer}>
        Track your expenses and stay within your budget.
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F1F5F9",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1E293B",
    marginTop: 20,
  },

  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 25,
  },

  balanceCard: {
    backgroundColor: "#2563EB",
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
  },

  cardLabel: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  balance: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 10,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },

  label: {
    fontSize: 15,
    color: "#64748B",
  },

  amount: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2563EB",
    marginTop: 8,
  },

  expense: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#DC2626",
    marginTop: 8,
  },

  footer: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 20,
  },

});