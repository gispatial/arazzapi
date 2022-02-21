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
include_once '../objects/message_inbox.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare message_inbox object
$message_inbox = new Message_Inbox($db);
 
// get id of message_inbox to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of message_inbox to be edited
$message_inbox->message_inbox_code = $data->message_inbox_code;

if(
!empty($data->message_inbox_code)
&&!empty($data->sender)
&&!empty($data->receiver)
&&!empty($data->subject)
&&!empty($data->message)
&&!empty($data->headers)
&&!empty($data->date_sent)
&&!empty($data->message_type_code)
&&!empty($data->ic_no)
&&!empty($data->status)
&&!empty($data->attachment)
){
// set message_inbox property values

$message_inbox->message_inbox_code = $data->message_inbox_code;
$message_inbox->sender = $data->sender;
$message_inbox->receiver = $data->receiver;
$message_inbox->subject = $data->subject;
$message_inbox->message = $data->message;
$message_inbox->headers = $data->headers;
$message_inbox->date_sent = $data->date_sent;
$message_inbox->message_type_code = $data->message_type_code;
$message_inbox->ic_no = $data->ic_no;
$message_inbox->status = $data->status;
$message_inbox->attachment = $data->attachment;
 
// update the message_inbox
if($message_inbox->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the message_inbox, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update message_inbox","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update message_inbox. Data is incomplete.","document"=> ""));
}
?>
