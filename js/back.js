
let DrawingConfig;

let drawingsFilesNames;

function getLastDrawings(){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        console.log(this);
        if(this.readyState == 4 && this.status == 200)
        {
            console.log(this.response);
            drawingsFilesNames = this.response.split(';');
            drawingsFilesNames.pop();
            if(drawingsFilesNames !="")
            {
                openTab.removeChild(document.querySelector('#empty-drawing'));
                drawingsFilesNames.forEach(element => {
                    let drawingName = document.createElement('a');
                    drawingName.textContent = element;
                    openTab.append(drawingName);
                    drawingName.addEventListener("click", () => {
                        console.log(element);
                        sendWantedDrawingName(element);
                    })
                });
            }
            
        }
        else if(this.readyState == 4)
        {
            alert("Une erreur est survenue");
        }
    };

    xhr.open("GET", "php/get_drawings_files_names.php", true);
    xhr.responseType = "text";
    xhr.send();
}

function saveDrawing(json_data, responseType){

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        console.log(this);
        if(this.readyState == 4 && this.status == 200)
        {
            console.log(this.response);
            
        }
        else if(this.readyState == 4)
        {
            alert("Une erreur est survenue");
        }
    };

    xhr.open("POST", "php/save_json_drawings.php", true);
    xhr.responseType = responseType;
    xhr.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
    xhr.send("jsonFile=" + JSON.stringify(json_data));
    
}


function sendWantedDrawingName(element){

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        console.log(this);
        if(this.readyState == 4 && this.status == 200)
        {
            DrawingConfig = JSON.parse(this.response);
            shapes = DrawingConfig["drawingSettings"];
            console.log(shapes);
            drawCanvasShapes();
        }
        else if(this.readyState == 4)
        {
            alert("Une erreur est survenue");
        }
    };

    xhr.open("POST", "php/get_json_drawing_data.php", true);
    xhr.responseType = "text";
    xhr.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
    xhr.send("name=" + element);
    
}

getLastDrawings();