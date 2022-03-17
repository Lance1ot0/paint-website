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
let canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Récupération des formes que l'on peut sélectionner
let rectangleBtn = document.querySelector('#rectangleBtn');
let ellipseBtn = document.querySelector('#ellipseBtn');
let triangleBtn = document.querySelector('#triangleBtn');

let shapes = [];

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
    console.log("x", startX, "y", startY);
}

canvas.onmousemove = event => {
    if (userDrawing == true) {
        squareWidth = (event.clientX - canvasPos.left) - startX;
        squareHeight = (event.clientY - canvasPos.top) - startY;
        drawRectangle()
        console.log("width", squareWidth, "height", squareHeight)
    }
}

canvas.onmouseout = stopDrawing;
canvas.onmouseup = stopDrawing;

function stopDrawing(){
    event.preventDefault();
    event.stopPropagation();
    userDrawing = false;

    // Ajoute au tableau un object contenant les propriétés de chaque forme
    shapes.push(
            {"rect-posX":startX,
            "rect-posY":startY,
            "rect-width":squareWidth,
            "rect-height":squareHeight});
}

function drawCanvasShapes(){
    // Parcours le tableau de forme pour les déssiner
    for(let i = 0; i < shapes.length; i++)
    {
        ctx.strokeStyle = "black"
        ctx.lineWidth = 2;
        ctx.strokeRect(shapes[i]["rect-posX"], shapes[i]["rect-posY"], shapes[i]["rect-width"], shapes[i]["rect-height"])
    }
}

function drawRectangle() {
    
    // Effacer le canvas et remettre les formes finales
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvasShapes();

    // Propriétés du rectangle
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2;
    ctx.strokeRect(startX, startY, squareWidth, squareHeight)
}


// Création d'un cercle au mouvement : ellipse.js

// Création d'un triangle au mouvement : triangle.js








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



// Change la police global quand on clique dessus
let encodeSans = document.querySelector('#encode-sans');
let smoochSans = document.querySelector('#smooch-sans');
let nunito = document.querySelector('#nunito');
let defaultFont = document.getElementById("default-font");

encodeSans.addEventListener('click', function(){
    body.style.fontFamily = "Encode Sans";
    defaultFont.innerHTML = "Encode Sans";
    defaultFont.style.fontFamily = "Encode Sans";
    
});
smoochSans.addEventListener('click', function(){
    body.style.fontFamily = "Smooch Sans";
    defaultFont.innerHTML = "Smooch Sans";
    defaultFont.style.fontFamily = "Smooch Sans";
    
});
nunito.addEventListener('click', function(){
    body.style.fontFamily = "Nunito";
    defaultFont.innerHTML = "Nunito";
    defaultFont.style.fontFamily = "Nunito";
    
});
