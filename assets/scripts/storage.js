function initStorage() {
    let obj = new Array();
    writeStorage(obj);
    return obj;
}

function readStorage() {

    let obj = JSON.parse(localStorage.getItem("score"));

    if (obj == null) {
        obj = initStorage();
    }
    return (obj);
}

function writeStorage(obj) {
    try {
        localStorage.setItem("score", JSON.stringify(obj));
    } catch (e) {
        console.log(e);
    }
}

function sortAllPlayer(obj){
    let sortedObj = obj.sort((p1, p2) => (p1.score < p2.score) ? 1 : (p1.score > p2.score) ? -1 : 0);
    return sortedObj;
}

function displayAllPlayer() {
    let obj = readStorage();
    let container = document.querySelector("#tableauScore")
    obj = sortAllPlayer(obj);
    for (let cpt = 0; cpt < obj.length; cpt++) {
        let player = document.createElement("p");
        player.innerHTML = obj[cpt].name + " : " + obj[cpt].score;
        player.className = "table";
        container.insertAdjacentElement("beforeend", player);
    }
}

function updateStorage(newName, newScore) {
    let joueur = {
        name: newName,
        score: newScore
    }
    console.log("ce joueur est " + joueur);
    let obj = readStorage();
    let cpt = 0;
    while (cpt < obj.length && obj[cpt].name != joueur.name) {
        cpt++;
    }
    if (cpt < obj.length) {
        if (joueur.score > obj[cpt].score) {
            obj[cpt].score = joueur.score;
        }
    } else {
        obj.push(joueur);
    }
    writeStorage(obj);
}

// let joueur = {
//     name : newName,
//     score : newScore
// }


//Lire une donnée simple (string)
// let str = localStorage.getItem("key");

//Lire une donnée complexe (objet)
// let obj = JSON.parse(localStorage.getItem("key"));

//Lire un entier
// let nbr = parseInt(localStorage.getItem("key"));

//supprimer objet du local storage
// localStorage.removeItem("key");

//vider localStorage
// localStorage.clear();