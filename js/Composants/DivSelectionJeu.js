import GestionFavoris from "../GestionFavoris";

export default class DivSelectionJeu{
    div;

    constructor(jeu, callBackClick){
        const divJeu = document.createElement("div");
        divJeu.classList.add("divJeu");

        let classePremiereLigne;
        let contenuPremiereLigne;
        let classeSecondeLigne;
        let contenuSecondeLigne;

        // if(jeu instanceof JeuFavoris){

        // }

        classePremiereLigne = "plateformesJeu";
        contenuPremiereLigne = `disponible sur : ${jeu.platforms}`;
        classeSecondeLigne = "nomJeu";
        contenuSecondeLigne = jeu.nom;

        divJeu.innerHTML = `
            <img src="${jeu.image}" alt="Image Jeu ${jeu.nom}">
            <p class="${classePremiereLigne}>${contenuPremiereLigne}</p>
            <p class="${classeSecondeLigne}>${contenuSecondeLigne}</p>
        `;

        if(callBackClick){
            divJeu.onclick = () =>{
                callBackClick(jeu);
            };
        }

        this.div = divJeu;
    }
}