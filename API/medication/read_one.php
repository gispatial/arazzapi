<?php
// required headers
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
header("HTTP/1.1 200 OK");
die();
}
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../objects/medication.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare medication object
$medication = new Medication($db);
 
// set ID property of record to read
$medication->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of medication to be edited
$medication->readOne();
 
if($medication->id!=null){
    // create array
    $medication_arr = array(
        
"id" => $medication->id,
"name" => $medication->name,
"details" => html_entity_decode($medication->details),
"dosage" => html_entity_decode($medication->dosage)
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "medication found","document"=> $medication_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user medication does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "medication does not exist.","document"=> ""));
}
?>
