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
include_once '../objects/patient_type.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare patient_type object
$patient_type = new Patient_Type($db);
 
// set ID property of record to read
$patient_type->patient_type_code = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of patient_type to be edited
$patient_type->readOne();
 
if($patient_type->patient_type_code!=null){
    // create array
    $patient_type_arr = array(
        
"patient_type_code" => $patient_type->patient_type_code,
"name" => $patient_type->name,
"min_age" => $patient_type->min_age,
"max_age" => $patient_type->max_age
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "patient_type found","document"=> $patient_type_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user patient_type does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "patient_type does not exist.","document"=> ""));
}
?>
