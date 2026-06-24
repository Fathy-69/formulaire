export default class Formulaire {

    //définition du constructeur

    constructor(id) {
        this.id = id;
        this.formulaireHtml = document.getElementById(this.id);
        this.formdata = new FormData(this.formulaireHtml);
        this.answers = [];
    }

    //méthode pour récupérer le div parent

    getDiv(id) {
        const element = this.getElement(id);
        // On vérifie que l'élément et son parent existent avant de le retourner
        return element ? element.parentNode : null;
    }

    //méthode pour récupérer un élément

    getElement(id) {
        const element = document.getElementById(id);
        if (!element) {
            // Avertit si l'élément n'est pas trouvé, ce qui aide au débogage.
            console.warn(`L'élément avec l'ID "${id}" est introuvable.`);
        }
        return element;
    }

    //méthode permettant de masquer un élément sans animation

    maskChamp(id) {
        const div = this.getDiv(id);
        if (div) {
            div.classList.add('masque');
        }
        const element = this.getElement(id);
        if (element) {
            element.required = false;
        }
    }

    //méthode permettant d'afficher le champ

    showChamp(id) {
        const div = this.getDiv(id);
        if (div) {
            div.classList.remove('disp');
            div.classList.add('app');
        }
        const element = this.getElement(id);
        if (element) {
            element.required = true;
        }
    }

    //méthode permettant de masquer le champ avec animation

    hideChamp(id) {
        const div = this.getDiv(id);
        if (div) {
            div.classList.remove('app');
            div.classList.add('disp');
        }
        const element = this.getElement(id);
        if (element) {
            element.required = false;
        }
    }

    //méthode pour savoir si un radio est sélectionné

    isSelected(id, value, action, otherAction) {
        this.formdata = new FormData(this.formulaireHtml);
        if(this.formdata.get(id) == value) {
            action();
        }
        else {
            otherAction();
        }
    }

    //méthode pour récupérer les éléments de chaque input (et les ajouter à answer)

    getAnswers() {
        this.formdata = new FormData(this.formulaireHtml);
        this.formdata.forEach(
            (value, key) => {
                if(value != "" && value != "on") {
                    this.answers.push([key, value]);
                }
            }
        )
        return this.answers
    }

    //MÉTHODE POUR AFFICHER DANS UN ALERT LES RÉSULTATS

    affAnswers() {
        let chaine = "Récapitulatif\n\n";
        for (let ligne of this.getAnswers()) {
            chaine += `${ligne [0]} : ${ligne[1]}\n`
        }
        alert(chaine);
    }
}