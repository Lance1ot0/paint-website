<?php

$json_JSObject = $_POST["jsonFile"];

$jsonPHPObject = json_decode($json_JSObject, true);

$path = "../saves/".$jsonPHPObject["name"].".json";

echo $path;

file_put_contents($path, $json_JSObject);

// if($jsonPHPObject["status"] == "new"){
//     if (file_exists($path)) {
//         echo "(!) The file $path already exists";
//     } 
//     else {
//         echo "The file $path does not exist.\nIt will be created";
//         $jsonPHPObject["status"] = "mod";
//         $json_JSObject = json_encode($jsonPHPObject);
//         //generate json file or modify exesting one
//         file_put_contents($path, $json_JSObject);
//     }
// }
// else{
//     file_put_contents($path, $json_JSObject);
// }


// $dataJSON = file_get_contents("data.json");

// Converts to an array 
// $myarray = json_decode($Json, true);


// encode array to json
// $json = json_encode($myarray);

?>