import React, { createContext, useState } from "react";

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budget] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const remainingBalance = budget - totalExpenses;

  const addExpense = (title, amount) => {
    if (isSaving) return false;

    if (
      !title.trim() ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      setError("Please enter a valid expense and amount.");
      return false;
    }

    if (amount > remainingBalance) {
      setError("Expense exceeds your remaining budget.");
      return false;
    }

    setError("");
    setSuccess(false);
    setIsSaving(true);

    const newExpense = {
      id: Date.now().toString(),
      title: title.trim(),
      amount,
      date: new Date().toLocaleDateString("en-PH", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setTimeout(() => {
      setExpenses((previous) => [
        ...previous,
        newExpense,
      ]);

      setIsSaving(false);
      setSuccess(true);
    }, 1000);

    return true;
  };

  const clearMessages = () => {
    setError("");
    setSuccess(false);
  };

  return (
    <BudgetContext.Provider
      value={{
        budget,
        expenses,
        totalExpenses,
        remainingBalance,
        isSaving,
        error,
        success,
        addExpense,
        clearMessages,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
