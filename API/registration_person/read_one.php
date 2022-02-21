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
include_once '../objects/registration_person.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare registration_person object
$registration_person = new Registration_Person($db);
 
// set ID property of record to read
$registration_person->reg_no = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of registration_person to be edited
$registration_person->readOne();
 
if($registration_person->reg_no!=null){
    // create array
    $registration_person_arr = array(
        
"reg_no" => $registration_person->reg_no,
"ic_no" => $registration_person->ic_no,
"username" => $registration_person->username,
"person_type_code" => $registration_person->person_type_code,
"admin_type" => $registration_person->admin_type,
"patient_type_code" => $registration_person->patient_type_code
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "registration_person found","document"=> $registration_person_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user registration_person does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "registration_person does not exist.","document"=> ""));
}
?>
