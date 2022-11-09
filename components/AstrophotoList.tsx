import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import AstrophotoItem from "./AstrophotoItem";
import Astrophoto from "../services/astrophoto.service";
import { RootStackParamList } from "../navigation/app-stacks";
import { StackNavigationProp } from "@react-navigation/stack";

interface AstrophotoListProps {
    astrophotos: Array<Astrophoto>;
    navigation: StackNavigationProp<RootStackParamList, any>;
}

export default class AstrophotoList extends Component<AstrophotoListProps, {}> {
    // Affichage d'un item de la liste à l'aide d'un AstrophotoItem
    renderItem = ({ item }: { item: Astrophoto }) => {
        return (
            <AstrophotoItem
                astrophoto={item}
                navigation={this.props.navigation}
            />
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList<Astrophoto>
                    style={styles.container}
                    data={this.props.astrophotos}
                    renderItem={this.renderItem}
                    keyExtractor={(item: Astrophoto) => item.id.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
    },
});
