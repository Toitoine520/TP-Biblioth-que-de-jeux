import DAO from "../js/DAO";

export default class Jeu{
    nom = "";
    image = "";
    plateformes1 = [];
    plateformes2 = [];
    dateSortie = new Date(); //Sortie (prévue si pas encore sorti)(sur 2 lignes)
    courteDesc = "";
    longueDesc = "";

    jsonJeu;

    constructor(jsonJeu){
        this.recupererDonneesAPI(jsonJeu);
    }

    recupererDonneesAPI(jsonJeu){
        this.jsonJeu = jsonJeu;

        this.nom = jsonJeu.name;
        this.image = jsonJeu.image.medium_url;


        this.plateformes1 = jsonJeu.platforms[0].abbreviation;

        // const

        if(!jsonJeu.platforms[1] === null){

        }

        // const plateformes = [];
        


        this.dateSortie = jsonJeu.date_added;

        this.courteDesc = jsonJeu.deck;
        this.longueDesc = jsonJeu.description;
    }
}