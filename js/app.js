let fileToggleMenu = document.querySelector('.file-menu-scroll');
let body = document.querySelector('body');

fileToggleMenu.addEventListener('click', function(){
    body.classList.toggle('open');
})