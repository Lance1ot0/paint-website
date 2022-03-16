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
fileToggleMenu.addEventListener('click', function(){
    body.classList.toggle('open-file');
    body.classList.remove('open-shape');
    body.classList.remove('open-font')
});

// Attribue une classe spécifique au body lorsque l'on clique sur le menu shape et ferme le menu file s'il est ouvert
shapeToggleMenu.addEventListener('click', function(){
    body.classList.toggle('open-shape');
    body.classList.remove('open-file');
    body.classList.remove('open-font')
});

// Affiche le menu export au survol de la souris
exportToggleMenu.addEventListener('mouseover', function(){
    body.classList.toggle('open-export');
});

// Ferme le menu export au survol de la souris
exportToggleMenu.addEventListener('mouseout', function(){
    body.classList.remove('open-export');
});

// Attribue une classe spécifique au body lorsque l'on clique sur le menu font et ferme le menu font s'il est ouvert
fontToggleMenu.addEventListener('click', function(){
    body.classList.toggle('open-font');
    body.classList.remove('open-file');
    body.classList.remove('open-shape');
});



// Initialisation du canvas
let canvas = document.querySelector('#whiteboard');

function drawCanvas() {
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // Trouver la position x, y du clique de l'user 
        let rectPosition =

            // Créer un rectangle
            canvas.addEventListener('click', function (event) {
                ctx.fillRect(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, 100, 100);
            })
    }
}


// function mousemove(event){
//     console.log("pageX: ",, 
//     "pageY: ", event.pageY, 
//     "clientX: ", event.clientX, 
//     "clientY:", event.clientY)
// }
// console.log(mousemove)

// On lance le canva quand la page se charge
window.onload = drawCanvas;







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


    // ------ Canva principal
    const colorChart = document.getElementById('color-chart');
    const ctxChart = colorChart.getContext('2d');
    
    // ------ Canva rainbow
    const colorRainbow = document.getElementById('color-rainbow');
    const ctxRainbow = colorRainbow.getContext('2d');
    
    const colorSelected = document.getElementById('first-color');
    
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
        mainChartColor = 'rgba(' + pixelColor[0] + ',' + pixelColor[1] + ',' + pixelColor[2] + ',1)';
        colorSelected.style.backgroundColor = mainChartColor;
      }
    
      function changeColorBlock(e) {
        x = e.offsetX;
        y = e.offsetY;
        var pixelColor = ctxRainbow.getImageData(x, y, 1, 1).data;
        mainChartColor = 'rgba(' + pixelColor[0] + ',' + pixelColor[1] + ',' + pixelColor[2] + ',1)';
        colorSelected.style.backgroundColor = mainChartColor;
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
        ctxChart.fillStyle = mainChartColor;
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
