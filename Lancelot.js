

let canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let shapes = [];

let selectedShape = "none";
let selectedColor = "black";

const strokeRectShapeBtn = document.querySelector('#strokeRectShapeBtn');
const filleRectShapeBtn = document.querySelector('#filleRectShapeBtn');

strokeRectShapeBtn.onclick = () => {selectedShape = "strokeRect"; span.textContent = "Stroke Rect Selected";};
filleRectShapeBtn.onclick = () => {selectedShape = "fillRect"; span.textContent = "Fill Rect Selected";};

const redBtn = document.querySelector('#redBtn');
const blueBtn = document.querySelector('#blueBtn');
const blackBtn = document.querySelector('#blackBtn');

redBtn.onclick = () => {selectedColor = "red"; spanB.textContent = "Color Selected : red";};
blueBtn.onclick = () => {selectedColor = "blue"; spanB.textContent = "Color Selected : blue";};
blackBtn.onclick = () => {selectedColor = "black"; spanB.textContent = "Color Selected : black";};

const lastShapeBtn = document.querySelector('#lastShapeBtn');
lastShapeBtn.onclick = () => {
    
    if(shapes.length != 0)
    {
        shapes.pop();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCanvasShapes();
    }
};

const span = document.querySelector('span');
const spanB = document.querySelector('spanB');

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
    if(selectedShape != "none")
    {
    userDrawing = true
    console.log("x", startX, "y", startY);
    }
    else{
        span.textContent = "You have to select a shape !";
    }
}

canvas.onmousemove = event => {
    if (userDrawing == true) {
        squareWidth = (event.clientX - canvasPos.left) - startX;
        squareHeight = (event.clientY - canvasPos.top) - startY;
        drawRectangle()
        console.log("width", squareWidth, "height", squareHeight)
    }
}

canvas.onmouseout = () => {stopDrawing(event);};
canvas.onmouseup = () => {stopDrawing(event);};

function stopDrawing(event){
    event.preventDefault();
    event.stopPropagation();

    // Ajoute au tableau un object contenant les propriétés de chaque forme
    if(userDrawing)
    {
        shapes.push(
            {"rect-posX":startX,
            "rect-posY":startY,
            "rect-width":squareWidth,
            "rect-height":squareHeight,
            "state":selectedShape,
            "color":selectedColor});
    }

    userDrawing = false;

}

function drawCanvasShapes(){
    // Parcours le tableau de forme pour les déssiner

    for(let i = 0; i < shapes.length; i++)
    {
        ctx.lineWidth = 2;

        if(shapes[i]["state"] == "strokeRect")
        {
            ctx.strokeStyle = shapes[i]["color"];
            ctx.strokeRect(shapes[i]["rect-posX"], shapes[i]["rect-posY"], shapes[i]["rect-width"], shapes[i]["rect-height"]);
        }
        else if(shapes[i]["state"] == "fillRect")
        {
            ctx.fillStyle = shapes[i]["color"];
            ctx.fillRect(shapes[i]["rect-posX"], shapes[i]["rect-posY"], shapes[i]["rect-width"], shapes[i]["rect-height"]);  
        }
        
    }
}

function drawRectangle() {

    // Effacer le canvas et remettre les formes finals
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvasShapes();

    if(selectedShape == "strokeRect")
    {
        // Propriétés du rectangle
        ctx.strokeStyle = selectedColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(startX, startY, squareWidth, squareHeight);
    }
    else if(selectedShape == "fillRect")
    {
         // Propriétés du rectangle
         ctx.fillStyle = selectedColor;
         ctx.lineWidth = 2;
         ctx.fillRect(startX, startY, squareWidth, squareHeight);
    }
    
}
