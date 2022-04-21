
let jsonDrawingConfig = null;

function getDrawingSave(){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        console.log(this);
        if(this.readyState == 4 && this.status == 200)
        {
            console.log(this.response);
            jsonDrawingConfig = this.response;
            loadDrawingSaveToDOM();
        }
    };

    xhr.open("GET", "get_json.php", true);
    xhr.responseType = "json";
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
            if(responseType == "text")
            {
                let fileResponse = this.response.split(' ')
                if(fileResponse[0] == "(!)")
                {
                    alert("The file already exist!")
                }
            }
            
        }
        else if(this.readyState == 4)
        {
            alert("Une erreur est survenue");
        }
    };

    xhr.open("POST", "php/post_json.php", true);
    xhr.responseType = responseType;
    xhr.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
    xhr.send("jsonFile=" + JSON.stringify(json_data));
    
}
