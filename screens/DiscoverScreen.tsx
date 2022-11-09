import React, { Component } from "react";
import { NavigationProps, RootStackParamList } from "../navigation/app-stacks";
import AstroShareDbApi from "../services/Astrophotodbapi.service";
import Astrophoto from "../services/astrophoto.service";
import { RouteProp } from "@react-navigation/native";
import AstrophotoDetails from "../components/AstrophotoDetails";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface DiscoverScreenProps extends NavigationProps {
    route: RouteProp<RootStackParamList, "Discover">;
}

interface DiscoverScreenState {
    astrophoto: Astrophoto;
    isLoading: boolean;
}

export default class DiscoverScreen extends Component<
    DiscoverScreenProps,
    DiscoverScreenState
> {
    state = {
        astrophoto: null,
        isLoading: true,
    };

    getRandomAstrophoto = () => {
        // récupératon d'une astrophoto aléatoirement
        AstroShareDbApi.getNRandomAstrophoto(1).then((results) => {
            this.setState({ astrophoto: results[0], isLoading: false });
        });
    };

    render() {
        const renderDetails = () => {
            if (this.state.isLoading == false) {
                return <AstrophotoDetails astrophoto={this.state.astrophoto} />;
            }
        };

        return (
            <ScrollView style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => this.getRandomAstrophoto()}
                    style={styles.container}
                >
                    <Image
                        style={styles.buttondiscover}
                        source={require("../assets/discoverV3.png")}
                    />
                </TouchableOpacity>

                {renderDetails()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    buttondiscover: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    container: {
        width: 200,
        height: 200,
        alignSelf: "center",
    },
});
