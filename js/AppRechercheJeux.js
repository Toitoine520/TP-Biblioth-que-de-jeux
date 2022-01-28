import DAO from "./DAO";
import GestionFavoris from "./GestionFavoris";
import GestionJeux from "./GestionJeux";

export default class AppRechercheJeux{
    static sectionPrincipale;

    static initialisation() {

        DAO.chargerJeuxFavoris();

        this.sectionPrincipale = document.querySelector(".sectionJeux");

        if(!this.sectionPrincipale){
            throw new Error("La section principale est introuvable");
        }

        //

        const boutonRecherche = document.querySelector(".boutonRecherche");
        const boutonFavoris = document.querySelector(".boutonFavoris");

        if(!boutonRecherche){
            throw new Error("Le bouton Recherche est introuvable");
        }

        boutonRecherche.addEventListener("click", GestionJeux.clickBoutonRecherche.bind(GestionJeux));
        boutonFavoris.addEventListener("click", GestionFavoris.clickBoutonMesFavoris.bind(GestionFavoris));
    }

    static afficherChargementSectionPrincipale(){
        this.sectionPrincipale.innerHTML = "";

        const chargement = document.createElement("div");

        chargement.classList.add("chargement");

        

        this.sectionPrincipale.append(chargement);


    }
}

window.onload = AppRechercheJeux.initialisation.bind(AppRechercheJeux);