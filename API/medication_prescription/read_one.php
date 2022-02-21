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
include_once '../objects/medication_prescription.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare medication_prescription object
$medication_prescription = new Medication_Prescription($db);
 
// set ID property of record to read
$medication_prescription->ERROR_NOPRIMARYKEYFOUND = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of medication_prescription to be edited
$medication_prescription->readOne();
 
if($medication_prescription->ERROR_NOPRIMARYKEYFOUND!=null){
    // create array
    $medication_prescription_arr = array(
        
"medication_id" => $medication_prescription->medication_id,
"doctor_id" => $medication_prescription->doctor_id,
"patient_id" => $medication_prescription->patient_id,
"no" => $medication_prescription->no,
"date" => $medication_prescription->date
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "medication_prescription found","document"=> $medication_prescription_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user medication_prescription does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "medication_prescription does not exist.","document"=> ""));
}
?>
