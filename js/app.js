// Initialisation du canvas
let canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Récupération des formes que l'on peut sélectionner
let rectangleBtn = document.querySelector('#rectangleBtn');
let ellipseBtn = document.querySelector('#ellipseBtn');
let triangleBtn = document.querySelector('#triangleBtn');

rectangleBtn.onclick = () => {selectedShape = "rectangle"; mouseSelectionState = false;};
ellipseBtn.onclick = () => {selectedShape = "ellipse"; mouseSelectionState = false;};
triangleBtn.onclick = () => {selectedShape = "triangle"; mouseSelectionState = false;};

// Forme selectioné par l'utilisateur (par défaut c'est un rectangle)
let selectedShape = "rectangle";
let mouseSelectionState = false;

let shapeGrabed = false

let whatShapeIsGrabed = null;

let grabX = 0;
let grabY = 0;

// Liste des propriétés des formes
let shapes = [];
let numberOfShapes = 0;

// Récupération du décalage du canvas en x et y par rapport aux margins de la page
let canvasPos = canvas.getBoundingClientRect();

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

let clickInterval = null;
let mouseMoved = false;


// Créer les eventlistener de la souris 
canvas.onmousedown = event => {

    // Récupère les boundings du canvas quand la souris bouge
    canvasPos = canvas.getBoundingClientRect();


    clickInterval = Date.now();

    // Lorsque l'on déssine ferme les onglets
    body.classList.remove('open-file');
    body.classList.remove('open-shape');

    mouseClickPosX = event.clientX - canvasPos.left;
    mouseClickPosY = event.clientY - canvasPos.top;

    if(!mouseSelectionState)
    {
        userDrawing = true;
    }
    else
    {
        if(!shapeGrabed)
        {
            for (let i = 0; i < shapes.length; i++) {

                if(shapes[i]["shape"] == "rectangle")
                {
                    dragDetectionRectangle(i);
                }
            }
            
        }
    }
    console.log("x", mouseClickPosX, "y", mouseClickPosY);
    console.log(shapes);

};

canvas.onmousemove = event => {

    // Récupère les boundings du canvas quand la souris bouge
    canvasPos = canvas.getBoundingClientRect();

    mouseMovingPosX = (event.clientX - canvasPos.left);
    mouseMovingPosY = (event.clientY - canvasPos.top);

    if(!mouseSelectionState)
    {
        if(Date.now() - clickInterval < 5)
        {
            console.log(Date.now() - clickInterval);
            console.log("trop rapide");
            userDrawing = false;
            mouseMoved = false
        }
        else
        {
            mouseMoved = true;
        }
    }
    else
    {
        console.log("Souris selector")

        if(shapeGrabed){

            if(shapes[whatShapeIsGrabed]["shape"] == "rectangle")
            {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for(let i = 0; i < shapes.length; i++)
                {
                    if(i != whatShapeIsGrabed)
                    {
                        if(shapes[i]["shape"] == "rectangle")
                        {
                            drawRectangle(shapes[i]["rect-posX"], shapes[i]["rect-posY"], shapes[i]["rect-width"], shapes[i]["rect-height"], shapes[i]["color"], "black");
                        }
                        else if(shapes[i]["shape"] == "ellipse")
                        {
                            if (shapes[i]["radiusX"] > shapes[i]["radiusY"]) {
                                drawEllipse(shapes[i]["centerPosX"], shapes[i]["centerPosY"], shapes[i]["radiusX"], startAngle, shapes[i]["endAngle"], shapes[i]["color"], "black");
                            } else if (shapes[i]["radiusY"] > shapes[i]["radiusX"]) {
                                drawEllipse(shapes[i]["centerPosX"], shapes[i]["centerPosY"], shapes[i]["radiusY"], startAngle, shapes[i]["endAngle"], shapes[i]["color"], "black");
                            }
                        }
                        else if(shapes[i]["shape"] == "triangle")
                        {
                            drawTriangle(shapes[i]["startPosX"], shapes[i]["endPosX"], shapes[i]["startPosY"], shapes[i]["endPosY"], shapes[i]["color"], "black");
                        }
                    }
                }
                shapes[whatShapeIsGrabed]["rect-posX"] = mouseMovingPosX - grabX;
                shapes[whatShapeIsGrabed]["rect-posY"] = mouseMovingPosY - grabY;

                drawRectangle(shapes[whatShapeIsGrabed]["rect-posX"], shapes[whatShapeIsGrabed]["rect-posY"], shapes[whatShapeIsGrabed]["rect-width"], shapes[whatShapeIsGrabed]["rect-height"], shapes[whatShapeIsGrabed]["color"], "black");
            }
        }
    }
   
    
    if (userDrawing == true) {

        // Effacer le canvas et remettre les formes finales
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCanvasShapes();
        
        // Si la forme sélectionnée est un rectangle
        if(selectedShape == "rectangle")
        {
            squareWidth = (event.clientX - canvasPos.left) - mouseClickPosX;
            squareHeight = (event.clientY - canvasPos.top) - mouseClickPosY;
            drawRectangle(mouseClickPosX, mouseClickPosY, squareWidth, squareHeight, mainChartColor, "black");
        }

        // Si la forme sélectionnée est une ellipse
        else if(selectedShape == "ellipse")
        {

            // Rayon final lorsque l'user a bougé sa souris
            radiusX = Math.abs(mouseMovingPosX - mouseClickPosX);
            radiusY = Math.abs(mouseMovingPosY - mouseClickPosY)

            // Si le rayonX et plus grand que le rayon Y, alors on dessine un cercle de rayonX et inversement
            if (radiusX > radiusY) {
                drawEllipse(mouseClickPosX, mouseClickPosY, radiusX, startAngle, endAngle, mainChartColor, "black");
            } else if (radiusY > radiusX) {
                drawEllipse(mouseClickPosX, mouseClickPosY, radiusY, startAngle, endAngle, mainChartColor, "black");
            }
        }

        // Si la forme sélectionnée est un triangle
        else if(selectedShape == "triangle")
        {
            drawTriangle(mouseClickPosX, mouseMovingPosX, mouseClickPosY, mouseMovingPosY, mainChartColor, "black");
        }


        // Si la forme est un texte
        // else if(selectedShape == "text")
        // {
        //     ctx.fillText('Hello world', 100, 259);
        // }
        
    }
};

canvas.onmouseout = () => {stopDrawing(event);};
canvas.onmouseup = () => {

    if(!mouseSelectionState)
    {
        // Vérfie si la souris a bougé depuis le dernier click pour le dessin
        if(!mouseMoved || (mouseClickPosX == mouseMovingPosX && mouseClickPosY == mouseMovingPosY))
        {
            console.log("tu as juste clicker");
            mouseMoved = false;
            userDrawing = false;

        }
        else
        {
            stopDrawing(event);
            // Incrémente le nombre de formes qui on été créer en tout
            numberOfShapes++;
        }
    }
    if(shapeGrabed)
    {
        let lastShapeGrabed = shapes.splice(whatShapeIsGrabed,1);
        shapes.push(lastShapeGrabed[0]);
        shapeGrabed = false;
    }
    

    
    
};

function stopDrawing(event){
    event.preventDefault();
    event.stopPropagation();

    if(userDrawing)
    {
        let pickedColor = mainChartColor;
    
        // Ajoute au tableau un object contenant les propriétés de chaque forme
        if(selectedShape == "rectangle")
        {
            // Si la width est négative
            if(squareWidth < 0 && squareHeight < 0)
            {
                mouseClickPosX += squareWidth;
                mouseClickPosY += squareHeight;
                squareWidth = Math.abs(squareWidth);
                squareHeight =  Math.abs(squareHeight);
            }
            else if (squareWidth < 0)
            {
                mouseClickPosX += squareWidth;
                squareWidth = Math.abs(squareWidth);
            }
            else if (squareHeight < 0)
            {
                mouseClickPosY += squareHeight;
                squareHeight =  Math.abs(squareHeight);
            }

            shapes.push(
                {"id":numberOfShapes,
                "shape":"rectangle",
                "color":pickedColor,
                "rect-posX":mouseClickPosX,
                "rect-posY":mouseClickPosY,
                "rect-width":squareWidth,
                "rect-height":squareHeight});
        }
        else if(selectedShape == "ellipse")
        {
            shapes.push(
                {"id":numberOfShapes,
                "shape":"ellipse",
                "color":pickedColor,
                "centerPosX":mouseClickPosX,
                "centerPosY":mouseClickPosY,
                "radiusX":radiusX,
                "radiusY":radiusY,
                "endAngle":endAngle});
        }
        else if(selectedShape == "triangle")
        {
            shapes.push(
                {"id":numberOfShapes,
                "shape":"triangle",
                "color":pickedColor,
                "startPosX":mouseClickPosX,
                "startPosY":mouseClickPosY,
                "endPosX":mouseMovingPosX,
                "endPosY":mouseMovingPosY});
        }
    }

    userDrawing = false;
}


// Redessine toutes les formes sauvegardées sur le canvas
function drawCanvasShapes(){
    // Parcours le tableau de forme pour les déssiner

    for(let i = 0; i < shapes.length; i++)
    {
        
        if(shapes[i]["shape"] == "rectangle")
        {
            drawRectangle(shapes[i]["rect-posX"], shapes[i]["rect-posY"], shapes[i]["rect-width"], shapes[i]["rect-height"], shapes[i]["color"], "black");
        }
        else if(shapes[i]["shape"] == "ellipse")
        {
            if (shapes[i]["radiusX"] > shapes[i]["radiusY"]) {
                drawEllipse(shapes[i]["centerPosX"], shapes[i]["centerPosY"], shapes[i]["radiusX"], startAngle, shapes[i]["endAngle"], shapes[i]["color"], "black");
            } else if (shapes[i]["radiusY"] > shapes[i]["radiusX"]) {
                drawEllipse(shapes[i]["centerPosX"], shapes[i]["centerPosY"], shapes[i]["radiusY"], startAngle, shapes[i]["endAngle"], shapes[i]["color"], "black");
            }
        }
        else if(shapes[i]["shape"] == "triangle")
        {
            drawTriangle(shapes[i]["startPosX"], shapes[i]["endPosX"], shapes[i]["startPosY"], shapes[i]["endPosY"], shapes[i]["color"], "black");
        }
    }

}

function undoLastDraw(){
    if(shapes.length > 0)
    {
        shapes.pop();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvasShapes();
}

// Dessiner le rectangle
function drawRectangle(x,y,width,height, bgColor, borderColor) {

    // Dessin du background du rectangle
    ctx.fillStyle = bgColor;
    ctx.fillRect(x, y, width, height);

    // Dessin du border du rectangle
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height)
}

// Dessiner ellipse
function drawEllipse(centerPosX, centerPosY, radius, startAngle, endAngle, bgColor, borderColor) {

    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(centerPosX, centerPosY, radius, startAngle, endAngle)
    ctx.closePath();
    ctx.stroke();

    // Propriétés du border du cercle
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerPosX, centerPosY, radius, startAngle, endAngle)
    ctx.closePath();
    ctx.fill();
}

// Dessiner triangle
function drawTriangle(startX, endX, startY, endY, bgColor, borderColor) {

    ctx.fillStyle = bgColor;
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

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    // Propriétés du triangle
    ctx.beginPath();
    // point de départ du tracé, donc startX, startY
    ctx.moveTo(startX, startY);
    // Point d'arrivé du tracé, ligne tracée de startX, startY vers endX, endY
    ctx.lineTo(endX, endY);
    ctx.lineTo(startX - (endX - startX), endY); // Trouver la première
    ctx.lineTo(startX, startY);
    ctx.stroke();
    ctx.closePath();
}


function dragDetectionRectangle(i){

    xwidth = shapes[i]["rect-posX"] +  shapes[i]["rect-width"];
    ywidth = shapes[i]["rect-posY"] +  shapes[i]["rect-height"];

    if (mouseClickPosX > shapes[i]["rect-posX"] && mouseClickPosX < xwidth && mouseClickPosY > shapes[i]["rect-posY"] && mouseClickPosY < ywidth) 
    {
        grabX = mouseClickPosX - shapes[i]["rect-posX"];
        grabY = mouseClickPosY - shapes[i]["rect-posY"];
        shapeGrabed = true;
        whatShapeIsGrabed = i;
    }
}

