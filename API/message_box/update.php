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
include_once '../objects/message_box.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare message_box object
$message_box = new Message_Box($db);
 
// get id of message_box to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of message_box to be edited
$message_box->message_id = $data->message_id;

if(
!empty($data->sender)
&&!empty($data->sender_name)
&&!empty($data->receiver)
&&!empty($data->receiver_name)
&&!empty($data->subject)
&&!empty($data->content)
&&!empty($data->headers)
&&!empty($data->date_sent)
&&!empty($data->message_type_code)
&&!empty($data->status)
&&!empty($data->attachment)
&&!empty($data->message_root_id)
&&!empty($data->latest)
){
// set message_box property values

$message_box->sender = $data->sender;
$message_box->sender_name = $data->sender_name;
$message_box->receiver = $data->receiver;
$message_box->receiver_name = $data->receiver_name;
$message_box->subject = $data->subject;
$message_box->content = $data->content;
$message_box->headers = $data->headers;
$message_box->date_sent = $data->date_sent;
$message_box->message_type_code = $data->message_type_code;
$message_box->status = $data->status;
$message_box->attachment = $data->attachment;
$message_box->message_root_id = $data->message_root_id;
$message_box->latest = $data->latest;
 
// update the message_box
if($message_box->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the message_box, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update message_box","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update message_box. Data is incomplete.","document"=> ""));
}
?>
