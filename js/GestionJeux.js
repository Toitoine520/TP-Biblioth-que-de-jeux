import Jeu from "../Models/Jeu";
import AppRechercheJeux from "./AppRechercheJeux";
import DAO from "./DAO";
import DivSelectionJeu from "./Composants/divSelectionJeu";
export default class RechercheJeux{

    static async clickBoutonRecherche(){

        AppRechercheJeux.afficherChargementSectionPrincipale();

        const mapJeux = await DAO.telechargerDonneesjeux();

        AppRechercheJeux.sectionPrincipale.innerHTML = "";

        const divJeux = document.createElement("div");

        divJeux.classList.add("divJeux");

        AppRechercheJeux.sectionPrincipale.append(divJeux);

        mapJeux.forEach(jeu=>{
            const divSelection = new DivSelectionJeu(jeu, this.afficherFicheJeu.bind(this));
            divJeux.append(divSelection.div);//.div
        });
    }

    static afficherFicheJeu(jeu){
        AppRechercheJeux.sectionPrincipale.innerHTML = "";

        const divFicheJeu = document.createElement("div");

        divFicheJeu.classList.add("divFicheJeu");

        AppRechercheJeux.sectionPrincipale.append(divFicheJeu);

        const divFicheInfos = document.createElement("div");
        divFicheInfos.classList.add("divficheinfos");

        divFicheInfos.innerHTML = `
            <div class="ligne1">

                <div class="Nom">
                    <p>${jeu.nom}</p>
                </div>

                <div class="Image">
                    <img src="${jeu.image}" alt="Image de ${jeu.nom}">
                </div>

            </div>

            <div class="ligne2">

                <div class="plateformes">
                    <p>Disponible sur : ${jeu.plateformes1}${jeu.plateformes2}</p>
                </div>

                <div class="date">
                    <p>sorti le ${jeu.dateSortie}</p>
                </div>
                
            </div>

            <div class="DescCourte">
                <p class="sousTitre">Résumé</p>
                <p>${jeu.courteDesc}</p>
            </div>
            
            <div class="DescLongue">
                <p class="sousTitre">Détails</p>
                <p>${jeu.longueDesc}</p>
            </div>
            
        `;
        divFicheJeu.append(divFicheInfos);
        const blockBoutonAjouterFavoris = document.createElement("div");
        const boutonAjouterFavoris = document.createElement("button");

        blockBoutonAjouterFavoris.classList.add("blockBouton");
        boutonAjouterFavoris.classList.add("boutonAjouterFavoris");

        boutonAjouterFavoris.innerText = "Ajouter aux Favoris";

        boutonAjouterFavoris.onclick = ()=>{
            DAO.ajouterAMesFavoris(jeu);
            
            alert("Jeu ajouté aux favoris");
        }
        divFicheJeu.append(blockBoutonAjouterFavoris);
        blockBoutonAjouterFavoris.append(boutonAjouterFavoris);
    }
}
