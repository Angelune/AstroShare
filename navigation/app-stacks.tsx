import React from "react";
import {
    createStackNavigator,
    StackNavigationProp,
} from "@react-navigation/stack";
import AstroHomeScreen from "../screens/AstroHomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import AddScreen from "../screens/AddScreen";
import LogoHeader from "../components/LogoHeader";

// Define view names and associated params
// undefined = no params passed to view
export type RootStackParamList = {
    AstroHome: undefined;
    Details: { astrophotoId: number };
    Discover: undefined;
    Add: undefined;
};

// Définition des 3 stack : AstroHome, Add et Discover :

const AstroHomeStack = createStackNavigator<RootStackParamList>();
export const AstroHomeStackScreen = () => {
    return (
        // definition d'une pile, on est à home et on peut aller à details
        <AstroHomeStack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: "#202D3E" },
            }}
        >
            <AstroHomeStack.Screen
                name="AstroHome"
                component={AstroHomeScreen}
                options={{
                    headerTitleStyle: {
                        color: "#ebc39d",
                    },
                    headerStyle: {
                        backgroundColor: "#44465B",
                        elevation: 5,
                        shadowColor: "#fff",
                        shadowOpacity: 1,
                    },
                    headerRight: (props) => <LogoHeader />,
                }}
            />
            <AstroHomeStack.Screen
                name="Details"
                component={DetailsScreen}
                options={{
                    headerTitleStyle: {
                        color: "#ebc39d",
                    },
                    headerStyle: {
                        backgroundColor: "#44465B",
                        elevation: 10,
                        shadowColor: "#C65535",
                    },
                    headerTintColor: "#ebc39d",

                    headerRight: (props) => <LogoHeader />,
                }}
            />
        </AstroHomeStack.Navigator>
    );
};

const DiscoverStack = createStackNavigator<RootStackParamList>();
export const DiscoverStackScreen = () => {
    return (
        <DiscoverStack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: "#202D3E" },
            }}
        >
            <DiscoverStack.Screen
                name="Discover"
                component={DiscoverScreen}
                options={{
                    headerTitleStyle: {
                        color: "#ebc39d",
                    },
                    headerStyle: {
                        backgroundColor: "#44465B",
                        elevation: 5,
                        shadowColor: "#fff",
                        shadowOpacity: 1,
                    },
                    headerRight: (props) => <LogoHeader />,
                }}
            />
        </DiscoverStack.Navigator>
    );
};

const AddStack = createStackNavigator<RootStackParamList>();
export const AddStackScreen = () => {
    return (
        <AddStack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: "#202D3E" },
            }}
        >
            <AddStack.Screen
                name="Add"
                component={AddScreen}
                options={{
                    headerTitleStyle: {
                        color: "#ebc39d",
                    },
                    headerStyle: {
                        backgroundColor: "#44465B",
                        elevation: 5,
                        shadowColor: "#fff",
                        shadowOpacity: 1,
                    },
                    headerRight: (props) => <LogoHeader />,
                }}
            />
            <AstroHomeStack.Screen
                name="Details"
                component={DetailsScreen}
                options={{
                    headerTitleStyle: {
                        color: "#ebc39d",
                    },
                    headerStyle: {
                        backgroundColor: "#44465B",
                        elevation: 5,
                        shadowColor: "#fff",
                        shadowOpacity: 1,
                    },

                    headerRight: (props) => <LogoHeader />,
                }}
            />
        </AddStack.Navigator>
    );
};

// propriété de navigation commune à chaque écran dans screens/
export interface NavigationProps {
    navigation: StackNavigationProp<RootStackParamList, any>;
}
