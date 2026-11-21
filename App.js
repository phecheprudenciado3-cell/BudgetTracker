
import React from "react";
import { Text } from "react-native";

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
            headerShown: false,

            tabBarActiveTintColor: "#5945D8",
            tabBarInactiveTintColor: "#9CA3AF",

            tabBarStyle: {
              height: 68,
              paddingTop: 8,
              paddingBottom: 8,
              backgroundColor: "#FFFFFF",
              borderTopColor: "#EAE7F5",
              elevation: 10,
            },

            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "700",
            },
          }}
        >
          <Tab.Screen
            name="Dashboard"
            component={DashboardTab}
            options={{
              tabBarIcon: ({ focused }) => (
                <Text style={{ fontSize: 21 }}>
                  {focused ? "⌂" : "⌂"}
                </Text>
              ),
            }}
          />

          <Tab.Screen
            name="Expenses"
            component={ExpensesTab}
            options={{
              tabBarIcon: ({ focused }) => (
                <Text style={{ fontSize: 21 }}>
                  {focused ? "▣" : "▣"}
                </Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </BudgetProvider>
  );
}
