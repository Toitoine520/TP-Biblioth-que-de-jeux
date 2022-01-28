import AppRechercheJeux from "./AppRechercheJeux";
import DAO from "./DAO";





export default class GestionFavoris{

    static clickBoutonMesFavoris(){

        const mesFavoris = DAO.chargerJeuxFavoris();

        AppRechercheJeux.sectionPrincipale.innerHTML = "";

        const divMesFavoris = document.createElement("div");
        divMesFavoris.classList.add("divMesFavoris");
        AppRechercheJeux.sectionPrincipale.append(divMesFavoris);

        mesFavoris.forEach(mesFavoris=>{
            const divSelection = new divMesFavoris(mesFavoris, this.afficherFicheFavoris.bind(this));
            divMesFavoris.append(divSelection.div);
        });
    }

    static afficherFicheFavoris(jeu){
        AppRechercheJeux.sectionPrincipale.innerHTML = `
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
    <div class="blockBouton">
        <button class="boutonSupprimerFavoris">Supprimer le jeu ${jeu.nom} des favoris</button>
    </div>        
        `;
            // <div class="zoneInfosMesFavoris"></div>

        const boutonSupprimerFavoris = AppRechercheJeux.sectionPrincipale.querySelector(".boutonSupprimerFavoris")
        boutonSupprimerFavoris.onclick = () => {
            const confirmationSuppr = confirm(`Supprimer ${jeu.nom} ?`);
            if(confirmationSuppr){
                DAO.retirerFavoris(jeu);

                this.clickBoutonMesFavoris;
            }
        }
    }
}