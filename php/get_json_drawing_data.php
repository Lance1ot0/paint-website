<?php

$file_name = $_POST["name"];

$dataJSON = file_get_contents('../saves/'.$file_name);

echo $dataJSON;

?>