import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { BudgetProvider } from "./BudgetContext";

import DashboardTab from "./DashboardTab";
import ExpensesTab from "./ExpensesTab";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <BudgetProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#2563EB",
            },

            headerTintColor: "#FFFFFF",

            tabBarActiveTintColor: "#2563EB",

            tabBarInactiveTintColor: "gray",

            tabBarStyle: {
              paddingBottom: 5,
              height: 60,
            },
          }}
        >
          <Tab.Screen
            name="Dashboard"
            component={DashboardTab}
          />

          <Tab.Screen
            name="Expenses"
            component={ExpensesTab}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </BudgetProvider>
  );
}