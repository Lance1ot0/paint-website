// Initialisation du canvas
let canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let shapes = [];

// Récupération du décalage du canvas en x et y par rapport aux margins de la page
const canvasPos = canvas.getBoundingClientRect();

// Pour activer ou non le dessin sur le canvas
let userDrawing = false;

// Point départ souris
let startX = 0;
let startY = 0;

// Position finale souris
let endX = 0;
let endY = 0;

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
        // Position finale de la souris par l'user
        endX = (event.clientX - canvasPos.left);
        endY = (event.clientY - canvasPos.top);
        drawTriangle()
        console.log("width", endX, "height", endY)
    }
}

canvas.onmouseout = stopDrawing;
canvas.onmouseup = stopDrawing;

function stopDrawing(){
    event.preventDefault();
    event.stopPropagation();
    userDrawing = false;

    // Ajoute au tableau un object contenant les propriétés de chaque forme
    // shapes.push(
    //         {"rect-posX":startX,
    //         "rect-posY":startY,
    //         "rect-width":squareWidth,
    //         "rect-height":squareHeight});
}

// function drawCanvasShapes(){
//     // Parcours le tableau de forme pour les déssiner
//     for(let i = 0; i < shapes.length; i++)
//     {
//         ctx.strokeStyle = "black"
//         ctx.lineWidth = 2;
//         ctx.strokeRect(shapes[i]["rect-posX"], shapes[i]["rect-posY"], shapes[i]["rect-width"], shapes[i]["rect-height"])
//     }
// }

function drawTriangle() {
    // Effacer le canvas et remettre les formes finales
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawCanvasShapes();

    // Propriétés du triangle
    ctx.beginPath();
    // point de départ du tracé, donc startX, startY
    ctx.moveTo(startX, startY)
    // Point d'arrivé du tracé, ligne tracée de startX, startY vers endX, endY
    ctx.lineTo(endX, endY)
    ctx.lineTo(startX - (endX - startX), endY) // Trouver la première
    ctx.lineTo(startX, startY)
    ctx.fill()
    ctx.closePath()  
}

// // Propriétés du triangle
// ctx.beginPath();
// // point de départ du tracé, donc startX, startY
// ctx.moveTo(0, 50)
// // Point d'arrivé du tracé, ligne tracée de startX, startY vers endX, endY
// ctx.lineTo(20, 0)
// ctx.lineTo(40, 50)
// ctx.lineTo(0, 50)
// ctx.stroke()
// ctx.closePath()