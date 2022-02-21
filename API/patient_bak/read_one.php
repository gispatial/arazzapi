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
include_once '../objects/patient_bak.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare patient_bak object
$patient_bak = new Patient_Bak($db);
 
// set ID property of record to read
$patient_bak->refno = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of patient_bak to be edited
$patient_bak->readOne();
 
if($patient_bak->refno!=null){
    // create array
    $patient_bak_arr = array(
        
"refno" => $patient_bak->refno,
"name" => html_entity_decode($patient_bak->name),
"age" => $patient_bak->age,
"ic_no" => $patient_bak->ic_no,
"email" => $patient_bak->email,
"mobile_no" => $patient_bak->mobile_no,
"gender" => $patient_bak->gender,
"type" => $patient_bak->type,
"address" => html_entity_decode($patient_bak->address),
"town" => $patient_bak->town,
"district" => html_entity_decode($patient_bak->district),
"postcode" => $patient_bak->postcode,
"state" => $patient_bak->state
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "patient_bak found","document"=> $patient_bak_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user patient_bak does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "patient_bak does not exist.","document"=> ""));
}
?>
