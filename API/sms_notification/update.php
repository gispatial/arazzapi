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
include_once '../objects/sms_notification.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare sms_notification object
$sms_notification = new Sms_Notification($db);
 
// get id of sms_notification to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of sms_notification to be edited
$sms_notification->code = $data->code;

if(
!empty($data->code)
&&!empty($data->message)
&&!empty($data->params)
&&!empty($data->response_msg_success)
&&!empty($data->response_msg_failed)
){
// set sms_notification property values

$sms_notification->code = $data->code;
$sms_notification->message = $data->message;
$sms_notification->params = $data->params;
$sms_notification->response_msg_success = $data->response_msg_success;
$sms_notification->response_msg_failed = $data->response_msg_failed;
 
// update the sms_notification
if($sms_notification->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the sms_notification, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update sms_notification","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update sms_notification. Data is incomplete.","document"=> ""));
}
?>
