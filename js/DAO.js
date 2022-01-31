import Jeu from "../Models/Jeu";



export default class DAO{
    static #mapJeux = new Map();

    static #mapFavoris = new Map();

    static async telechargerDonneesjeux(){

        if(this.#mapJeux.size > 0){
            return this.#mapJeux;
        }

        try{
            const reslisteJeux = await fetch("https://www.giantbomb.com/api/games/?api_key=055093dc734256fc598ab3ce9b4ecf22508bab5f&format=json");
            const jsonRequeteJeux = await reslisteJeux.json();
            const listeJeux = jsonRequeteJeux.results;

            if(!listeJeux || !Array.isArray(listeJeux) || listeJeux.length === 0){
                throw new Error("Données non conformes");
            }

            // const tableauPromisesJeux = [];
            // listeJeux.forEach(objListe=>{
            //     const promiseJeu = fetch(objListe.url);
            //     tableauPromisesJeux.push(promiseJeu);
            // });

            // const resJeux = await Promise.all(tableauPromisesJeux);
            // const tableauPromisesJsonJeux = [];

            // resJeux.forEach(resJeu=>{
            //     tableauPromisesJsonJeux.push(resPokemon.json());
            // });
            // const jsonJeux = await Promise.all(tableauPromisesJsonJeux);

            for(let i = 0; i < listeJeux.length; i++){
                const jsonJeu = listeJeux[i]; //CONSTRUCTEUR DANS LA CLASSE JEU
                const jeu = new Jeu(jsonJeu);

                this.#mapJeux.set(jeu.nom, jeu);
            }
            
            return this.#mapJeux;
        }catch(erreur) {
            console.error(erreur);
            alert("Erreur pendant le téléchargement des données");
        }
    }

    static verifierSiFavorisExistant(jeu){
        return !this.#mapFavoris.has(jeu);
    }

    static ajouterAMesFavoris(jeu){
        const jeuFavoris = new Jeu(jeu.jsonJeu);

        this.#mapFavoris.set(jeuFavoris);

        this.#sauvegarderMesFavoris();
    }

    static miseAJourJeu(jeu){
        this.#sauvegarderMesFavoris();
    }

    static #sauvegarderMesFavoris(){
        const tableauMesFavoris = Array.from(this.#mapFavoris.values());

        window.localStorage.setItem("mesFavoris", JSON.stringify(tableauMesFavoris));
    }

    static chargerJeuxFavoris(){
        this.#mapFavoris = new Map();

        const json = window.localStorage.getItem("mesFavoris");

        if(!json){
            return this.#mapFavoris;
        }

        const tableauParse = JSON.parse(json);

        tableauParse.forEach(jeuObj=>{
            // const jeuFavoris = new Jeu(jeuObj.jsonJeu);

            // jeuFavoris.nom = jeuObj.nom;

            // this.#mapFavoris.set(jeuFavoris.nom, jeuFavoris);
        });

        return this.#mapJeux;
    }

    static retirerFavoris(jeu){

        this.#mapJeux.delete(jeu);
        
        this.#sauvegarderMesFavoris;
    }
}