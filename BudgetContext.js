
import React, { createContext, useState } from "react";

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budget] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const remainingBalance = budget - totalExpenses;

  const addExpense = (title, amount) => {
    if (isSaving) return false;

    if (!title.trim() || !Number.isFinite(amount) || amount <= 0) {
      setError("Please enter a valid expense.");
      return false;
    }

    if (amount > remainingBalance) {
      setError("Insufficient remaining budget.");
      return false;
    }

    setError("");
    setIsSaving(true);

    const newExpense = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: amount,
    };

    setTimeout(() => {
      setExpenses((previousExpenses) => [
        ...previousExpenses,
        newExpense,
      ]);

      setIsSaving(false);
    }, 1000);

    return true;
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
        addExpense,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
