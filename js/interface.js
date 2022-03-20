// Sélection du menu file
let fileToggleMenu = document.querySelector('#file-btn, file-arrow');

// Sélection du menu formes
let shapeToggleMenu = document.querySelector('.shape')

let saveMenu = document.querySelector('#save-menu');

// Sélection du menu export
let exportToggleMenu = document.querySelector('#export-as')

// Sélection du menu font
let fontToggleMenu = document.querySelector(".font-menu")

// Sélection du body
let body = document.querySelector('body');

let textBtn = document.querySelector('#textBtn');
let highlightCheckBox = document.querySelector('#highlight');
let highlightChecked = false;

let moveBtn = document.querySelector('#moveBtn');

// Attribue une classe spécifique au body lorsque l'on clique sur le menu file et ferme le menu shape s'il est ouvert
fileToggleMenu.onclick = () => {
    body.classList.toggle('open-file');
    body.classList.remove('open-shape');
    body.classList.remove('open-font');
    body.classList.remove('open-save');
    document.querySelector('#save-text-input').value = "";
};

// Attribue une classe spécifique au body lorsque l'on clique sur le menu shape et ferme le menu file s'il est ouvert
shapeToggleMenu.onclick = () => {
    body.classList.toggle('open-shape');
    body.classList.remove('open-file');
    body.classList.remove('open-font')
};

// Affiche le menu save au click de la souris
saveMenu.onmouseover = () => {
    body.classList.toggle('open-save');
    body.classList.remove('open-shape');
    body.classList.remove('open-export');
};


// Affiche le menu export au survol de la souris
exportToggleMenu.onmouseover = () =>{
    body.classList.toggle('open-export');
    body.classList.remove('open-save');
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
    input.classList.remove('input-active');
    input.disabled = true;
    highlightCheckBox.disabled = true;
    textSelectionState = false;
};

textBtn.onclick = () => {
    highlightCheckBox.disabled = false;
    textSelectionState = true;
    mouseSelectionState = false;
    selectedShape = "text";
    body.classList.remove('open-file');
    body.classList.remove('open-shape')
    // Active le input du texte quand on a choisi l'outil texte
    input.classList.add('input-active');
    input.disabled = false;
};

highlightCheckBox.onclick = () => {
    if(!highlightChecked)
    {
        highlightChecked = true;
        highlightChecked.checked = true;
    }
    else
    {
        highlightChecked = false;
        highlightChecked.checked = false;
    }
};


let ctrlKeyPressed = false;
let zkeyPressed = false;
let ctrlZpressed = false;

body.onkeydown = event => {

    if(event.key == "Enter")
    {
        let nameOfTheDrawingSave = document.querySelector('#save-text-input').value;
        if(nameOfTheDrawingSave != "")
        {
            let object = {"name":nameOfTheDrawingSave, "drawingSettings":shapes}
            console.log(object);
            saveDrawing(object, "text");
        }
        
    }

    if(event.key == "Control")
    {
       
        ctrlKeyPressed = true;
    }

    if(event.key == "z")
    {
        zkeyPressed = true;
    }

    if(zkeyPressed && ctrlKeyPressed && !ctrlZpressed)
    {
        console.log("Ctrl z");
        ctrlZpressed = true;
    }

    if(ctrlZpressed)
    {
        // Supprimer le dernier déssin
        undoLastDraw();
    }
};

body.onkeyup = event => {
    if(event.key == "Control")
    {
        ctrlKeyPressed = false;
        ctrlZpressed = false;
    }

    if(event.key == "z")
    {
        zkeyPressed = false;
        ctrlZpressed = false;
    }
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
    body.classList.toggle('encode-sans');
    body.classList.remove('nunito');
    body.classList.remove('smooch-sans');
});

smoochSans.addEventListener('click', function(){
    body.style.fontFamily = "Smooch Sans";
    defaultFont.innerHTML = "Smooch Sans";
    defaultFont.style.fontFamily = "Smooch Sans";
    body.classList.toggle('smooch-sans');
    body.classList.remove('nunito');
    body.classList.remove('encode-sans'); 
});

nunito.addEventListener('click', function(){
    body.style.fontFamily = "Nunito";
    defaultFont.innerHTML = "Nunito";
    defaultFont.style.fontFamily = "Nunito";
    body.classList.toggle('nunito');
    body.classList.remove('smooch-sans');
    body.classList.remove('encode-sans');
});


const jpegBtnDownload = document.getElementById('JPEG-Btn')

jpegBtnDownload.onclick = () =>{

    const link = document.createElement('a');
    document.body.appendChild(link)
    link.href = canvas.toDataURL();
    link.download = "draw-PNG" + ".jpeg";
    link.click();
    document.body.removeChild(link)
    const dataURI = canvas.toDataURL("image/jpeg");

}

const pdfBtnDownload = document.getElementById('PDF-Btn')


pdfBtnDownload.onclick = () =>{

    canvasPos = canvas.getBoundingClientRect();
    console.log(canvasPos);


    let imgData = canvas.toDataURL("image/jpeg", 1.0);
    let pdf = new jsPDF();
    pdf.addImage(imgData, 'JPEG', 0, 70, canvasPos.width/4.8, canvasPos.height/4.8);
    pdf.save("draw-PDF.pdf");
}

