// Initialisation du canvas
let canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Récupération des formes que l'on peut sélectionner
let rectangleBtn = document.querySelector('#rectangleBtn');
let ellipseBtn = document.querySelector('#ellipseBtn');
let triangleBtn = document.querySelector('#triangleBtn');
let textBtn = document.querySelector('#textBtn');
let moveBtn = document.querySelector('#moveBtn');

rectangleBtn.onclick = () => {selectedShape = "rectangle"; console.log()};
ellipseBtn.onclick = () => {selectedShape = "ellipse";};
triangleBtn.onclick = () => {selectedShape = "triangle";};
textBtn.onclick = () => {
    selectedShape = "text";
    body.classList.remove('open-file');
    body.classList.remove('open-shape');
};

// Forme selectioné par l'utilisateur
let selectedShape = "rectangle";

// Liste des propriétés des formes
let shapes = [];

// Récupération du décalage du canvas en x et y par rapport aux margins de la page
const canvasPos = canvas.getBoundingClientRect();

// Pour activer ou non le dessin sur le canvas
let userDrawing = false;

// Position de la souris on click
let mouseClickPosX = 0;
let mouseClickPosY = 0;

// Taille du rectangle
let squareWidth = 0;
let squareHeight = 0;

// Faire un cercle de 360 degrés
let endAngle = (Math.PI * 2)
// Angle de départ de l'ellipse
let startAngle = 0;

// Position finale souris
let mouseMovingPosX = 0;
let mouseMovingPosY = 0;

// Rayon du cercle sur l'axe X et l'axe Y
let radiusX = 0;
let radiusY = 0


// Créer les eventlistener de la souris 
canvas.onmousedown = event => {

    mouseClickPosX = event.clientX - canvasPos.left;
    mouseClickPosY = event.clientY - canvasPos.top;

    userDrawing = true
    console.log("x", mouseClickPosX, "y", mouseClickPosY);
}

canvas.onmousemove = event => {

    mouseMovingPosX = (event.clientX - canvasPos.left);
    mouseMovingPosY = (event.clientY - canvasPos.top);

    
    if (userDrawing == true) {

        // Effacer le canvas et remettre les formes finales
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCanvasShapes();
        
        // Si la forme sélectionnée est un rectangle
        if(selectedShape == "rectangle")
        {
            squareWidth = (event.clientX - canvasPos.left) - mouseClickPosX;
            squareHeight = (event.clientY - canvasPos.top) - mouseClickPosY;
            drawRectangle();
            console.log("width", squareWidth, "height", squareHeight)
        }

        // Si la forme sélectionnée est une ellipse
        else if(selectedShape == "ellipse")
        {

            // Rayon final lorsque l'user a bougé sa souris
            radiusX = Math.abs(mouseMovingPosX - mouseClickPosX);
            radiusY = Math.abs(mouseMovingPosY - mouseClickPosY)

            // Si le rayonX et plus grand que le rayon Y, alors on dessine un cercle de rayonX et inversement
            if (radiusX > radiusY) {
                drawEllipse(mouseClickPosX, mouseClickPosY, radiusX, startAngle, endAngle);
            } else if (radiusY > radiusX) {
                drawEllipse(mouseClickPosX, mouseClickPosY, radiusY, startAngle, endAngle);
            }
            console.log("rayonX", radiusX, "rayonY", radiusY);
        }

        // Si la forme sélectionnée est un triangle
        else if(selectedShape == "triangle")
        {
            drawTriangle();
        }


        // Si la forme est un texte
        // else if(selectedShape == "text")
        // {
        //     ctx.fillText('Hello world', 100, 259);
        // }
        
    }
}

canvas.onmouseout = () => {stopDrawing(event);};
canvas.onmouseup = () => {stopDrawing(event);};

function stopDrawing(event){
    event.preventDefault();
    event.stopPropagation();
    


    if(userDrawing)
    {
        // Ajoute au tableau un object contenant les propriétés de chaque forme
        if(selectedShape == "rectangle")
        {
            shapes.push(
                {"shape":"rectangle",
                "rect-posX":mouseClickPosX,
                "rect-posY":mouseClickPosY,
                "rect-width":squareWidth,
                "rect-height":squareHeight});
        }
        else if(selectedShape == "ellipse")
        {
            shapes.push(
                {"shape":"ellipse",
                "centerPosX":mouseClickPosX,
                "centerPosY":mouseClickPosY,
                "radiusX":radiusX,
                "radiusY":radiusY,
                "endAngle":endAngle});
        }
        else if(selectedShape == "triangle")
        {
            shapes.push(
                {"shape":"triangle",
                "startPosX":mouseClickPosX,
                "startPosY":mouseClickPosY,
                "endPosX":mouseMovingPosX,
                "endPosY":mouseMovingPosY});
        }
    }

    console.log(shapes);
    userDrawing = false;
}


// Redessine toutes les formes sauvegardées sur le canvas
function drawCanvasShapes(){
    // Parcours le tableau de forme pour les déssiner

    for(let i = 0; i < shapes.length; i++)
    {
        ctx.strokeStyle = "black"
        
        if(shapes[i]["shape"] == "rectangle")
        {
            ctx.strokeRect(shapes[i]["rect-posX"], shapes[i]["rect-posY"], shapes[i]["rect-width"], shapes[i]["rect-height"]);
        }
        else if(shapes[i]["shape"] == "ellipse")
        {
            if (shapes[i]["radiusX"] > shapes[i]["radiusY"]) {
                drawEllipse(shapes[i]["centerPosX"], shapes[i]["centerPosY"], shapes[i]["radiusX"], startAngle, shapes[i]["endAngle"]);
            } else if (shapes[i]["radiusY"] > shapes[i]["radiusX"]) {
                drawEllipse(shapes[i]["centerPosX"], shapes[i]["centerPosY"], shapes[i]["radiusY"], startAngle, shapes[i]["endAngle"]);
            }
        }
        else if(shapes[i]["shape"] == "triangle")
        {
            ctx.beginPath();
            // point de départ du tracé, donc startX, startY
            ctx.moveTo(shapes[i]["startPosX"], shapes[i]["startPosY"])
            // Point d'arrivé du tracé, ligne tracée de startX, startY vers endX, endY
            ctx.lineTo(shapes[i]["endPosX"], shapes[i]["endPosY"])
            ctx.lineTo(shapes[i]["startPosX"] - (shapes[i]["endPosX"] - shapes[i]["startPosX"]), shapes[i]["endPosY"]) // Trouver la première
            ctx.lineTo(shapes[i]["startPosX"], shapes[i]["startPosY"])
            ctx.stroke()
            ctx.closePath() 
        }
    }

}

function drawRectangle() {
    // Propriétés du rectangle
    ctx.strokeStyle = "black"
    ctx.strokeRect(mouseClickPosX, mouseClickPosY, squareWidth, squareHeight)
}

function drawEllipse(centerPosX, centerPosY, radius, startAngle, endAngle) {
    // Propriétés du cercle
    ctx.beginPath();
    ctx.arc(centerPosX, centerPosY, radius, startAngle, endAngle)
    ctx.closePath();
    ctx.stroke();
}


function drawTriangle() {
    // Propriétés du triangle
    ctx.beginPath();
    // point de départ du tracé, donc startX, startY
    ctx.moveTo(mouseClickPosX, mouseClickPosY)
    // Point d'arrivé du tracé, ligne tracée de startX, startY vers endX, endY
    ctx.lineTo(mouseMovingPosX, mouseMovingPosY)
    ctx.lineTo(mouseClickPosX - (mouseMovingPosX - mouseClickPosX), mouseMovingPosY) // Trouver la première
    ctx.lineTo(mouseClickPosX, mouseClickPosY)
    ctx.stroke()
    ctx.closePath() 
}