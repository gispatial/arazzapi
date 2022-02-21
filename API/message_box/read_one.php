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
include_once '../objects/message_box.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare message_box object
$message_box = new Message_Box($db);
 
// set ID property of record to read
$message_box->message_id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of message_box to be edited
$message_box->readOne();
 
if($message_box->message_id!=null){
    // create array
    $message_box_arr = array(
        
"message_id" => $message_box->message_id,
"sender" => $message_box->sender,
"sender_name" => html_entity_decode($message_box->sender_name),
"receiver" => $message_box->receiver,
"receiver_name" => html_entity_decode($message_box->receiver_name),
"subject" => html_entity_decode($message_box->subject),
"content" => $message_box->content,
"headers" => html_entity_decode($message_box->headers),
"date_sent" => $message_box->date_sent,
"message_type_code" => $message_box->message_type_code,
"status" => $message_box->status,
"attachment" => $message_box->attachment,
"message_root_id" => $message_box->message_root_id,
"latest" => $message_box->latest
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "message_box found","document"=> $message_box_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user message_box does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "message_box does not exist.","document"=> ""));
}
?>
