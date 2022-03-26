<?php

$json_JS_object = $_POST["jsonFile"];

$json_PHP_object = json_decode($json_JS_object, true);

$path = "../saves/".$json_PHP_object["name"].".json";

echo $path;

file_put_contents($path, $json_JS_object);


?>