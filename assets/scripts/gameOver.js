// fin de partie

function gameOver() {
    let jeu = document.querySelector("#jeu");
    let fin = document.querySelector("#fin");
    jeu.style.display = 'none';
    fin.style.display = 'inherit';
    
    displayAllPlayer();
}