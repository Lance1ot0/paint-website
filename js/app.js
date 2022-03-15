// Sélection du menu file
let fileToggleMenu = document.querySelector('.file-menu-scroll');

// Sélection du menu formes
let shapeToggleMenu = document.querySelector('.shape')

// Sélection du menu export
let exportToggleMenu = document.querySelector('#export-as')

// Sélection du body
let body = document.querySelector('body');

// Attribue une classe spécifique au body lorsque l'on clique sur le menu file et ferme le menu shape s'il est ouvert
fileToggleMenu.addEventListener('click', function(){
    body.classList.toggle('open-file');
    body.classList.remove('open-shape');
});

// Attribue une classe spécifique au body lorsque l'on clique sur le menu shape et ferme le menu file s'il est ouvert
shapeToggleMenu.addEventListener('click', function(){
    body.classList.toggle('open-shape');
    body.classList.remove('open-file');
});

// Affiche le menu export au survol de la souris
exportToggleMenu.addEventListener('mouseover', function(){
    body.classList.toggle('open-export');
});

// Ferme le menu export au survol de la souris
exportToggleMenu.addEventListener('mouseout', function(){
    body.classList.remove('open-export');
});