// Sélection du menu file
let fileToggleMenu = document.querySelector('.file-menu-scroll');

// Sélection du menu formes
let shapeToggleMenu = document.querySelector('.shape')

// Sélection du menu export
let exportToggleMenu = document.querySelector('#export-as')

// Sélection du menu font
let fontToggleMenu = document.querySelector(".font-menu")

// Sélection du body
let body = document.querySelector('body');

// Attribue une classe spécifique au body lorsque l'on clique sur le menu file et ferme le menu shape s'il est ouvert
fileToggleMenu.addEventListener('click', function () {
    body.classList.toggle('open-file');
    body.classList.remove('open-shape');
    body.classList.remove('open-font')
});

// Attribue une classe spécifique au body lorsque l'on clique sur le menu shape et ferme le menu file s'il est ouvert
shapeToggleMenu.addEventListener('click', function () {
    body.classList.toggle('open-shape');
    body.classList.remove('open-file');
    body.classList.remove('open-font')
});

// Affiche le menu export au survol de la souris
exportToggleMenu.addEventListener('mouseover', function () {
    body.classList.toggle('open-export');
});

// Ferme le menu export au survol de la souris
exportToggleMenu.addEventListener('mouseout', function () {
    body.classList.remove('open-export');
});

// Attribue une classe spécifique au body lorsque l'on clique sur le menu font et ferme le menu font s'il est ouvert
fontToggleMenu.addEventListener('click', function () {
    body.classList.toggle('open-font');
    body.classList.remove('open-file');
    body.classList.remove('open-shape');
});



// Initialisation du canvas
let canvas = document.querySelector('#whiteboard');
const ctx = canvas.getContext('2d');

// Récupération du décalage du canvas en x et y par rapport aux margins de la page
const canvasPos = canvas.getBoundingClientRect();

// Pour activer ou non le dessin sur le canvas
let userDrawing = false;
let startX = 0;
let startY = 0;
let squareWidth = 0;
let squareHeight = 0;

// Créer les eventlistener de la souris 
canvas.onmousedown = event => {
    // clientX = coordoonée horizontale de la souris
    startX = event.clientX - canvasPos.left;
    startY = event.clientY - canvasPos.top;
    // On active
    userDrawing = true
    console.log("x", x, "y", y);
};

canvas.onmouseup = event => {
    event.preventDefault();
    event.stopPropagation();
    userDrawing = false;
};

// Création d'un rectangle au mouvement du user
canvas.onmousemove = event => {
    if (userDrawing == true) {
        squareWidth = event.clientX - canvasPos.left
        squareHeight = event.clientY - canvasPos.top;
        drawRectangle(startX, startY, squareWidth - startX, squareHeight - startY)
        console.log("width", squareWidth, "height", squareHeight)
    }
};

function drawRectangle(startPosX, startPosY, width, height) {
    // Propriétés du rectangle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2;
    ctx.strokeRect(startPosX, startPosY, width, height)
}



// squarePosX = event.pageX - this.offsetLeft
// squarePosY = event.pageY - this.offsetTop
// ctx.fillRect(squarePosX, squarePosY, 100, 100);
// console.log(squarePosX, squarePosY)

// POUR FAIRE DES RECTANGLES
// fillRect(x, y, largeur px, hauteur px)
// Dessine un rectangle rempli.

// strokeRect(x, y, largeur, hauteur)
// Dessine un contour rectangulaire

// clearRect(x, y, largeur, hauteur)
// Efface la zone rectangulaire spécifiée, la rendant complètement transparente.

    // ctx.fillRect(25, 25, 100, 100);
    //  ctx.clearRect(45, 45, 60, 60);
    //  ctx.strokeRect(50, 50, 50, 50);

// POUR FAIRE DES CERCLES
// arc(x, y, rayon, angleInitial, angleFinal, antihoraire)
// Dessine un arc de cercle qui est centré à la position (x, y), de rayon r, commençant à angleInitial et finissant à angleFinal en allant dans le sens indiqué par antihoraire (par défaut, horaire).
// Les anglaes sont en radians, pour convertir des degrés en radiants : radians = (Math.PI/180)*degres

    // ctx.beginPath();
    //     var x = 200; // Coordonnée x
    //     var y = 300; // Coordonnée y
    //     var rayon = 200; // Rayon de l'arc
    //     var angleInitial = 0; // Point de départ sur le cercle
    //     var angleFinal = Math.PI + (Math.PI * 180) / 2; // Point d'arrivée sur le cercle
    //      // Horaire ou antihoraire
    //     var antihoraire = 4 % 2;
    //     ctx.arc(x, y, rayon, angleInitial, angleFinal, antihoraire);
    //     ctx.fill();
    //     ctx.stroke()
