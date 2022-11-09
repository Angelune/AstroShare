import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

interface AstrophotoInfoItemProps {
    infoTitle: string;
    info: string;
}

export default class AstrophotoInformation extends Component<
    AstrophotoInfoItemProps,
    {}
> {
    // render simplement une petite boite avec le libellé de l'information et l'information
    render() {
        return (
            <View style={styles.containerInfo}>
                <Text style={styles.infoTitle}>{this.props.infoTitle} :</Text>
                <Text style={styles.information}>{this.props.info}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 5,
        borderColor: "#ebc39d",
        borderWidth: 2,
        borderRadius: 10,
        flexWrap: "wrap",
    },
    information: {
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 20,
        color: "#E0E0E0",
    },
    infoTitle: {
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 20,
        color: "#ebc39d",
        fontWeight: "bold",
    },
});
