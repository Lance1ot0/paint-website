// ------ Canva principal
const colorChart = document.getElementById('color-chart');
const ctxChart = colorChart.getContext('2d');

// ------ Canva rainbow
const colorRainbow = document.getElementById('color-rainbow');
const ctxRainbow = colorRainbow.getContext('2d');

const bgColorBtn = document.getElementById('first-color');
const borderColorBtn = document.getElementById('second-color');

let selectedColor = "Back-ground";

bgColorBtn.onclick = () => {
    selectedColor = "Back-ground";; 
    bgColorBtn.style.zIndex = 1;
    borderColorBtn.style.zIndex = 0;};
borderColorBtn.onclick = () => {
    selectedColor = "Border";;
    borderColorBtn.style.zIndex = 1;
    bgColorBtn.style.zIndex = 0;
};

// ------ Injecte la taille des canvas dans les variables
let widthChart = colorChart.width;
let heightChart = colorChart.height;

let widthRainbow = colorRainbow.width;
let heightRainbow = colorRainbow.height;

let x = 0;
let y = 0;

let drag = false;

// ------ Par défaut la couleur est rouge, déclarée en RGBA
let mainChartColor = 'rgba(255,0,0,1)';
bgColorBtn.style.backgroundColor = mainChartColor;

let secondChartColor = 'rgba(0,0,0,1)';
borderColorBtn.style.backgroundColor = secondChartColor;



ctxChart.rect(0,0,widthChart, heightChart);

// fillGradient();

// ------ Injecte au canva principal la couleur, mainChartColor est la couleur cliqué sur le canva rainbow
ctxChart.fillStyle = fillGradient();
// ctxChart.fill()



// ------ Création du canva rainbow
ctxRainbow.rect(0,0,widthRainbow, heightRainbow)

// ------ Création du gradient, puis injection des différentes couche du dégradé

let gradient1 = ctxRainbow.createLinearGradient(0, 0, 0, heightRainbow)

gradient1.addColorStop(0, 'rgba(255, 0, 0, 1)');
gradient1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
gradient1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
gradient1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
gradient1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
gradient1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
gradient1.addColorStop(1, 'rgba(255, 0, 0, 1)');



ctxRainbow.fillStyle = gradient1;
ctxRainbow.fill()

function changeColor(e) {
    x = e.offsetX;
    y = e.offsetY;
    let pixelColor = ctxChart.getImageData(x, y, 1, 1).data;
    if(selectedColor == "Back-ground")
    {
        mainChartColor = 'rgba(' + pixelColor[0] + ',' + pixelColor[1] + ',' + pixelColor[2] + ',1)';
        bgColorBtn.style.backgroundColor = mainChartColor;
    }
    else if(selectedColor == "Border")
    {
        secondChartColor = 'rgba(' + pixelColor[0] + ',' + pixelColor[1] + ',' + pixelColor[2] + ',1)';
        borderColorBtn.style.backgroundColor = secondChartColor;
    }
    
    }

    function changeColorBlock(e) {
    x = e.offsetX;
    y = e.offsetY;
    var pixelColor = ctxRainbow.getImageData(x, y, 1, 1).data;
    if(selectedColor == "Back-ground")
    {
        mainChartColor = 'rgba(' + pixelColor[0] + ',' + pixelColor[1] + ',' + pixelColor[2] + ',1)';
        bgColorBtn.style.backgroundColor = mainChartColor;
    }
    else if(selectedColor == "Border")
    {
        secondChartColor = 'rgba(' + pixelColor[0] + ',' + pixelColor[1] + ',' + pixelColor[2] + ',1)';
        borderColorBtn.style.backgroundColor = secondChartColor;
    }

    fillGradient();
    }

function mousedown(e) {

    drag = true;

    if (e.target == colorRainbow) {
        changeColorBlock(e)
    } else if (e.target == colorChart){
        changeColor(e);
    }

}
    
    function mousemove(e) {

    if (drag) {
        if (e.target == colorRainbow) {
            changeColorBlock(e)
        } else if (e.target == colorChart){
            changeColor(e);
        }
    }
    }
    
    function mouseup(e) {
    drag = false;
    }


function fillGradient() {

    if(selectedColor == "Back-ground")
    {
        ctxChart.fillStyle = mainChartColor;
    }
    else if(selectedColor == "Border")
    {
        ctxChart.fillStyle = secondChartColor; 
    }
    ctxChart.fillRect(0, 0, widthChart, heightChart);
    let gradientWhite = ctxRainbow.createLinearGradient(0, 0, widthChart, 0);
    gradientWhite.addColorStop(.1, 'rgba(255,255,255,1)');
    gradientWhite.addColorStop(1, 'rgba(255,255,255,0)');
    ctxChart.fillStyle = gradientWhite;
    ctxChart.fillRect(0, 0, widthChart, heightChart);
    
    let gradientBlack = ctxRainbow.createLinearGradient(0, 0, 0, heightChart);
    gradientBlack.addColorStop(0, 'rgba(0,0,0,0)');
    gradientBlack.addColorStop(1, 'rgba(0,0,0,1)');
    ctxChart.fillStyle = gradientBlack;
    ctxChart.fillRect(0, 0, widthChart, heightChart);


}



colorRainbow.addEventListener("mousedown", mousedown, false);
colorRainbow.addEventListener("mouseup", mouseup, false);
colorRainbow.addEventListener("mousemove", mousemove, false);

colorChart.addEventListener("mousedown", mousedown, false);
colorChart.addEventListener("mouseup", mouseup, false);
colorChart.addEventListener("mousemove", mousemove, false);
