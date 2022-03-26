<?php

$saves_directory = '../saves/';
$directory = opendir($saves_directory);

while($file = readdir($directory))
{
    if($file != '.' && $file != '..')
    {
        echo $file.";";
    }
}
closedir($directory);

?>
