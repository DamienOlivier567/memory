// Array of Deck of Card Images
// Tableau de jeux d'images de cartes
let deckCards = [
    "./img/agility.png",
    "./img/agility.png",
    "./img/Boat.png",
    "./img/Boat.png",
    "./img/Citizenship.png",
    "./img/Citizenship.png",
    "./img/Hack.png",
    "./img/Hack.png",
    "./img/Nerd-Rage.png",
    "./img/Nerd-Rage.png",
    "./img/robotic.png",
    "./img/robotic.png",
    "./img/Shock_Value.png",
    "./img/Shock_Value.png",
    "./img/Nuka-Cola.png",
    "./img/Nuka-Cola.png"
];

// Global Arrays
// Access the <ul> with class of .deck
// Tableaux globaux
// Accéder au <ul> avec la classe de .deck
let deck = document.querySelector(".deck");

// Create an empty array to store the opened cards
// Crée un tableau vide pour stocker les cartes ouvertes
let opened = [];

// Create an empty array to store the matched cards
// Crée un tableau vide pour stocker les cartes correspondantes
let matched = [];

// Access the modal
// Accéder au modal
let modal = document.getElementById("modal");

// Access the reset button
// Accéder au bouton de réinitialisation
let reset = document.querySelector(".reset-btn");

// Access the play again button
// Accéder au bouton de lecture à nouveau
let playAgain = document.querySelector(".play-again-btn");

// Select the class moves-counter and change it's HTML
// Sélectionnez le compteur de mouvements de classe et changez son HTML
let movesCount = document.querySelector(".moves-counter");

// Create variable for moves counter, start the count at zero
// Créer une variable pour le compteur de mouvements, démarrer le comptage à zéro
let moves = 0;

// Access the <ul> element for the star rating section and then the <li> elements within it
// Accédez à l'élément <ul> pour la section de classement par étoiles, puis aux éléments <li> qu'il contient
let star = document.getElementById("star-rating").querySelectorAll(".star");

// Variable to keep track of how many stars are left
// Variable pour garder une trace du nombre d'étoiles restantes
let starCount = 3;

// Get the span tag for the timer.
// Récupère la balise span pour le minuteur.
let timeCounter = document.querySelector(".timer");

// To use this variable to stop the time started in timer
// Pour utiliser cette variable pour arrêter le temps démarré dans le timer
let time;

// Create variables for time count, start all at zero
// Créer des variables pour le décompte du temps, tout commencer à zéro
let minutes = 0;
let seconds = 0;

// For use in the click card event listener
// À utiliser dans l'écouteur d'événement de carte de clic
let timeStart = false;

// Shuffle function
// Fonction Shuffle (Melange)
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
/*
Star Game: Shuffle the deck, create <li> tags and <img>
tags and append to the deck <ul> with the new shuffled content
 */

/*
Démarrer le jeu: mélangez le jeu, créez des balises <li> et <img>
balises et ajouter au deck <ul> avec le nouveau contenu melangé
*/

function startGame() {
    // Invoke shuffle function and store in variable
    // Invoque la fonction shuffle et stocke dans la variable
    let shuffledDeck = shuffle(deckCards);

    // Iterate over deck of cards array
    // Itérer sur le tableau du jeu de cartes
    for (let i = 0; i < shuffledDeck.length; i++) {

        // Create the <li> tags
        // Créer les balises <li>
        let liTag = document.createElement('LI');

        // Give <li> class of card
        // Donne la classe de carte <li>
        liTag.classList.add('card');

        // Create the <img> tags
        // Créer les balises <img>
        let addImage = document.createElement("IMG");

        // Append <img> to <li>
        // Ajouter <img> à <li>
        liTag.appendChild(addImage);

        // Set the img src path with the shuffledDeck
        // Prendre les images avec shuffledDeck
        addImage.src = shuffledDeck[i];

        // Update the new <li> to the deck <ul>
        // Mettre à jour le nouveau <li> vers le deck <ul>
        deck.appendChild(liTag);
    }
}

startGame();

/*
Remove all child nodes from the deck <li> tags and
<img> tags.  To be called in set everything function only
*/

/*
Supprimez tous les noeuds enfants des balises <li> du deck et
Balises <img>. Pour être appelé dans la function set tout uniquement
 */

function removeCard() {
    // As long as <ul> deck has a child node, remove it
    // Tant que le deck <ul> a un nœud enfant, supprimez-le
    while (deck.hasChildNodes()) {
        deck.removeChild(deck.firstChild);
    }
}

/*
Update the timer in the HTML for minutes and seconds
This timer() function is invoked in the event listener
on the first card click
*/

/*
Mettez à jour le minuteur dans le HTML pendant des minutes et des secondes
Cette fonction timer () est appelée dans l'écouteur d'événements
sur la première carte clique
*/

function timer() {
    // Update the count every 1 second
    // Mettre à jour le décompte toutes les 1 seconde
    time = setInterval(function() {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        // Update the timer in HTML with the time it takes the user to play the game
        // Mettre à jour le minuteur en HTML avec le temps nécessaire à l'utilisateur pour jouer au jeu
        timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Temps: " + minutes + " Mins " + seconds + " Secs" ;
    }, 1000);
}

/*
Stop the timer once the user has matched
all 16 cards, total of 8 pairs
*/

/*
Arrêtez le chronomètre une fois que l'utilisateur a correspondu
les 16 cartes 8 paires au total
*/

function stopTime() {
    clearInterval(time);
}

/*
Reset all global variables and the content of HTML elements
timer, stars moves and the moves and timer inner HTML
*/

/*
Réinitialiser toutes les variables globales et le contenu des eéléments HTML
minuterie étoiles mouvements et minuterie HTML interne
*/

function resetEverything() {
    // Stop time, reset the minutes and seconds update the time inner HTML
    // Arrêter l'heure, réinitialiser les minutes et les secondes mettre à jour l'heure HTML interne
    stopTime();
    timeStart = false;
    seconds = 0;
    minutes = 0;
    timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: 00:00";
    // Reset star count and the add the class back to show stars again
    // Réinitialise le nombre d'étoiles et ajoute la classe pour afficher à nouveau les étoiles
    star[1].firstElementChild.classList.add("fa-star");
    star[2].firstElementChild.classList.add("fa-star");
    starCount = 3;
    // Reset moves count and reset its inner HTML
    // Réinitialise le nombre de mouvements et réinitialise son code HTML interne
    moves = 0;
    movesCount.innerHTML = '0';
    // Clear both arrays that hold the opened and matched cards
    // Efface les deux tableaux contenant les cartes ouvertes et correspondantes
    matched = [];
    opened = [];
    removeCard();
    startGame();
}

/*
Increment the moves counter.  To be called at each
comparison for every two cards compared add one to the count
*/

/*
Incrémentez le compteur de coups. Être appelé à chaque
comparaison pour deux cartes comparées ajouter une au nombre
*/

function movesCounter() {
    // Update the html for the moves counter
    // Mettre à jour le html pour le compteur de coups
    movesCount.innerHTML ++;
    // Keep track of the number of moves for every pair checked
    // Gardez une trace du nombre de coups pour chaque paire cochée
    moves ++;
}

/*
Update the star rating.  Depending on the number of
moves the user completes the game, the stars will decrease
with the more moves the user takes.
*/

/*
Mettez à jour le nombre d'étoiles. En fonction du nombre de
déplace l'utilisateur termine le jeu, les étoiles diminuent
avec le plus de mouvements que l'utilisateur prend.
*/

function starRating() {
    if (moves === 14) {
        // First element child is the <i> within the <li>
        // Le premier élément enfant est le <i> dans le <li>
        star[2].firstElementChild.classList.remove("fa-star");
        starCount--;
    }
    if (moves === 18) {
        star[1].firstElementChild.classList.remove("fa-star");
        starCount--;
    }
}

/*
Compare two cards to see if they match or not
*/

/*
Comparez deux cartes pour voir si elles correspondent ou non
*/

function compareTwo() {
    // When there are 2 cards in the opened array
    // Lorsqu'il y a 2 cartes dans le tableau ouvert
    if (opened.length === 2) {
        // Disable any further mouse clicks on other cards
        document.body.style.pointerEvents = "none";
    }
    // Compare the two images
    // Compare les deux images
    if (opened.length === 2 && opened[0].src === opened[1].src) {
        // If matched call match()
        // Si l'appel correspond à match ()
        match();
    } else if (opened.length === 2 && opened[0].src !== opened[1].src) {
        // If No match call noMatch()
        // Si aucune correspondance n'appelle noMatch ()
        noMatch();
    }
}

/*
If the two cards match, keep the cards open and
apply class of match
*/

/*
Si les deux cartes correspondent, gardez les cartes ouvertes et
appliquer la classe de correspondance
*/

function match() {
    /* Access the two cards in opened array and add
    the class of match to the imgages parent: the <li> tag
    */

    /* Accédez aux deux cartes du tableau ouvert et ajoutez
    la classe de correspondance avec le parent imgages: la balise <li>
    */

    setTimeout(function() {
        opened[0].parentElement.classList.add("match");
        opened[1].parentElement.classList.add("match");
        // Push the matched crads to the matched array
        // Poussez les cartes correspondantes vers le tableau correspondant
        matched.push(...opened);
        // Allow for further mouse clicks on cards
        // Autorise d'autres clics de souris sur les cartes
        document.body.style.pointerEvents = "auto";
        // Check to see if the game has been won with all 8 pairs
        // Vérifiez si le jeu a été gagné avec les 8 paires
        winGame();
        // Clear the opened array
        // Efface le tableau ouvert
        opened = [];
    }, 600);
    // Call movesCounter to increment by 1
    // Appelez movesCounter pour incrémenter de 1
    movesCounter();
    starRating();
}

/*
If the two cards do not match, remove the cards
from the opened array and flip the cards back over by
removing the flip class.
*/


/*
Si les deux cartes ne correspondent pas, retirez les cartes
du tableau ouvert et retournez les cartes en
suppression de la classe flip.
*/

function noMatch() {
    /* After 700 miliseconds the two cards open will have
    the class of flip removed from the images parent element <li>*/

    /* Après 700 millisecondes, les deux cartes ouvertes auront
    la classe de flip supprimée de l'élément parent images <li> */
    setTimeout(function() {
        // Remove class flip on images parent element
        // Supprimer le retournement de classe sur l'élément parent des images
        opened[0].parentElement.classList.remove("flip");
        opened[1].parentElement.classList.remove("flip");
        // Allow further mouse clicks on cards
        // Autorise d'autres clics de souris sur les cartes
        document.body.style.pointerEvents = "auto";
        // Remove the cards from opened array
        // Retirer les cartes du tableau ouvert
        opened = [];
    }, 700);
    // Call movesCounter to increment by one
    // Appelez movesCounter pour incrémenter de un
    movesCounter();
    starRating();
}

/*
Get stats on the time how many moves and star rating
for the end game and update the modal with these stats
 */

/*
Obtenez des statistiques sur le temps le nombre de coups et le nombre d'etoiles
pour la fin du jeu et mettez à jour le modal avec ces statistiques
 */

function AddStats() {
    // Access the modal content div
    // Accéder à la div de contenu modal
    let stats = document.querySelector(".modal-content");
    // Create three different paragraphs
    // Créer trois paragraphes différents
    for (let i = 1; i <= 3; i++) {
        // Create a new Paragraph
        // Créer un nouveau paragraphe
        const statsElement = document.createElement("p");
        // Add a class to the new Paragraph
        // Ajouter une classe au nouveau paragraphe
        statsElement.classList.add("stats");
        // Add the new created <p> tag to the modal content
        // Ajoute la nouvelle balise <p> créée au contenu modal
        stats.appendChild(statsElement);
    }
    // Select all p tags with the class of stats and update the content
    // Sélectionnez toutes les balises p avec la classe de stats et mettez à jour le contenu
    let p = stats.querySelectorAll("p.stats");
    // Set the new <p> to have the content of stats (time, moves and star rating)
    // Définit le nouveau <p> pour avoir le contenu des statistiques (temps, coups et classement par étoiles)
    p[0].innerHTML = "Temps pour terminer: " + minutes + " Minutes  " + seconds + " Seconds";
    p[1].innerHTML = "Mouvements effectués: " + moves;
    p[2].innerHTML = "Votre classement par étoiles est: " + starCount + " sur 3";
}

/*
Display the modal on winning the game
*/

/*
Afficher le modal en gagnant la partie
*/

function displayModal() {
    // Access the modal <span> element (x) that closes the modal
    // Accède à l'élément modal <span> (x) qui ferme le modal
    const modalClose = document.getElementsByClassName("close")[0];

    // When the game is won set modal to display block to show it
    // Lorsque le jeu est gagné, définissez modal pour afficher le bloc pour le montrer
    modal.style.display= "block";

    // When the user clicks on <span> (x), close the modal
    // Lorsque l'utilisateur clique sur <span> (x), ferme le modal
    modalClose.onclick = function() {
        modal.style.display = "none";
    };
    // When the user clicks anywhere outside of the modal, close it
    // Lorsque l'utilisateur clique n'importe où en dehors du modal, fermez-le
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

/*
Check the length of the matched array and if there
are 8 pairs 16 cards all together then the game is won.
Stop the timer update the modal with stats and show the modal
*/

/*
Vérifiez la longueur du tableau correspondant et s'il y a
sont 8 paires 16 cartes en tout, alors le jeu est gagné.
    Arrêtez le minuteur, mettez à jour le modal avec des statistiques et affichez le modal
*/

function winGame() {
    if (matched.length === 16) {
        stopTime();
        AddStats();
        displayModal();
    }
}

/*----------------------------------
Main Event Listener
------------------------------------*/
/*
Event Listener if a card <li> is clicked
call flipCard()
*/

/*----------------------------------
Écouteur de l'événement principal
------------------------------------*/
/*
Écouteur d'événement si vous cliquez sur une carte <li>
appeler flipCard ()
*/

deck.addEventListener("click", function(evt) {
    if (evt.target.nodeName === "LI") {
        // To console if I was clicking the correct element
        // Pour consoler si je cliquais sur l'élément correct
        console.log(evt.target.nodeName + " Was clicked");
        // Start the timer after the first click of one card
        // Executes the timer() function
        // Démarre le chronomètre après le premier clic d'une carte
        // Exécute la fonction timer ()
        if (timeStart === false) {
            timeStart = true;
            timer();
        }
        // Call flipCard () function
        // Appel de la fonction flipCard ()
        flipCard();
    }

    //Flip the card and display cards img
    // Retourner la carte et afficher les cartes img
    function flipCard() {
        // When <li> is clicked add the class .flip to show img
        // Lorsque <li> est cliqué, ajoutez la classe .flip pour afficher img
        evt.target.classList.add("flip");
        // Call addToOpened() function
        // Appel de la fonction addToOpened ()
        addToOpened();
    }
    //Add the fliped cards to the empty array of opened
    // Ajoute les cartes retournées au tableau vide de ouvert
    function addToOpened() {
        /* If the opened array has zero or one other img push another
        img into the array so we can compare these two to be matched
        */

        /* Si le tableau ouvert a zéro ou un autre img, poussez un autre
        img dans le tableau afin que nous puissions comparer ces deux pour être mis en correspondance
        */

        if (opened.length === 0 || opened.length === 1) {
            // Push that img to opened array
            // Poussez cette image dans le tableau ouvert
            opened.push(evt.target.firstElementChild);
        }
        // Call compareTwo() function
        // Appel de la fonction compareTwo ()
        compareTwo();
    }
});

//Event Listener

/*----------------------------------
Restart Buttons
------------------------------------*/
/*
Event Listener to listen for a click on the reset
button, once clicked call resetEverything()
*/

// Écouteur d'événements

/*----------------------------------
Boutons de redémarrage
------------------------------------*/
/*
Event Listener pour écouter un clic sur la réinitialisation
bouton, une fois cliqué, réinitialiser l'appel
* /
reset.addEventListener('click', resetEverything);

/*
Event Listener to listen for a click on the play
again button, once clicked call resetEverything()
*/

playAgain.addEventListener('click',function() {
    modal.style.display = "none";
    resetEverything();
});