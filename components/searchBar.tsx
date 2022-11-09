import React, { Component } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

interface SearchBarProps {
    onSubmitEditing: (task: string) => void;
}

interface SearchBarState {
    value: string;
}

export default class SearchBar extends Component<
    SearchBarProps,
    SearchBarState
> {
    state: SearchBarState = {
        value: "",
    };

    onChangeText = (newvalue: string) => {
        this.setState({ value: newvalue });
    };

    onSubmitEditing = () => {
        this.props.onSubmitEditing(this.state.value);
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Search an Astrophoto..."
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSubmitEditing}
                ></TextInput>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ebc39d",
        elevation: 10,
        shadowsColor: "#fff",
        shadowOpacity: 1,
    },
    input: {
        marginTop: 15,
        marginBottom: 15,
        fontSize: 20,
        marginLeft: 10,
        color: "black",
    },
});
