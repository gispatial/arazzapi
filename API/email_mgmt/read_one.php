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
include_once '../objects/email_mgmt.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare email_mgmt object
$email_mgmt = new Email_Mgmt($db);
 
// set ID property of record to read
$email_mgmt->code = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of email_mgmt to be edited
$email_mgmt->readOne();
 
if($email_mgmt->code!=null){
    // create array
    $email_mgmt_arr = array(
        
"code" => $email_mgmt->code,
"title" => html_entity_decode($email_mgmt->title),
"content" => html_entity_decode($email_mgmt->content),
"sender" => html_entity_decode($email_mgmt->sender),
"active" => $email_mgmt->active
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "email_mgmt found","document"=> $email_mgmt_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user email_mgmt does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "email_mgmt does not exist.","document"=> ""));
}
?>
