
import React, { useState, useContext } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
} from "react-native";

import { BudgetContext } from "./BudgetContext";

export default function ExpensesTab() {
  const {
    expenses,
    addExpense,
    isSaving,
    error,
    success,
    clearMessages,
  } = useContext(BudgetContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = () => {
    const expenseAmount = Number(amount);

    const accepted = addExpense(title, expenseAmount);

    if (accepted) {
      setTitle("");
      setAmount("");
    }
  };

  const formatMoney = (value) =>
    "₱" + value.toLocaleString("en-PH", {
      maximumFractionDigits: 2,
    });

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Expenses</Text>

          <Text style={styles.subtitle}>
            Add and manage your expenses.
          </Text>
        </View>

        {/* Expense Form */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>
            New Expense
          </Text>

          <Text style={styles.label}>
            Expense Name
          </Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. Food"
            placeholderTextColor="#A0A8B5"
            value={title}
            onChangeText={(value) => {
              setTitle(value);
              clearMessages();
            }}
            editable={!isSaving}
          />

          <Text style={styles.label}>
            Amount
          </Text>

          <View style={styles.amountContainer}>
            <Text style={styles.currency}>₱</Text>

            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor="#A0A8B5"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={(value) => {
                setAmount(value);
                clearMessages();
              }}
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
            <Text style={styles.loadingText}>
              Saving your expense...
            </Text>
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

          <Text style={styles.countText}>
            {expenses.length} items
          </Text>
        </View>

        {expenses.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No expenses yet
            </Text>

            <Text style={styles.emptyText}>
              Your transactions will appear here.
            </Text>
          </View>
        ) : (
          expenses.slice().reverse().map((item) => (
            <View
              key={item.id}
              style={styles.expenseItem}
            >
              <View style={styles.expenseIcon}>
                <Text style={styles.iconText}>₱</Text>
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
          MyBudget · Every peso counts.
        </Text>
      </ScrollView>

      {/* Success Modal */}
      <Modal
        visible={success}
        transparent
        animationType="fade"
        onRequestClose={clearMessages}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.successCircle}>
              <Text style={styles.successIcon}>✓</Text>
            </View>

            <Text style={styles.modalTitle}>
              Expense Added!
            </Text>

            <Text style={styles.modalMessage}>
              Your expense has been successfully added.
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={clearMessages}
            >
              <Text style={styles.modalButtonText}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  content: {
    padding: 20,
    paddingTop: 55,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 25,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#172033",
  },

  subtitle: {
    color: "#8B95A5",
    fontSize: 13,
    marginTop: 6,
  },

  formCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EDF0F5",
    marginBottom: 28,
  },

  formTitle: {
    color: "#172033",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 22,
  },

  label: {
    color: "#596579",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 9,
  },

  input: {
    backgroundColor: "#FAFBFD",
    borderWidth: 1,
    borderColor: "#E6EAF0",
    borderRadius: 11,
    padding: 15,
    fontSize: 14,
    color: "#172033",
    marginBottom: 20,
  },

  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFBFD",
    borderWidth: 1,
    borderColor: "#E6EAF0",
    borderRadius: 11,
    paddingHorizontal: 15,
    marginBottom: 22,
  },

  currency: {
    fontSize: 17,
    color: "#3563F5",
    fontWeight: "700",
  },

  amountInput: {
    flex: 1,
    padding: 15,
    fontSize: 15,
    color: "#172033",
  },

  button: {
    backgroundColor: "#3563F5",
    padding: 16,
    borderRadius: 11,
    alignItems: "center",
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  loadingText: {
    color: "#3563F5",
    textAlign: "center",
    fontSize: 12,
    marginTop: 13,
  },

  errorContainer: {
    backgroundColor: "#FFF1F1",
    borderRadius: 9,
    padding: 12,
    marginTop: 14,
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
    fontSize: 17,
    color: "#172033",
    fontWeight: "700",
  },

  countText: {
    fontSize: 12,
    color: "#8B95A5",
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    padding: 27,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EDF0F5",
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#172033",
  },

  emptyText: {
    fontSize: 12,
    color: "#8B95A5",
    marginTop: 7,
  },

  expenseItem: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 13,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EDF0F5",
  },

  expenseIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EEF3FF",
    justifyContent: "center",
    alignItems: "center",
  },

  iconText: {
    color: "#3563F5",
    fontSize: 17,
    fontWeight: "700",
  },

  expenseDetails: {
    flex: 1,
    marginLeft: 12,
  },

  expenseName: {
    color: "#172033",
    fontSize: 13,
    fontWeight: "700",
  },

  expenseDate: {
    color: "#8B95A5",
    fontSize: 11,
    marginTop: 4,
  },

  expenseAmount: {
    color: "#E5484D",
    fontSize: 13,
    fontWeight: "700",
  },

  footer: {
    textAlign: "center",
    color: "#A0A8B5",
    fontSize: 11,
    marginTop: 25,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(20, 30, 50, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  modalCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
  },

  successCircle: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: "#DDF8E8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 17,
  },

  successIcon: {
    color: "#16A36A",
    fontSize: 35,
    fontWeight: "bold",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#172033",
  },

  modalMessage: {
    fontSize: 13,
    color: "#697386",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 23,
  },

  modalButton: {
    backgroundColor: "#3563F5",
    padding: 15,
    borderRadius: 11,
    width: "100%",
    alignItems: "center",
  },

  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
