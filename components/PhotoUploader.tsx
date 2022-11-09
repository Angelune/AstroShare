import React, { Component } from "react";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

interface PhotoUploaderState {
    imageURI: string;
    imageBase64: string;
}

interface PhotoUploaderProps {
    onChangePhoto: (imgBase64, imageURI) => void;
    // required pour afficher un petit asterisk si l'upload est obligatoire
    required: boolean;
}

export default class PhotoUploader extends Component<
    PhotoUploaderProps,
    PhotoUploaderState
> {
    state = {
        imageURI: undefined,
        imageBase64: "",
    };

    // affichage de l'asterisk si nécessaire
    renderRequired = () => {
        if (this.props.required) {
            return <Text style={styles.required}>*</Text>;
        }
    };

    // récupération de l'image depuis la galerie
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        });

        if (!result.cancelled) {
            // transtypage en Object pour éviter une erreur de typage
            this.setState({ imageURI: Object(result).uri });

            // conversion en base64
            const base64 = await FileSystem.readAsStringAsync(
                this.state.imageURI,
                { encoding: "base64" }
            );

            this.setState({ imageBase64: base64 });

            // on appelle la méthode onChangePhoto des propriétés lorsque l'image a été
            // choisie.
            this.props.onChangePhoto(
                this.state.imageBase64,
                this.state.imageURI
            );
        }
    };

    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={this.pickImage}
                    style={styles.buttonPhoto}
                >
                    <View style={{ flexDirection: "row" }}>
                        <Text>Select a photo to upload </Text>
                        {this.renderRequired()}
                    </View>
                </TouchableOpacity>

                {this.state.imageURI && (
                    <Image
                        source={{ uri: this.state.imageURI }}
                        style={styles.image}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonPhoto: {
        marginTop: 20,
        borderRadius: 15,
        width: 250,
        height: 45,
        marginLeft: 16,
        backgroundColor: "#ebc39d",
        justifyContent: "center",
        alignItems: "center",
    },

    image: {
        width: 200,
        height: 200,
        marginTop: 16,
        alignSelf: "center",
    },
    required: {
        color: "red",
        fontSize: 20,
    },
});
