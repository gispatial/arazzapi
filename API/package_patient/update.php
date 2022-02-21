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
include_once '../objects/package_patient.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare package_patient object
$package_patient = new Package_Patient($db);
 
// get id of package_patient to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of package_patient to be edited
$package_patient->package_code = $data->package_code;

if(
!empty($data->package_code)
&&!empty($data->patient_type_code)
&&!empty($data->total_patient)
&&!empty($data->doc_required)
){
// set package_patient property values

$package_patient->package_code = $data->package_code;
$package_patient->patient_type_code = $data->patient_type_code;
$package_patient->total_patient = $data->total_patient;
$package_patient->doc_required = $data->doc_required;
 
// update the package_patient
if($package_patient->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the package_patient, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update package_patient","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update package_patient. Data is incomplete.","document"=> ""));
}
?>
