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
include_once '../objects/person_type.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare person_type object
$person_type = new Person_Type($db);
 
// set ID property of record to read
$person_type->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of person_type to be edited
$person_type->readOne();
 
if($person_type->id!=null){
    // create array
    $person_type_arr = array(
        
"id" => $person_type->id,
"name" => $person_type->name,
"status" => $person_type->status,
"type_group" => $person_type->type_group
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "person_type found","document"=> $person_type_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user person_type does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "person_type does not exist.","document"=> ""));
}
?>
