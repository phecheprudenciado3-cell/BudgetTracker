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

            tabBarActiveTintColor: "#3563F5",
            tabBarInactiveTintColor: "#9CA3AF",

            tabBarStyle: {
              height: 65,
              paddingTop: 8,
              paddingBottom: 8,
              backgroundColor: "#FFFFFF",
              borderTopWidth: 1,
              borderTopColor: "#EDF0F5",
              elevation: 0,
            },

            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: "600",
            },
          }}
        >
          <Tab.Screen
            name="Dashboard"
            component={DashboardTab}
            options={{
              tabBarIcon: ({ color }) => (
                <Text style={{ color, fontSize: 21 }}>
                  ⌂
                </Text>
              ),
            }}
          />

          <Tab.Screen
            name="Expenses"
            component={ExpensesTab}
            options={{
              tabBarIcon: ({ color }) => (
                <Text style={{ color, fontSize: 20 }}>
                  ▤
                </Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </BudgetProvider>
  );
}
