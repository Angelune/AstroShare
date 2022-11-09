import SelectDropdown from "react-native-select-dropdown";
import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import Astrophotodbapi from "../services/Astrophotodbapi.service";

interface DropdownCategoriesProps {
    onSelect: (selectedItem: string, index: number) => void;
    // si l'utilisation du dropdown est obligatoire, affiche un petit asterisk
    // à droite du composant.
    required: boolean;
}

export default class DropdownCategories extends Component<
    DropdownCategoriesProps,
    {}
> {
    // affichage du petit asterisks si le dropdown est une information required dans
    // le formulaire
    renderRequired = () => {
        if (this.props.required) {
            return <Text style={styles.required}>*</Text>;
        }
    };

    // récupération des noms de catégorie
    categories = Astrophotodbapi.getCategoryNames();

    render() {
        return (
            <View style={styles.inputContainer}>
                <SelectDropdown
                    data={this.categories}
                    onSelect={this.props.onSelect}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // texte représenté après que l'item soit sélectionné
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        // texte représenté pour chaque item dans le dropdown
                        return item;
                    }}
                    defaultButtonText="Select a Category"
                    buttonStyle={styles.dropdownBtnStyle}
                    buttonTextStyle={styles.dropdownBtnTxtStyle}
                    dropdownIconPosition={"right"}
                    dropdownStyle={styles.dropdownDropdownStyle}
                    rowStyle={styles.dropdownRowStyle}
                    rowTextStyle={styles.dropdownRowTxtStyle}
                />
                {this.renderRequired()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        borderRadius: 15,
        width: 250,
        height: 45,
        marginBottom: 20,
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 16,
    },

    dropdownBtnStyle: {
        width: "80%",
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#444",
        backgroundColor: "#ebc39d",
    },
    dropdownBtnTxtStyle: { color: "#444", textAlign: "left" },
    dropdownDropdownStyle: { backgroundColor: "#EFEFEF" },
    dropdownRowStyle: {
        backgroundColor: "#ebc39d",
        borderBottomColor: "#C5C5C5",
    },
    dropdownRowTxtStyle: { color: "#444", textAlign: "left" },
    required: {
        color: "red",
        fontSize: 20,
    },
});
