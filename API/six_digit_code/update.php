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
include_once '../objects/six_digit_code.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare six_digit_code object
$six_digit_code = new Six_Digit_Code($db);
 
// get id of six_digit_code to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of six_digit_code to be edited
$six_digit_code->mobile = $data->mobile;

if(
!empty($data->code)
&&!empty($data->mobile)
&&!empty($data->expired)
&&!empty($data->date_sent)
){
// set six_digit_code property values

$six_digit_code->code = $data->code;
$six_digit_code->mobile = $data->mobile;
$six_digit_code->expired = $data->expired;
$six_digit_code->date_sent = $data->date_sent;
 
// update the six_digit_code
if($six_digit_code->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the six_digit_code, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update six_digit_code","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update six_digit_code. Data is incomplete.","document"=> ""));
}
?>
