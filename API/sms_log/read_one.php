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
include_once '../objects/sms_log.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare sms_log object
$sms_log = new Sms_Log($db);
 
// set ID property of record to read
$sms_log->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of sms_log to be edited
$sms_log->readOne();
 
if($sms_log->id!=null){
    // create array
    $sms_log_arr = array(
        
"id" => $sms_log->id,
"date_sent" => $sms_log->date_sent,
"mobile_no" => $sms_log->mobile_no,
"message" => html_entity_decode($sms_log->message),
"status" => $sms_log->status
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "sms_log found","document"=> $sms_log_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user sms_log does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "sms_log does not exist.","document"=> ""));
}
?>
