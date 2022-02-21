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
include_once '../objects/message_document.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare message_document object
$message_document = new Message_Document($db);
 
// get id of message_document to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of message_document to be edited
$message_document->message_id = $data->message_id;

if(
!empty($data->message_id)
&&!empty($data->filename)
&&!empty($data->file_path)
&&!empty($data->date_updated)
){
// set message_document property values

$message_document->message_id = $data->message_id;
$message_document->filename = $data->filename;
$message_document->file_path = $data->file_path;
$message_document->date_updated = $data->date_updated;
 
// update the message_document
if($message_document->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the message_document, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update message_document","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update message_document. Data is incomplete.","document"=> ""));
}
?>
