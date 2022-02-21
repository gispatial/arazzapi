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
include_once '../objects/notification.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare notification object
$notification = new Notification($db);
 
// set ID property of record to read
$notification->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of notification to be edited
$notification->readOne();
 
if($notification->id!=null){
    // create array
    $notification_arr = array(
        
"id" => $notification->id,
"email_title" => html_entity_decode($notification->email_title),
"email_content" => html_entity_decode($notification->email_content),
"sms_content" => html_entity_decode($notification->sms_content)
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "notification found","document"=> $notification_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user notification does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "notification does not exist.","document"=> ""));
}
?>
