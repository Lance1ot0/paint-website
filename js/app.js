let fileToggleMenu = document.querySelector('.file-menu-scroll');
let shapeToggleMenu = document.querySelector('.shape')
let body = document.querySelector('body');

fileToggleMenu.addEventListener('click', function(){
    body.classList.toggle('open-file');
})
shapeToggleMenu.addEventListener('click', function(){
    body.classList.toggle('open-shape');
})