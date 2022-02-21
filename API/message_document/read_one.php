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
include_once '../objects/message_document.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare message_document object
$message_document = new Message_Document($db);
 
// set ID property of record to read
$message_document->message_id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of message_document to be edited
$message_document->readOne();
 
if($message_document->message_id!=null){
    // create array
    $message_document_arr = array(
        
"message_id" => $message_document->message_id,
"filename" => html_entity_decode($message_document->filename),
"file_path" => html_entity_decode($message_document->file_path),
"date_updated" => $message_document->date_updated
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "message_document found","document"=> $message_document_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user message_document does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "message_document does not exist.","document"=> ""));
}
?>
