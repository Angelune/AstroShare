import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

interface InputProps {
    placeholder: string;
    onChangeText: (text: string) => void;
    // si l'information récupérée par l'input est obligatoire, affiche un petit asterisk
    // à droite du composant.
    required: boolean;
}

export default class Input extends Component<InputProps, {}> {
    // affichage du petit asterisks si le champ input récpuère une informationrequired dans
    // le formulaire
    renderRequired = () => {
        if (this.props.required) {
            return <Text style={styles.required}>*</Text>;
        }
    };

    render() {
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    placeholder={this.props.placeholder}
                    onChangeText={this.props.onChangeText}
                    multiline={this.props.required}
                />
                {this.renderRequired()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: "#ebc39d",
        color: "#fff",
        borderRadius: 15,
        width: 250,
        height: 45,
        marginBottom: 20,
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 16,
    },
    inputText: {
        marginLeft: 15,
        height: 45,
        borderBottomColor: "#FFFFFF",
        flex: 1,
    },
    required: {
        color: "red",
        fontSize: 20,
    },
});
