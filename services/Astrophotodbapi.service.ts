import Astrophoto from "./astrophoto.service";

const rootEndpoint = "https://enscastrosharev2.azurewebsites.net/api/PhotosApi";

class AstroShareDbApi {
    // Permet de récupérer les astrophotos à partir d'une recherche par mots clés
    searchAstrophoto(search: string): Promise<Array<Astrophoto>> {
        return this.fetchArrayFromApi(
            `${rootEndpoint}/search/${search.trim()}`
        );
    }

    // Recupere une astrophoto depuis son id
    searchAstrophotoById(id: number): Promise<Astrophoto> {
        const res = this.fetchObjectFromApi(`${rootEndpoint}/${id}`);
        return res;
    }

    // recupere toutes le sastrophotos
    getAllAstrophoto(): Promise<Array<Astrophoto>> {
        return this.fetchArrayFromApi(`${rootEndpoint}/all`);
    }

    // reucpere n astrophotos aléatoirement
    getNRandomAstrophoto(n: number): Promise<Array<Astrophoto>> {
        return this.fetchArrayFromApi(`${rootEndpoint}/random/${n}`);
    }

    // poste une photo à l'API
    deletePhoto(id: number): boolean {
        let success = true;
        fetch(`${rootEndpoint}/${id}`, {
            method: "DELETE",
        }).catch((error) => {
            console.log(error);
            success = false;
        });
        return success;
    }

    // poste une photo à l'API
    postPhoto(photoToPost: Astrophoto): boolean {
        let success = true;
        fetch(`${rootEndpoint}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.createAstrophotoToPost(photoToPost)),
        }).catch((error) => {
            console.log(error);
            success = false;
        });
        return success;
    }

    // retourne le nom de la catégorie à partir de l'indice de l'énumération Category de l'API
    getCategoryName(num: string): string {
        const names = this.getCategoryNames();
        return names[Number(num)];
    }

    // retourne toutes les catégories
    getCategoryNames(): Array<string> {
        // Normalement, un point d'accès de l'API permet de récupérer ces noms de catégorie,
        // mais nous n'avons pas réussi à le mettre en place avec react native
        // une solution alternative a été de retourner directement le tableau de noms de catégories
        return [
            "Planet",
            "Star",
            "Galaxy",
            "Nebula",
            "DustCloud",
            "NaturalSatellite",
            "ArtificialSatellite",
            "StarCluster",
            "Asteroid",
            "Comet",
            "Meteor",
            "Other",
        ];
    }

    // fetch un tableau depuis l'API
    private fetchArrayFromApi(query: string): Promise<Array<Astrophoto>> {
        return fetch(query)
            .then((response) => response.json())
            .then((jsonResponse) => jsonResponse || [])
            .catch((error) => {
                console.error(error);
            });
    }

    // fetch un objet depuis l'API
    private fetchObjectFromApi(query: string): Promise<Astrophoto> {
        return fetch(query)
            .then((response) => response.json())
            .then((jsonResponse) => jsonResponse || undefined)
            .catch((error) => {
                console.error(error);
            });
    }

    // Met juste une majuscule au début de chaque clé de l'interface Astrophoto
    // (Les requêtes get donnent des photos avec les lettres en minuscule mais
    // quand on veut poster, il faut que ce soit avec la première lettre en majuscule)
    // nous devons donc créer un type intermédiaire uniquement pour le post
    private createAstrophotoToPost(astrophoto: Astrophoto): Object {
        return {
            Id: astrophoto.id,
            Title: astrophoto.title,
            Description: astrophoto.description,
            Category: Number(astrophoto.category),
            OpticalInstrument: astrophoto.opticalInstrument,
            Mount: astrophoto.mount,
            EyePiece: astrophoto.eyePiece,
            CameraSettings: astrophoto.cameraSettings,
            PostProcessing: astrophoto.postProcessing,
            AdditionalDetails: astrophoto.additionalDetails,
            ShootingPlace: astrophoto.shootingPlace,
            ShootingDate: astrophoto.shootingDate,
            Photographer: astrophoto.photographer,
            ImageName: astrophoto.imageName,
            ImageBase64: astrophoto.imageBase64,
        };
    }
}

export default new AstroShareDbApi();
