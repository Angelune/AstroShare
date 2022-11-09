import React, { Component } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import Astrophoto from "../services/astrophoto.service";
import AstroShareDbApi from "../services/Astrophotodbapi.service";
import AstrophotoInformation from "./AstrophotoInformation";

interface AstrophotoDetailsProps {
    astrophoto: Astrophoto;
}

export default class AstrophotoDetails extends Component<AstrophotoDetailsProps> {
    // Permet d'afficher la date dans le bon format
    displayDate = () => {
        let date = new Date(this.props.astrophoto.shootingDate);
        let shootDate = date.toLocaleDateString("en-BR");
        return shootDate;
    };

    render() {
        // récupération de l'image en base 64
        var base64Image = "data:image/png;base64,".concat(
            this.props.astrophoto.imageBase64
        );

        // Rendu graphique de la monture
        // On regarde simplement si la monture est indiquée dans l'astrophoto
        // si oui, on retourne le composant astrophotoInfoItem qui contient affiche les informations sur la monture
        const renderMount = () => {
            if (
                this.props.astrophoto.mount != "" &&
                this.props.astrophoto.mount != null
            ) {
                return (
                    <AstrophotoInformation
                        infoTitle="Mount"
                        info={this.props.astrophoto.mount}
                    ></AstrophotoInformation>
                );
            }
        };

        // pareil pour eyePiece
        const renderEyePiece = () => {
            if (
                this.props.astrophoto.eyePiece != "" &&
                this.props.astrophoto.eyePiece != null
            ) {
                return (
                    <AstrophotoInformation
                        infoTitle="Eye Piece"
                        info={this.props.astrophoto.eyePiece}
                    ></AstrophotoInformation>
                );
            }
        };

        const renderCameraSettings = () => {
            if (
                this.props.astrophoto.cameraSettings != "" &&
                this.props.astrophoto.cameraSettings != null
            ) {
                return (
                    <AstrophotoInformation
                        infoTitle="Camera Settings"
                        info={this.props.astrophoto.cameraSettings}
                    ></AstrophotoInformation>
                );
            }
        };

        const renderPostProcessing = () => {
            if (
                this.props.astrophoto.postProcessing != "" &&
                this.props.astrophoto.postProcessing != null
            ) {
                return (
                    <AstrophotoInformation
                        infoTitle="Post Processing"
                        info={this.props.astrophoto.postProcessing}
                    ></AstrophotoInformation>
                );
            }
        };

        const renderAdditionalDetails = () => {
            if (
                this.props.astrophoto.additionalDetails != "" &&
                this.props.astrophoto.additionalDetails != null
            ) {
                return (
                    <AstrophotoInformation
                        infoTitle="Additional Details"
                        info={this.props.astrophoto.additionalDetails}
                    ></AstrophotoInformation>
                );
            }
        };

        const renderShootingPlace = () => {
            if (
                this.props.astrophoto.shootingPlace != "" &&
                this.props.astrophoto.shootingPlace != null
            ) {
                return (
                    <AstrophotoInformation
                        infoTitle="Shooting Place"
                        info={this.props.astrophoto.shootingPlace}
                    ></AstrophotoInformation>
                );
            }
        };

        const renderShootingDate = () => {
            if (this.props.astrophoto.shootingDate != null) {
                return (
                    <AstrophotoInformation
                        infoTitle="Shooting Date"
                        info={this.displayDate()}
                    ></AstrophotoInformation>
                );
            }
        };

        const renderPhotographer = () => {
            if (
                this.props.astrophoto.photographer != "" &&
                this.props.astrophoto.photographer != null
            ) {
                return (
                    <AstrophotoInformation
                        infoTitle="Photographer"
                        info={this.props.astrophoto.photographer}
                    ></AstrophotoInformation>
                );
            }
        };

        return (
            <ScrollView>
                <View style={styles.containerTop}>
                    <Text
                        style={{
                            fontSize: 30,
                            marginTop: 20,
                            color: "#ebc39d",
                        }}
                    >
                        {this.props.astrophoto.title}
                    </Text>
                    <Image
                        style={styles.image}
                        source={{
                            uri: base64Image,
                        }}
                    />
                </View>

                {/* ces éléments sont en required donc toujours affichés */}
                <AstrophotoInformation
                    infoTitle="Category"
                    info={AstroShareDbApi.getCategoryName(
                        this.props.astrophoto.category
                    )}
                ></AstrophotoInformation>

                <AstrophotoInformation
                    infoTitle="Description"
                    info={this.props.astrophoto.description}
                ></AstrophotoInformation>

                <AstrophotoInformation
                    infoTitle="Optical Instrument"
                    info={this.props.astrophoto.opticalInstrument}
                ></AstrophotoInformation>

                {/* on appelle en suite les méthodes render pour chaque information
                faccultative. Cela permet de ne pas avoir d'espaces blancs dans le cas
                ou les informations ne sont pas remplies */}

                {renderMount()}

                {renderEyePiece()}

                {renderCameraSettings()}

                {renderPostProcessing()}

                {renderAdditionalDetails()}

                {renderShootingPlace()}

                {renderShootingDate()}

                {renderPhotographer()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    containerTop: {
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        width: 300,
        height: 300,
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 10,
    },
});
