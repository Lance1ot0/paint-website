// Initialisation du canvas
let canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let shapes = [];

// Récupération du décalage du canvas en x et y par rapport aux margins de la page
const canvasPos = canvas.getBoundingClientRect();

// Pour activer ou non le dessin sur le canvas
let userDrawing = false;

// Point de départ souris
let startX = 0;
let startY = 0;

// Faire un cercle de 360 degrés
let endAngle = (Math.PI * 2)
// Angle de départ de l'ellipse
let startAngle = 0;

// Position finale souris
let endX = 0;
let endY = 0;

// Rayon du cercle sur l'axe X et l'axe Y
let radiusX = 0;
let radiusY = 0


// Créer les eventlistener de la souris 
canvas.onmousedown = event => {
    // clientX = coordoonée horizontale de la souris
    startX = event.clientX - canvasPos.left;
    startY = event.clientY - canvasPos.top;
    // On active
    userDrawing = true
    console.log("Start x", startX, "Start y", startY);
}

canvas.onmousemove = event => {
    if (userDrawing == true) {
        // Position finale de la souris par l'user
        endX = (event.clientX - canvasPos.left);
        endY = (event.clientY - canvasPos.top);

        // Rayon final lorsque l'user a bougé sa souris
        radiusX = Math.abs(endX - startX);
        radiusY = Math.abs(endY - startY)

        // Si le rayonX et plus grand que le rayon Y, alors on dessine un cercle de rayonX et inversement
        if (radiusX > radiusY) {
            drawEllipse(startX, startY, radiusX, startAngle, endAngle);
        } else if (radiusY > radiusX) {
            drawEllipse(startX, startY, radiusY, startAngle, endAngle);
        }
        console.log("rayonX", radiusX, "rayonY", radiusY)
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
    //         {"ellipse-centerPosX":startX,
    //         "ellipse-centerPosY":startY,
    //         "ellipse-radiusX":radiusX,
    //         "ellipse-radiusY":radiusY,
    //         "ellipse-endAngle":endAngle});
}

// function drawCanvasShapes(){
//     // Parcours le tableau de forme pour les déssiner
//     for(let i = 0; i < shapes.length; i++)
//     {
//         ctx.strokeStyle = "black"
//         ctx.lineWidth = 2;
//         ctx.arc(shapes[i]["ellipse-centerPosX"], shapes[i]["ellipse-centerPosY"], shapes[i]["ellipse-radiusX"], shapes[i]["ellipse-radiusY"], shapes[i]["ellipse-endAngle"])
//     }
// }

function drawEllipse(centerPosX, centerPosY, radius, startAngle, endAngle) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawCanvasShapes();

    // Propriétés du cercle
    ctx.beginPath();
    ctx.arc(centerPosX, centerPosY, radius, startAngle, endAngle)
    ctx.closePath();
    ctx.stroke();
}