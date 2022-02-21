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

// get database connection
include_once '../config/database.php';
 
// instantiate medication_prescription object
include_once '../objects/medication_prescription.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$medication_prescription = new Medication_Prescription($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->medication_id)
&&!empty($data->doctor_id)
&&!empty($data->patient_id)
&&!empty($data->no)
&&!empty($data->date)){
 
    // set medication_prescription property values
	 
$medication_prescription->medication_id = $data->medication_id;
$medication_prescription->doctor_id = $data->doctor_id;
$medication_prescription->patient_id = $data->patient_id;
$medication_prescription->no = $data->no;
$medication_prescription->date = $data->date;
 	$lastInsertedId=$medication_prescription->create();
    // create the medication_prescription
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the medication_prescription, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create medication_prescription","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create medication_prescription. Data is incomplete.","document"=> ""));
}
?>
