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
include_once '../objects/package_patient.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare package_patient object
$package_patient = new Package_Patient($db);
 
// set ID property of record to read
$package_patient->package_code = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of package_patient to be edited
$package_patient->readOne();
 
if($package_patient->package_code!=null){
    // create array
    $package_patient_arr = array(
        
"package_code" => $package_patient->package_code,
"patient_type_code" => $package_patient->patient_type_code,
"total_patient" => $package_patient->total_patient,
"doc_required" => html_entity_decode($package_patient->doc_required)
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "package_patient found","document"=> $package_patient_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user package_patient does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "package_patient does not exist.","document"=> ""));
}
?>
