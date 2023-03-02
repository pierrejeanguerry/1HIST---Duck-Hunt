function gameOver() {
    let jeu = document.querySelector("#jeu");
    let fin = document.querySelector("#fin");
    // jeu.remove();
    jeu.style.display = 'none';
    fin.style.display = 'inherit';
    
    displayAllPlayer();
}