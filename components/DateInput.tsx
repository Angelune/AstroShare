import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DateInputState {
    date: Date;
    show: boolean;
}

interface DateInputProps {
    onChangeDate: (selectedDate) => void;
}

export default class DateInput extends Component<
    DateInputProps,
    DateInputState
> {
    state = {
        date: new Date(), //on initialise la date
        show: false, // on n'affiche pas le datepicker
    };

    // lorsque la date est changée, on change la date de l'état et on n'enleve
    // l'affichage du datepicker. On appelle ensuite la méthode onchange qui est passée
    // en propriété à ce composant. Cela permet de personnaliser l'usage de la date quand
    // ce composant est utilisé.
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        this.setState({ date: currentDate, show: false });
        this.props.onChangeDate(selectedDate);
    };

    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.setState({ show: true })}
                    style={styles.buttonDate}
                >
                    <Text>Select a shooting date</Text>
                </TouchableOpacity>

                {/* affichage de la date sélectionnée si elle a été sélectionnée */}
                <Text style={styles.text}>
                    selected:{" "}
                    {this.state.date != undefined
                        ? this.state.date.toLocaleDateString("en-GB")
                        : ""}
                </Text>

                {/* affichage du datepicker si l'état show est true*/}
                {this.state.show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.date}
                        onChange={this.onChange}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonDate: {
        marginTop: 20,
        borderRadius: 15,
        width: 250,
        height: 45,
        marginLeft: 16,
        backgroundColor: "#ebc39d",
        justifyContent: "center",
        alignItems: "center",
    },

    text: {
        marginLeft: 16,
        marginBottom: 20,
        color: "#E0E0E0",
    },
});
