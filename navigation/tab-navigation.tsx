import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    RootStackParamList,
    AstroHomeStackScreen,
    AddStackScreen,
    DiscoverStackScreen,
} from "./app-stacks";

// Define main tab navigator
const Tab = createBottomTabNavigator<RootStackParamList>();
export const TabNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: any;

                        if (route.name === "AstroHome") {
                            iconName = focused
                                ? "ios-planet"
                                : "ios-planet-outline";
                        } else if (route.name === "Add") {
                            iconName = focused
                                ? "ios-add-circle"
                                : "ios-add-circle-outline";
                        } else if (route.name === "Discover") {
                            iconName = focused
                                ? "ios-aperture"
                                : "ios-aperture-outline";
                        }

                        return (
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                })}
                tabBarOptions={{
                    activeTintColor: "#ebc39d",
                    inactiveTintColor: "#E0E0E0",
                    inactiveBackgroundColor: "#44465B",
                    activeBackgroundColor: "#44465B",
                }}
            >
                <Tab.Screen name="AstroHome" component={AstroHomeStackScreen} />
                <Tab.Screen name="Add" component={AddStackScreen} />
                <Tab.Screen name="Discover" component={DiscoverStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
