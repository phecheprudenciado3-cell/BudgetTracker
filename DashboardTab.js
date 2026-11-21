
import React, { useContext } from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

import { BudgetContext } from "./BudgetContext";

export default function DashboardTab() {
  const {
    budget,
    expenses,
    totalExpenses,
    remainingBalance,
  } = useContext(BudgetContext);

  const formatMoney = (amount) =>
    "₱" + amount.toLocaleString("en-PH", {
      maximumFractionDigits: 2,
    });

  const percentage =
    budget > 0
      ? Math.min((totalExpenses / budget) * 100, 100)
      : 0;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>MyBudget</Text>
          <Text style={styles.subtitle}>
            Track. Plan. Save.
          </Text>
        </View>

        <View style={styles.settingsIcon}>
          <Text style={styles.settingsText}>⚙</Text>
        </View>
      </View>

      {/* Remaining Balance */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>
          Remaining Balance
        </Text>

        <Text
          style={styles.balanceAmount}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {formatMoney(remainingBalance)}
        </Text>

        <Text style={styles.balanceNote}>
          {remainingBalance > 0
            ? "You're within your budget."
            : remainingBalance === 0
            ? "Your budget is fully used."
            : "You have exceeded your budget."}
        </Text>
      </View>

      {/* Summary */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.cardLabel}>
            Total Budget
          </Text>

          <Text style={styles.budgetAmount}>
            {formatMoney(budget)}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.cardLabel}>
            Total Expenses
          </Text>

          <Text style={styles.expenseAmount}>
            {formatMoney(totalExpenses)}
          </Text>
        </View>
      </View>

      {/* Spending Overview */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Spending Overview
          </Text>

          <Text style={styles.percentage}>
            {percentage.toFixed(0)}%
          </Text>
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${percentage}%` },
            ]}
          />
        </View>

        <View style={styles.progressLabels}>
          <Text style={styles.smallText}>
            Spent: {formatMoney(totalExpenses)}
          </Text>

          <Text style={styles.smallText}>
            Left: {formatMoney(remainingBalance)}
          </Text>
        </View>
      </View>

      {/* Recent Expenses */}
      <View style={styles.recentHeader}>
        <Text style={styles.sectionTitle}>
          Recent Expenses
        </Text>

        <Text style={styles.itemCount}>
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
        expenses.slice(-3).reverse().map((item) => (
          <View key={item.id} style={styles.expenseItem}>
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

            <Text style={styles.expensePrice}>
              -{formatMoney(item.amount)}
            </Text>
          </View>
        ))
      )}

      <Text style={styles.footer}>
        MyBudget · Every peso counts.
      </Text>
    </ScrollView>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#172033",
  },

  subtitle: {
    fontSize: 13,
    color: "#8B95A5",
    marginTop: 5,
  },

  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EDF0F5",
  },

  settingsText: {
    fontSize: 20,
    color: "#64748B",
  },

  balanceCard: {
    backgroundColor: "#3563F5",
    padding: 23,
    borderRadius: 18,
    marginBottom: 18,
  },

  balanceLabel: {
    color: "#E6ECFF",
    fontSize: 13,
    fontWeight: "500",
  },

  balanceAmount: {
    color: "#FFFFFF",
    fontSize: 35,
    fontWeight: "800",
    marginTop: 12,
  },

  balanceNote: {
    color: "#E6ECFF",
    fontSize: 12,
    marginTop: 12,
  },

  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 25,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 17,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#EDF0F5",
  },

  cardLabel: {
    fontSize: 12,
    color: "#8B95A5",
  },

  budgetAmount: {
    fontSize: 19,
    color: "#172033",
    fontWeight: "800",
    marginTop: 10,
  },

  expenseAmount: {
    fontSize: 19,
    color: "#E5484D",
    fontWeight: "800",
    marginTop: 10,
  },

  section: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#EDF0F5",
    marginBottom: 26,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 17,
  },

  sectionTitle: {
    fontSize: 16,
    color: "#172033",
    fontWeight: "700",
  },

  percentage: {
    color: "#3563F5",
    fontSize: 15,
    fontWeight: "800",
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#E9EDF5",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: 8,
    backgroundColor: "#3563F5",
    borderRadius: 10,
  },

  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 13,
  },

  smallText: {
    color: "#8B95A5",
    fontSize: 11,
  },

  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  itemCount: {
    color: "#8B95A5",
    fontSize: 12,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EDF0F5",
  },

  emptyTitle: {
    color: "#172033",
    fontSize: 15,
    fontWeight: "700",
  },

  emptyText: {
    color: "#8B95A5",
    fontSize: 12,
    marginTop: 7,
  },

  expenseItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EDF0F5",
  },

  expenseIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#EEF3FF",
    borderRadius: 12,
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

  expensePrice: {
    color: "#E5484D",
    fontSize: 13,
    fontWeight: "700",
  },

  footer: {
    color: "#A0A8B5",
    textAlign: "center",
    fontSize: 11,
    marginTop: 22,
  },
});
