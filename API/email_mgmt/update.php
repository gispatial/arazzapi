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
include_once '../objects/email_mgmt.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare email_mgmt object
$email_mgmt = new Email_Mgmt($db);
 
// get id of email_mgmt to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of email_mgmt to be edited
$email_mgmt->code = $data->code;

if(
!empty($data->code)
&&!empty($data->title)
&&!empty($data->content)
&&!empty($data->sender)
&&!empty($data->active)
){
// set email_mgmt property values

$email_mgmt->code = $data->code;
$email_mgmt->title = $data->title;
$email_mgmt->content = $data->content;
$email_mgmt->sender = $data->sender;
$email_mgmt->active = $data->active;
 
// update the email_mgmt
if($email_mgmt->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the email_mgmt, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update email_mgmt","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update email_mgmt. Data is incomplete.","document"=> ""));
}
?>
