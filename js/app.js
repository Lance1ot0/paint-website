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
