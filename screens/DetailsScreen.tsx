import React, { Component } from "react";
import { NavigationProps, RootStackParamList } from "../navigation/app-stacks";
import AstroShareDbApi from "../services/Astrophotodbapi.service";
import Astrophoto from "../services/astrophoto.service";
import { RouteProp } from "@react-navigation/native";
import AstrophotoDetails from "../components/AstrophotoDetails";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

interface DetailsScreenProps extends NavigationProps {
    route: RouteProp<RootStackParamList, "Details">;
}

interface DetailsScreenState {
    astrophoto: Astrophoto;
    isLoading: boolean;
    isDeleted: boolean;
}

export default class DetailsScreen extends Component<
    DetailsScreenProps,
    DetailsScreenState
> {
    state = {
        astrophoto: null,
        isLoading: true,
        isDeleted: false,
    };

    componentDidMount() {
        const astrophotoId = this.props.route.params.astrophotoId;
        // récuperation de l'astrophoto à partir de l'ID
        AstroShareDbApi.searchAstrophotoById(astrophotoId).then(
            (newAstrophoto: Astrophoto) => {
                this.props.navigation.setOptions({
                    title: newAstrophoto.title,
                });
                this.setState({ astrophoto: newAstrophoto, isLoading: false });
            }
        );
    }

    render() {
        if (this.state.isLoading) {
            return <ActivityIndicator />;
        }
        if (this.state.isDeleted) {
            return (
                <View style={{ justifyContent: "center" }}>
                    <Text style={styles.textDelete}>
                        This photo has been deleted.
                    </Text>
                </View>
            );
        } else {
            return (
                <ScrollView contentContainerStyle={styles.container}>
                    <AstrophotoDetails astrophoto={this.state.astrophoto} />
                    <TouchableOpacity
                        onPress={() => {
                            const success = AstroShareDbApi.deletePhoto(
                                this.state.astrophoto.id
                            );
                            if (success) {
                                this.setState({ isDeleted: true });
                            } else {
                                Alert.alert(
                                    "Error",
                                    "An error occured while deleting this photo."
                                );
                            }
                        }}
                        style={styles.buttonDelete}
                    >
                        <Text style={styles.textbtn}>Delete this photo.</Text>
                    </TouchableOpacity>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    buttonDelete: {
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 15,
        width: 250,
        height: 45,
        marginLeft: 16,
        backgroundColor: "#ebc39d",
        justifyContent: "center",
        alignItems: "center",
    },
    textDelete: {
        marginTop: 20,
        marginLeft: 15,
        fontSize: 25,
        color: "#ebc39d",
    },
    textbtn: {
        fontSize: 20,
    },
    container: {
        alignItems: "center",
    },
});
