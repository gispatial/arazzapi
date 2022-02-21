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

// get database connection
include_once '../config/database.php';
 
// instantiate message_inbox object
include_once '../objects/message_inbox.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$message_inbox = new Message_Inbox($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->message_inbox_code)
&&!empty($data->sender)
&&!empty($data->receiver)
&&!empty($data->subject)
&&!empty($data->message)
&&!empty($data->headers)
&&!empty($data->date_sent)
&&!empty($data->message_type_code)
&&!empty($data->ic_no)
&&!empty($data->status)
&&!empty($data->attachment)){
 
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
 	$lastInsertedId=$message_inbox->create();
    // create the message_inbox
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the message_inbox, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create message_inbox","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create message_inbox. Data is incomplete.","document"=> ""));
}
?>
