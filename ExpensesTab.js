
import React, { useState, useContext } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import { BudgetContext } from "./BudgetContext";

export default function ExpensesTab() {
  const {
    expenses,
    addExpense,
    isSaving,
    error,
  } = useContext(BudgetContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = () => {
    const expenseAmount = Number(amount);

    const success = addExpense(title, expenseAmount);

    if (success) {
      setTitle("");
      setAmount("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Expenses</Text>

      <TextInput
        style={styles.input}
        placeholder="Expense name (e.g. Food)"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount (e.g. 500)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity
        style={[
          styles.button,
          isSaving && styles.disabledButton,
        ]}
        onPress={handleAddExpense}
        disabled={isSaving}
      >
        <Text style={styles.buttonText}>
          {isSaving ? "Saving..." : "Add Expense"}
        </Text>
      </TouchableOpacity>

      {isSaving && (
        <Text style={styles.loading}>
          Saving your expense...
        </Text>
      )}

      {!!error && (
        <Text style={styles.error}>{error}</Text>
      )}

      <Text style={styles.sectionTitle}>
        Expense History
      </Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No expenses added yet.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.expenseTitle}>
              {item.title}
            </Text>

            <Text style={styles.expenseAmount}>
              - ₱{item.amount.toLocaleString("en-PH")}
            </Text>
          </View>
        )}
      />
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
    marginBottom: 25,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loading: {
    textAlign: "center",
    color: "#D97706",
    marginTop: 12,
  },
  error: {
    color: "#DC2626",
    marginTop: 12,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
  },
  expenseItem: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expenseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    flex: 1,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#DC2626",
  },
  empty: {
    color: "#64748B",
    textAlign: "center",
    marginTop: 20,
  },
});
