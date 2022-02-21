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
include_once '../objects/sms_notification.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare sms_notification object
$sms_notification = new Sms_Notification($db);
 
// set ID property of record to read
$sms_notification->code = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of sms_notification to be edited
$sms_notification->readOne();
 
if($sms_notification->code!=null){
    // create array
    $sms_notification_arr = array(
        
"code" => $sms_notification->code,
"message" => html_entity_decode($sms_notification->message),
"params" => $sms_notification->params,
"response_msg_success" => html_entity_decode($sms_notification->response_msg_success),
"response_msg_failed" => html_entity_decode($sms_notification->response_msg_failed)
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "sms_notification found","document"=> $sms_notification_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user sms_notification does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "sms_notification does not exist.","document"=> ""));
}
?>
