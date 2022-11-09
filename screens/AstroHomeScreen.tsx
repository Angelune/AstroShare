import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import SearchBar from "../components/searchBar";
import AstroShareDbApi from "../services/Astrophotodbapi.service";
import Astrophoto from "../services/astrophoto.service";
import AstrophotoList from "../components/AstrophotoList";
import { RouteProp } from "@react-navigation/core";
import { RootStackParamList, NavigationProps } from "../navigation/app-stacks";

interface AstroHomeScreenProps extends NavigationProps {
    route: RouteProp<RootStackParamList, "AstroHome">;
}

interface AstroHomeScreenState {
    astrophotos: Array<Astrophoto>;
}

export default class AstroHomeScreen extends Component<
    AstroHomeScreenProps,
    AstroHomeScreenState
> {
    state: AstroHomeScreenState = {
        astrophotos: [],
    };

    // affichage de toutes les astrophotos
    componentDidMount() {
        AstroShareDbApi.getAllAstrophoto().then((results) => {
            this.setState({ astrophotos: results });
        });
    }

    // récupération des résultats du requetage de l'API pour la recherche
    getResults = (keyword: string) => {
        if (keyword != "") {
            AstroShareDbApi.searchAstrophoto(keyword).then((results) => {
                this.setState({ astrophotos: results });
            });
        } else {
            // si rien n'est rentré dans la barre de recherche mais que l'utilisateur
            // appuie sur "entrée" alors on retourne toutes les astrophotos
            AstroShareDbApi.getAllAstrophoto().then((results) => {
                this.setState({ astrophotos: results });
            });
        }
    };

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <SearchBar onSubmitEditing={this.getResults} />
                <AstrophotoList
                    astrophotos={this.state.astrophotos}
                    navigation={navigation}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
