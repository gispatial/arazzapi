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
include_once '../objects/message_inbox.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare message_inbox object
$message_inbox = new Message_Inbox($db);
 
// set ID property of record to read
$message_inbox->message_inbox_code = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of message_inbox to be edited
$message_inbox->readOne();
 
if($message_inbox->message_inbox_code!=null){
    // create array
    $message_inbox_arr = array(
        
"message_inbox_code" => $message_inbox->message_inbox_code,
"sender" => $message_inbox->sender,
"receiver" => $message_inbox->receiver,
"subject" => html_entity_decode($message_inbox->subject),
"message" => $message_inbox->message,
"headers" => html_entity_decode($message_inbox->headers),
"date_sent" => $message_inbox->date_sent,
"message_type_code" => $message_inbox->message_type_code,
"ic_no" => $message_inbox->ic_no,
"status" => $message_inbox->status,
"attachment" => $message_inbox->attachment
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "message_inbox found","document"=> $message_inbox_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user message_inbox does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "message_inbox does not exist.","document"=> ""));
}
?>
