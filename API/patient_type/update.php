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
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../config/database.php';
include_once '../objects/patient_type.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare patient_type object
$patient_type = new Patient_Type($db);
 
// get id of patient_type to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of patient_type to be edited
$patient_type->patient_type_code = $data->patient_type_code;

if(
!empty($data->patient_type_code)
&&!empty($data->name)
&&!empty($data->min_age)
&&!empty($data->max_age)
){
// set patient_type property values

$patient_type->patient_type_code = $data->patient_type_code;
$patient_type->name = $data->name;
$patient_type->min_age = $data->min_age;
$patient_type->max_age = $data->max_age;
 
// update the patient_type
if($patient_type->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the patient_type, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update patient_type","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update patient_type. Data is incomplete.","document"=> ""));
}
?>
