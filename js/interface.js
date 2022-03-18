// Sélection du menu file
let fileToggleMenu = document.querySelector('#file-btn, file-arrow');

// Sélection du menu formes
let shapeToggleMenu = document.querySelector('.shape')

// Sélection du menu export
let exportToggleMenu = document.querySelector('#export-as')

// Sélection du menu font
let fontToggleMenu = document.querySelector(".font-menu")

// Sélection du body
let body = document.querySelector('body');

let textBtn = document.querySelector('#textBtn');
let moveBtn = document.querySelector('#moveBtn');

// Attribue une classe spécifique au body lorsque l'on clique sur le menu file et ferme le menu shape s'il est ouvert
fileToggleMenu.onclick = () => {
    body.classList.toggle('open-file');
    body.classList.remove('open-shape');
    body.classList.remove('open-font')
};

// Attribue une classe spécifique au body lorsque l'on clique sur le menu shape et ferme le menu file s'il est ouvert
shapeToggleMenu.onclick = () => {
    body.classList.toggle('open-shape');
    body.classList.remove('open-file');
    body.classList.remove('open-font')
};

// Affiche le menu export au survol de la souris
exportToggleMenu.onmouseover = () =>{
    body.classList.toggle('open-export');
};

// Ferme le menu export au survol de la souris
exportToggleMenu.onmouseout = () => {
    body.classList.remove('open-export');
};

// Attribue une classe spécifique au body lorsque l'on clique sur le menu font et ferme le menu font s'il est ouvert
fontToggleMenu.onclick = () => {
    body.classList.toggle('open-font');
    body.classList.remove('open-file');
    body.classList.remove('open-shape');
};

moveBtn.onclick = () => {
    mouseSelectionState = true;
    body.classList.remove('open-file');
    body.classList.remove('open-shape');
    body.classList.remove('open-font')
}

textBtn.onclick = () => {
    selectedShape = "text";
    body.classList.remove('open-file');
    body.classList.remove('open-shape');
};

// Change la police globale quand on clique dessus
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
