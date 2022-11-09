import React, { Component } from "react";
import { NavigationProps, RootStackParamList } from "../navigation/app-stacks";
import Astrophoto from "../services/astrophoto.service";
import { RouteProp } from "@react-navigation/native";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import Input from "../components/Input";
import { ScrollView } from "react-native-gesture-handler";
import AstroShareDbApi from "../services/Astrophotodbapi.service";
import DropdownCategories from "../components/DropdownCategories";
import DateInput from "../components/DateInput";
import PhotoUploader from "../components/PhotoUploader";

interface AddScreenProps extends NavigationProps {
    route: RouteProp<RootStackParamList, "Add">;
}

interface AddScreenState {
    isSent: boolean;
    postedAstrophoto: Astrophoto;
}

export default class AddScreen extends Component<
    AddScreenProps,
    AddScreenState
> {
    state = {
        isSent: false,
        // l'astrophoto qui est à poster :
        postedAstrophoto: {
            // Nous n'avons pas le temps de modifier l'API pour récupérer le dernier ID
            // ajouté, donc l'id est créé aléatoirement...
            // Nous sommes probablement autant dégoutés que vous en lisant cette solution
            // alternative qui manque terriblement de consistance
            // Mais cela nous permet d'ajouter une fonctionnalité de post sans prendre du temps
            // et remodifier l'API, la re-exporter sur Azure, etc.
            id: Math.floor(Math.random() * 100000),
            title: undefined,
            description: undefined,
            category: undefined,
            opticalInstrument: undefined,
            mount: undefined,
            eyePiece: undefined,
            cameraSettings: undefined,
            postProcessing: undefined,
            additionalDetails: undefined,
            shootingPlace: undefined,
            shootingDate: undefined,
            photographer: undefined,
            imageName: undefined,
            imageBase64: undefined,
        },
    };

    postPhoto = () => {
        // on vérifie que les champs required ont bien été remplis
        const titleNotEmpty =
            this.state.postedAstrophoto.title != undefined &&
            this.state.postedAstrophoto.title != "";
        const descNotEmpty =
            this.state.postedAstrophoto.description != undefined &&
            this.state.postedAstrophoto.description != "";
        const categoryNotEmpty =
            this.state.postedAstrophoto.category != undefined &&
            this.state.postedAstrophoto.category != "";
        const instrumentNotEmpty =
            this.state.postedAstrophoto.opticalInstrument != undefined &&
            this.state.postedAstrophoto.opticalInstrument != "";
        const photoNotEmpty =
            this.state.postedAstrophoto.imageBase64 != undefined &&
            this.state.postedAstrophoto.imageBase64 != "";

        if (
            titleNotEmpty &&
            descNotEmpty &&
            categoryNotEmpty &&
            instrumentNotEmpty &&
            photoNotEmpty
        ) {
            // vérificatoin du succès du post
            const success = AstroShareDbApi.postPhoto(
                this.state.postedAstrophoto
            );
            if (success) {
                this.setState({ isSent: true });
            } else {
                Alert.alert(
                    "Error",
                    "An error occured when posting the photo to the server, try again later."
                );
            }
        } else {
            Alert.alert(
                "Error",
                "Some informations are missing, fill every field with a red *."
            );
        }
    };

    // pour naviguer depuis les détails del a photo postée
    navigateToDetails = () => {
        this.props.navigation.navigate<any>("Details", {
            astrophotoId: this.state.postedAstrophoto.id,
        });
    };

    render() {
        if (this.state.isSent == true) {
            return (
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.headerText}>
                        Your astrophoto has been posted !
                    </Text>
                    <TouchableOpacity
                        onPress={() => this.setState({ isSent: false })}
                        style={styles.buttonRepost}
                    >
                        <Text>Post a new photo ?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.navigateToDetails()}
                        style={styles.buttonRepost}
                    >
                        <Text>Click here to see your Astrophoto.</Text>
                    </TouchableOpacity>
                </ScrollView>
            );
        } else {
            // appel à des sous-composants pour afficher les champs du formulaire
            return (
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.headerText}>
                            Post a new Astrophotography !
                        </Text>

                        <Input
                            placeholder="Title"
                            onChangeText={(text: string) =>
                                this.setState((prevState) => ({
                                    postedAstrophoto: {
                                        ...prevState.postedAstrophoto,
                                        title: text,
                                    },
                                }))
                            }
                            required={true}
                        />

                        <Input
                            placeholder="Description"
                            onChangeText={(text: string) =>
                                this.setState((prevState) => ({
                                    postedAstrophoto: {
                                        ...prevState.postedAstrophoto,
                                        description: text,
                                    },
                                }))
                            }
                            required={true}
                        />
                        <DropdownCategories
                            onSelect={(selectedItem, index) => {
                                this.setState((prevState) => ({
                                    postedAstrophoto: {
                                        ...prevState.postedAstrophoto,
                                        category: String(index),
                                    },
                                }));
                            }}
                            required={true}
                        />

                        <Input
                            placeholder="Optical instrument (Telescope, binoculars, ...)"
                            onChangeText={(text: string) => {
                                this.setState((prevState) => ({
                                    postedAstrophoto: {
                                        ...prevState.postedAstrophoto,
                                        opticalInstrument: text,
                                    },
                                }));
                            }}
                            required={true}
                        />
                        <Input
                            placeholder="Mount (Equatorial, Altazimuth, ...)"
                            onChangeText={(text: string) => {
                                this.setState((prevState) => ({
                                    postedAstrophoto: {
                                        ...prevState.postedAstrophoto,
                                        mount: text,
                                    },
                                }));
                            }}
                            required={false}
                        />
                        <Input
                            placeholder="Eyepiece (25mm, 10mm, ...)"
                            onChangeText={(text: string) => {
                                this.setState((prevState) => ({
                                    postedAstrophoto: {
                                        ...prevState.postedAstrophoto,
                                        eyePiece: text,
                                    },
                                }));
                            }}
                            required={false}
                        />
                        <Input
                            placeholder="Camera settings (Camera model, Parameters, ...)"
                            onChangeText={(text: string) => {
                                this.setState((prevState) => ({
                                    postedAstrophoto: {
                                        ...prevState.postedAstrophoto,
                                        cameraSettings: text,
                                    },
                                }));
                            }}
                            required={false}
                        />
                        <Input
                            placeholder="Post Procesing"
                            onChangeText={(text: string) => {
                                this.setState((prevState) => ({
                                    postedAstrophoto: {
                                        ...prevState.postedAstrophoto,
                                        postProcessing: text,
                                    },
                                }));
                            }}
                            required={false}
                        />
                        <Input
                            placeholder="Additional Details"
                            onChangeText={(text: string) => {
                                this.setState((prevState) => ({
                                    postedAstrophoto: {
                                        ...prevState.postedAstrophoto,
                                        additionalDetails: text,
                                    },
                                }));
                            }}
                            required={false}
                        />
                        <DateInput
                            onChangeDate={(date: Date) => {
                                this.setState((prevState) => ({
                                    postedAstrophoto: {
                                        ...prevState.postedAstrophoto,
                                        shootingDate: date,
                                    },
                                }));
                            }}
                        />
                        <Input
                            placeholder="Shooting Place"
                            onChangeText={(text: string) => {
                                this.setState((prevState) => ({
                                    postedAstrophoto: {
                                        ...prevState.postedAstrophoto,
                                        shootingPlace: text,
                                    },
                                }));
                            }}
                            required={false}
                        />
                        <Input
                            placeholder="Photographer"
                            onChangeText={(text: string) => {
                                this.setState((prevState) => ({
                                    postedAstrophoto: {
                                        ...prevState.postedAstrophoto,
                                        photographer: text,
                                    },
                                }));
                            }}
                            required={false}
                        />
                        <PhotoUploader
                            onChangePhoto={(imgBase64, imageURI) => {
                                this.setState((prevState) => ({
                                    postedAstrophoto: {
                                        ...prevState.postedAstrophoto,
                                        imageBase64: imgBase64,
                                        // le nom est ici égal à l'URI pour simplifier
                                        imageName: imageURI,
                                    },
                                }));
                            }}
                            required={true}
                        />
                        <TouchableOpacity
                            onPress={() => this.postPhoto()}
                            style={styles.photoContainer}
                        >
                            <Image
                                style={styles.buttonPost}
                                source={require("../assets/postV2.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    headerText: {
        marginTop: 15,
        marginBottom: 15,
        fontSize: 25,
        color: "#ebc39d",
    },
    buttonPost: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    photoContainer: {
        width: 200,
        height: 200,
        alignSelf: "center",
    },
    buttonRepost: {
        marginTop: 20,
        borderRadius: 15,
        width: 250,
        height: 45,

        backgroundColor: "#ebc39d",
        justifyContent: "center",
        alignItems: "center",
    },
});
