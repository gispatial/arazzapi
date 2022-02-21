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
include_once '../objects/registration_person.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare registration_person object
$registration_person = new Registration_Person($db);
 
// get id of registration_person to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of registration_person to be edited
$registration_person->reg_no = $data->reg_no;

if(
!empty($data->reg_no)
&&!empty($data->ic_no)
&&!empty($data->username)
&&!empty($data->person_type_code)
&&!empty($data->admin_type)
&&!empty($data->patient_type_code)
){
// set registration_person property values

$registration_person->reg_no = $data->reg_no;
$registration_person->ic_no = $data->ic_no;
$registration_person->username = $data->username;
$registration_person->person_type_code = $data->person_type_code;
$registration_person->admin_type = $data->admin_type;
$registration_person->patient_type_code = $data->patient_type_code;
 
// update the registration_person
if($registration_person->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the registration_person, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update registration_person","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update registration_person. Data is incomplete.","document"=> ""));
}
?>
