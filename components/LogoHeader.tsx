import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";

// affiche le logo en haut à droite du header
export default class LogoHeader extends Component<{}, {}> {
    render() {
        return (
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={require("../assets/astroV2.png")}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    logo: {
        width: 80,
        height: 56,
        marginRight: 10,
    },
});
