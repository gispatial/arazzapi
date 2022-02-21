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
include_once '../objects/notification_log.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare notification_log object
$notification_log = new Notification_Log($db);
 
// set ID property of record to read
$notification_log->ERROR_NOPRIMARYKEYFOUND = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of notification_log to be edited
$notification_log->readOne();
 
if($notification_log->ERROR_NOPRIMARYKEYFOUND!=null){
    // create array
    $notification_log_arr = array(
        
"notification_id" => $notification_log->notification_id,
"person_id" => $notification_log->person_id,
"date_send" => $notification_log->date_send
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "notification_log found","document"=> $notification_log_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user notification_log does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "notification_log does not exist.","document"=> ""));
}
?>
