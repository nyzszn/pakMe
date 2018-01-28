<?php
require "./rb.php";
$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;


//setup the connection
R::setup(
	'mysql:host=localhost;dbname=pra_db',
	'root',
	'071'
); //for both mysql or mariaDB

//R::fancyDebug( TRUE );
?>