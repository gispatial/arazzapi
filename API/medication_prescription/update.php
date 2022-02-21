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
include_once '../objects/medication_prescription.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare medication_prescription object
$medication_prescription = new Medication_Prescription($db);
 
// get id of medication_prescription to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of medication_prescription to be edited
$medication_prescription->ERROR_NOPRIMARYKEYFOUND = $data->ERROR_NOPRIMARYKEYFOUND;

if(
!empty($data->medication_id)
&&!empty($data->doctor_id)
&&!empty($data->patient_id)
&&!empty($data->no)
&&!empty($data->date)
){
// set medication_prescription property values

$medication_prescription->medication_id = $data->medication_id;
$medication_prescription->doctor_id = $data->doctor_id;
$medication_prescription->patient_id = $data->patient_id;
$medication_prescription->no = $data->no;
$medication_prescription->date = $data->date;
 
// update the medication_prescription
if($medication_prescription->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the medication_prescription, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update medication_prescription","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update medication_prescription. Data is incomplete.","document"=> ""));
}
?>
