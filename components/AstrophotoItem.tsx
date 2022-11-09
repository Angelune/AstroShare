import React, { Component } from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Astrophoto from "../services/astrophoto.service";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/app-stacks";

interface AstrophotoItemProps {
    astrophoto: Astrophoto;
    navigation: StackNavigationProp<RootStackParamList, any>;
}

export default class AstrophotoItem extends Component<AstrophotoItemProps, {}> {
    // permet de naviguer sur la page de détail de l'astrophoto
    navigateToDetails = () => {
        this.props.navigation.navigate<any>("Details", {
            astrophotoId: this.props.astrophoto.id,
        });
    };

    render() {
        // base 64 de la l'image qui sera affichée en miniature
        var base64Icon = "data:image/png;base64,".concat(
            this.props.astrophoto.imageBase64
        );

        return (
            // un élément de la liste est cliquable et permet de renvoyer sur la
            // page de détail associée
            <TouchableOpacity
                onPress={() => this.navigateToDetails()}
                style={styles.container}
            >
                <Image
                    style={styles.image}
                    source={{
                        uri: base64Icon,
                    }}
                />
                <Text style={styles.astrophotoname}>
                    {this.props.astrophoto.title}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        shadowColor: "#ebc39d",
        shadowOffset: { width: 20, height: 20 },
        shadowRadius: 20,
        shadowOpacity: 20,
    },
    astrophotoname: {
        fontSize: 20,
        //fontFamily: "Courier New",
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 20,
        alignContent: "center",
        color: "#ebc39d",
    },
    image: {
        width: 70,
        height: 70,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        marginLeft: 10,
    },
});
