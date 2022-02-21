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
include_once '../objects/registration.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare registration object
$registration = new Registration($db);
 
// get id of registration to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of registration to be edited
$registration->ERROR_NOPRIMARYKEYFOUND = $data->ERROR_NOPRIMARYKEYFOUND;

if(
!empty($data->package_code)
&&!empty($data->amount_fee)
&&!empty($data->main_account_id)
&&!empty($data->date_registered)
&&!empty($data->date_expired)
){
// set registration property values

$registration->package_code = $data->package_code;
$registration->amount_fee = $data->amount_fee;
$registration->main_account_id = $data->main_account_id;
$registration->date_registered = $data->date_registered;
$registration->date_expired = $data->date_expired;
 
// update the registration
if($registration->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the registration, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update registration","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update registration. Data is incomplete.","document"=> ""));
}
?>
