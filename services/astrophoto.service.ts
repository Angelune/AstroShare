// modele de l'astrophoto identique à celui de la bdd de l'api

export default interface Astrophoto {
    id: number;
    title: string;
    description: string;
    category: string; // category est normalement une énumération, ici on la stock en string
    opticalInstrument: string;
    mount: string;
    eyePiece: string;
    cameraSettings: string;
    postProcessing: string;
    additionalDetails: string;
    shootingPlace: string;
    shootingDate: Date;
    photographer: string;
    imageName: string;
    imageBase64: string;
}
