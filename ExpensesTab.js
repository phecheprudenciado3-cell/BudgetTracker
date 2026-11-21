
import React, { useState, useContext } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
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

  const formatMoney = (value) =>
    "₱" + value.toLocaleString("en-PH", {
      maximumFractionDigits: 2,
    });

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            TRANSACTIONS
          </Text>

          <Text style={styles.title}>
            My Expenses
          </Text>

          <Text style={styles.subtitle}>
            Add and manage your expenses.
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Text style={styles.plus}>+</Text>
        </View>
      </View>

      {/* Expense Form */}
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>
          Add New Expense
        </Text>

        <Text style={styles.label}>
          EXPENSE NAME
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Food, Transportation"
          placeholderTextColor="#A49DB8"
          value={title}
          onChangeText={setTitle}
          editable={!isSaving}
        />

        <Text style={styles.label}>
          AMOUNT
        </Text>

        <View style={styles.amountInputContainer}>
          <Text style={styles.currency}>₱</Text>

          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor="#A49DB8"
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
            editable={!isSaving}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            isSaving && styles.disabledButton,
          ]}
          onPress={handleAddExpense}
          disabled={isSaving}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {isSaving ? "Saving..." : "+  Add Expense"}
          </Text>
        </TouchableOpacity>

        {isSaving && (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingDot} />
            <Text style={styles.loadingText}>
              Saving your expense...
            </Text>
          </View>
        )}

        {!!error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {error}
            </Text>
          </View>
        )}
      </View>

      {/* Expense History */}
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>
          Expense History
        </Text>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {expenses.length} items
          </Text>
        </View>
      </View>

      {expenses.length === 0 ? (
        <View style={styles.emptyCard}>
          <View style={styles.emptyIconContainer}>
            <Text style={styles.emptyIcon}>₱</Text>
          </View>

          <Text style={styles.emptyTitle}>
            No expenses yet
          </Text>

          <Text style={styles.emptyText}>
            Start tracking your spending by adding
            your first expense above.
          </Text>
        </View>
      ) : (
        expenses.slice().reverse().map((item) => (
          <View
            key={item.id}
            style={styles.expenseItem}
          >
            <View style={styles.expenseIcon}>
              <Text style={styles.expenseIconText}>
                ₱
              </Text>
            </View>

            <View style={styles.expenseDetails}>
              <Text style={styles.expenseName}>
                {item.title}
              </Text>

              <Text style={styles.expenseDate}>
                {item.date}
              </Text>
            </View>

            <Text style={styles.expenseAmount}>
              -{formatMoney(item.amount)}
            </Text>
          </View>
        ))
      )}

      <Text style={styles.footer}>
        MyBudget • Every peso counts.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F6FC",
  },

  content: {
    padding: 20,
    paddingTop: 55,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  greeting: {
    color: "#8B80B9",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
  },

  title: {
    color: "#211B42",
    fontSize: 29,
    fontWeight: "800",
    marginTop: 5,
  },

  subtitle: {
    color: "#89839F",
    fontSize: 13,
    marginTop: 5,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#5945D8",
    justifyContent: "center",
    alignItems: "center",
  },

  plus: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "400",
  },

  formCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEEAF8",
    marginBottom: 28,
  },

  formTitle: {
    color: "#211B42",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 22,
  },

  label: {
    color: "#8B80B9",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 9,
  },

  input: {
    backgroundColor: "#F9F8FD",
    borderWidth: 1,
    borderColor: "#EAE6F5",
    borderRadius: 12,
    padding: 15,
    color: "#211B42",
    fontSize: 14,
    marginBottom: 20,
  },

  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F8FD",
    borderWidth: 1,
    borderColor: "#EAE6F5",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 22,
  },

  currency: {
    color: "#5945D8",
    fontSize: 19,
    fontWeight: "800",
  },

  amountInput: {
    flex: 1,
    padding: 15,
    color: "#211B42",
    fontSize: 16,
  },

  button: {
    backgroundColor: "#5945D8",
    padding: 17,
    borderRadius: 13,
    alignItems: "center",
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  loadingDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#5945D8",
    marginRight: 8,
  },

  loadingText: {
    color: "#8B80B9",
    fontSize: 12,
  },

  errorContainer: {
    backgroundColor: "#FFF0F0",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },

  errorText: {
    color: "#D9363E",
    fontSize: 12,
    textAlign: "center",
  },

  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  historyTitle: {
    color: "#211B42",
    fontSize: 18,
    fontWeight: "800",
  },

  countBadge: {
    backgroundColor: "#EEEAFE",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  countText: {
    color: "#5945D8",
    fontSize: 11,
    fontWeight: "700",
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEAF8",
  },

  emptyIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#EEEAFE",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyIcon: {
    color: "#5945D8",
    fontSize: 30,
    fontWeight: "bold",
  },

  emptyTitle: {
    color: "#211B42",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 15,
  },

  emptyText: {
    color: "#89839F",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 19,
    marginTop: 8,
  },

  expenseItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 11,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0EDF7",
  },

  expenseIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#EEEAFE",
    alignItems: "center",
    justifyContent: "center",
  },

  expenseIconText: {
    color: "#5945D8",
    fontSize: 19,
    fontWeight: "bold",
  },

  expenseDetails: {
    flex: 1,
    marginLeft: 12,
  },

  expenseName: {
    color: "#211B42",
    fontSize: 14,
    fontWeight: "700",
  },

  expenseDate: {
    color: "#A09AAF",
    fontSize: 11,
    marginTop: 5,
  },

  expenseAmount: {
    color: "#E5484D",
    fontSize: 13,
    fontWeight: "800",
  },

  footer: {
    color: "#A09AAF",
    textAlign: "center",
    fontSize: 11,
    marginTop: 25,
  },
});
