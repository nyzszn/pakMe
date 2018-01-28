<?php
require 'vendor/autoload.php';
require 'config.php';

    //custom libraries
require 'lib/main.php';
require 'lib/parking.php';


use \Slim\App;

$app = new App(["settings" => $config]);


    
        
    //default root url
$app->get('/', 'test');


//create a parking
$app->post('/parking/create', function ($request, $response, $args) {
        return createParking();
});

//Get the list of parkings
$app->get('/parkings', function ($request, $response, $args) {
    return listParkings();
});
//Get the list of parkings available
$app->get('/parkings/available', function ($request, $response, $args) {
    return listParkingsA();
});

//Get parking details by Id
$app->get('/parking/{id}', function ($request, $response, $args) {
    $id = (int)$args['id'];
    return getParkingDetails($id);
});

//parking login
$app->post('/parking/login', function ($request, $response, $args) {
    //$id = (int)$args['id'];
    return login();
});

//logout
$app->get('/logout', 'logout');

//update parking details available
$app->get('/parking/yes/{id}', function ($request, $response, $args) {
    $id = (int)$args['id'];
    return updateParkingAvailability($id);
});

//update parking details not available
$app->get('/parking/not/{id}', function ($request, $response, $args) {
    $id = (int)$args['id'];
    return updateParkingAvailabilityno($id);
});
    
  
$app->run();
