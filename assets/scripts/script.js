
//change de div pour lancer la partie
function commencer() {
    let button = document.querySelector("button#start");
    let debut = document.querySelector("#debut");
    let jeu = document.querySelector("#jeu");
    let form = document.querySelector("#name");
    let player = document.querySelector("#player");
    let ambiance = new Audio('assets/audio/ambiance.mp3');
    
    button.addEventListener('click', () => {
        if (form.value != "") {
            player.innerHTML = form.value;
            debut.style.display = 'none';
            jeu.style.display = 'inherit';
            ambiance.play();
        }
    });
}

// donne un nombre random entre min et max avec max exclu
function getRandomInt(min, max) {
    nbRandom = Math.floor(Math.random() * max);
    if (nbRandom < min) {
        return getRandomInt(min, max);
    }
    return nbRandom;
}

//creer un objet newDuck, lui donne les caracteristique d'un super duck, l'anime et le delete
function spawnSuperDuck() {
    let superSound = new Audio('assets/audio/helicoptere.mp3');
    superSound.load();
    superSound.play();
    let jeu = document.querySelector("#jeu");
    let newDuck = document.createElement("img");
    newDuck.src = "assets/images/duck.png";
    newDuck.className = "superDuck1";
    newDuck.draggable = false;
    jeu.insertAdjacentElement("beforeend", newDuck);
    let duree = getRandomInt(2000, 4000);
    newDuck.animate([
        {
            transform: 'translateY(' + getRandomInt(380, 430) + 'px' + ') translateX(' + getRandomInt(0, 800) + 'px' + ') rotate(-90deg) ',
        },
        {
            transform: 'translateY(' + -200 + 'px) translateX(' + getRandomInt(0, 800) + 'px) rotate(' + getRandomInt(45, 135) + 'deg)'
        }
    ], {
        duration: duree,
        iterations: 1
    });
    setTimeout(() => {
        superSound.pause();
        newDuck.remove();
    }, duree);
}

//creer un objet newDuck, lui donne les caracteristique d'un duck, l'anime et le delete
function spawnDuck() {
    let jeu = document.querySelector("#jeu");
    let newDuck = document.createElement("img");
    newDuck.src = "assets/images/duck.gif";
    newDuck.className = "duck";
    newDuck.draggable = false;
    jeu.insertAdjacentElement("beforeend", newDuck);
    let duree = getRandomInt(2000, 4000);
    newDuck.animate([
        {
            transform: 'translateY(' + getRandomInt(380, 430) + 'px' + ') translateX(' + getRandomInt(0, 800) + 'px' + ') rotate(90deg) ',
        },
        {
            transform: 'translateY(' + -200 + 'px) translateX(' + getRandomInt(0, 800) + 'px) rotate(' + getRandomInt(45, 135) + 'deg)'
        }
    ], {
        duration: duree,
        iterations: 1
    });
    setTimeout(() => {
        newDuck.remove();
    }, duree);
}

//lance la partie, la creation de cannards 
function startGame() {
    let partie = setInterval(() => {
        let nb = getRandomInt(0, 100);
        if (nb < 5)
            spawnSuperDuck();
        else
            spawnDuck();

    }, 1000);
}

//verfie si on clique sur un cannard ou pas
function addGlobalListener() {
    let jeu = document.querySelector("#jeu");
    let bullets = document.querySelectorAll(".munition");
    let multiplicateur = document.querySelector("#multiplicateur");
    let score = document.querySelector("#score");
    let gameScore = document.querySelector("#gameScore");
    let player = document.querySelector("#player");
    let nb_score = 0;
    let nb_multiplicateur = 1;
    let nb = 9;
    let gunshot = new Audio('assets/audio/gunshot.mp3');

    jeu.addEventListener('click', (element) => {
        gunshot.load();
        gunshot.play();
        if (element.target.className == "duck") {
            element.target.src = "assets/images/explosion.gif";

            setTimeout(() => {

                element.target.remove();
            }, 500);
            nb_score += 2 * nb_multiplicateur;
            nb_multiplicateur += 1;
        }
        else if(element.target.className == "superDuck1"){
            element.target.className = "superDuck2";
        }
        else if (element.target.className == "superDuck2") {
            element.target.src = "assets/images/explosion.gif";
            setTimeout(() => {
                element.target.remove();
            }, 500);
            nb_score += 20 * nb_multiplicateur;
            nb_multiplicateur += 1;
        }
        else {
            bullets[nb].remove();
            nb--;
            nb_multiplicateur = 1;
        }
        multiplicateur.innerHTML = "Multiplicateur : x" + nb_multiplicateur;
        score.innerHTML = "Score : " + nb_score;
        gameScore.innerHTML = "Score : " + nb_score;
        if (nb == -1) {

            updateStorage(player.innerHTML, nb_score);
            gameOver();
        }
    });
}

function toScore() {
    let button = document.querySelector("#toScore");
    let fin = document.querySelector("#fin");
    let tableauScore = document.querySelector("#tableauScore");

    button.addEventListener('click', () => {
        fin.style.display = "none";
        tableauScore.style.display = "inherit";
    })
}


commencer();
startGame();
addGlobalListener();
toScore();