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
include_once '../objects/add_on_services.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare add_on_services object
$add_on_services = new Add_On_Services($db);
 
// set ID property of record to read
$add_on_services->add_on_code = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of add_on_services to be edited
$add_on_services->readOne();
 
if($add_on_services->add_on_code!=null){
    // create array
    $add_on_services_arr = array(
        
"add_on_code" => $add_on_services->add_on_code,
"name" => $add_on_services->name,
"price" => $add_on_services->price,
"unit" => $add_on_services->unit,
"unit_decimal" => $add_on_services->unit_decimal,
"remark" => html_entity_decode($add_on_services->remark),
"status" => $add_on_services->status,
"patient_type_code" => $add_on_services->patient_type_code,
"no_of_patient" => $add_on_services->no_of_patient
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "add_on_services found","document"=> $add_on_services_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user add_on_services does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "add_on_services does not exist.","document"=> ""));
}
?>
