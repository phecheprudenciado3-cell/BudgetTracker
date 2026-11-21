
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
          <Text style={styles.greeting}>MY FINANCES</Text>
          <Text style={styles.title}>MyBudget</Text>
          <Text style={styles.subtitle}>
            Track. Plan. Save.
          </Text>
        </View>

        <View style={styles.logo}>
          <Text style={styles.logoText}>₱</Text>
        </View>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>
          REMAINING BALANCE
        </Text>

        <Text style={styles.balanceAmount}>
          {formatMoney(remainingBalance)}
        </Text>

        <View style={styles.balanceFooter}>
          <View style={styles.statusDot} />
          <Text style={styles.balanceNote}>
            {remainingBalance > 0
              ? "You're within your budget!"
              : remainingBalance === 0
              ? "Your budget is fully used."
              : "You have exceeded your budget."}
          </Text>
        </View>

        <Text style={styles.watermark}>₱</Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>▤</Text>
          </View>

          <Text style={styles.cardLabel}>
            Total Budget
          </Text>

          <Text style={styles.budgetAmount}>
            {formatMoney(budget)}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={[styles.iconCircle, styles.redCircle]}>
            <Text style={styles.redIcon}>↗</Text>
          </View>

          <Text style={styles.cardLabel}>
            Total Expenses
          </Text>

          <Text style={styles.expenseAmount}>
            {formatMoney(totalExpenses)}
          </Text>
        </View>
      </View>

      {/* Spending Overview */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>
          Spending Overview
        </Text>

        <View style={styles.progressInfo}>
          <Text style={styles.progressLabel}>
            Budget Used
          </Text>

          <Text style={styles.progressValue}>
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

        <View style={styles.progressLegend}>
          <Text style={styles.legendText}>
            Spent: {formatMoney(totalExpenses)}
          </Text>

          <Text style={styles.legendText}>
            Left: {formatMoney(remainingBalance)}
          </Text>
        </View>
      </View>

      {/* Recent Expenses */}
      <View style={styles.recentHeader}>
        <Text style={styles.sectionTitle}>
          Recent Expenses
        </Text>

        <Text style={styles.recentCount}>
          {expenses.length} items
        </Text>
      </View>

      {expenses.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>▤</Text>
          <Text style={styles.emptyTitle}>
            No expenses yet
          </Text>
          <Text style={styles.emptyText}>
            Your recent expenses will appear here.
          </Text>
        </View>
      ) : (
        expenses.slice(-3).reverse().map((item) => (
          <View key={item.id} style={styles.expenseItem}>
            <View style={styles.expenseIcon}>
              <Text style={styles.expenseIconText}>₱</Text>
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
        MyBudget • Manage your money wisely
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
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#8B80B9",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#211B42",
    marginTop: 5,
  },

  subtitle: {
    fontSize: 14,
    color: "#89839F",
    marginTop: 3,
  },

  logo: {
    width: 53,
    height: 53,
    borderRadius: 17,
    backgroundColor: "#5945D8",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  balanceCard: {
    backgroundColor: "#5945D8",
    padding: 24,
    borderRadius: 23,
    marginBottom: 20,
    overflow: "hidden",
  },

  balanceLabel: {
    color: "#DCD6FF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  balanceAmount: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "800",
    marginTop: 13,
  },

  balanceFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#55E6A5",
    marginRight: 9,
  },

  balanceNote: {
    color: "#FFFFFF",
    fontSize: 12,
  },

  watermark: {
    position: "absolute",
    right: 20,
    top: 25,
    fontSize: 100,
    fontWeight: "bold",
    color: "rgba(255,255,255,0.10)",
  },

  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EEEAF8",
  },

  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#EEEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 13,
  },

  redCircle: {
    backgroundColor: "#FEECEC",
  },

  iconText: {
    fontSize: 21,
    color: "#5945D8",
  },

  redIcon: {
    fontSize: 23,
    color: "#E5484D",
  },

  cardLabel: {
    color: "#89839F",
    fontSize: 12,
  },

  budgetAmount: {
    color: "#211B42",
    fontSize: 19,
    fontWeight: "800",
    marginTop: 7,
  },

  expenseAmount: {
    color: "#E5484D",
    fontSize: 19,
    fontWeight: "800",
    marginTop: 7,
  },

  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#EEEAF8",
    marginBottom: 22,
  },

  sectionTitle: {
    color: "#211B42",
    fontSize: 17,
    fontWeight: "800",
  },

  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
    marginBottom: 10,
  },

  progressLabel: {
    color: "#89839F",
    fontSize: 13,
  },

  progressValue: {
    color: "#5945D8",
    fontWeight: "800",
  },

  progressBackground: {
    height: 10,
    backgroundColor: "#EEEAF8",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: 10,
    backgroundColor: "#5945D8",
    borderRadius: 10,
  },

  progressLegend: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 13,
  },

  legendText: {
    color: "#89839F",
    fontSize: 11,
  },

  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
  },

  recentCount: {
    color: "#8B80B9",
    fontSize: 12,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    padding: 25,
    alignItems: "center",
    borderRadius: 18,
  },

  emptyIcon: {
    color: "#A99BEF",
    fontSize: 32,
  },

  emptyTitle: {
    color: "#211B42",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
  },

  emptyText: {
    color: "#89839F",
    fontSize: 12,
    marginTop: 5,
  },

  expenseItem: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  expenseIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EEEAFE",
    alignItems: "center",
    justifyContent: "center",
  },

  expenseIconText: {
    fontSize: 19,
    color: "#5945D8",
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
    marginTop: 4,
  },

  expensePrice: {
    color: "#E5484D",
    fontWeight: "800",
    fontSize: 13,
  },

  footer: {
    color: "#A09AAF",
    fontSize: 11,
    textAlign: "center",
    marginTop: 20,
  },
});
