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
include_once '../objects/transaction_log.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare transaction_log object
$transaction_log = new Transaction_Log($db);
 
// get id of transaction_log to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of transaction_log to be edited
$transaction_log->id = $data->id;

if(
!empty($data->trans_date)
&&!empty($data->activity)
&&!empty($data->username)
&&!empty($data->status)
){
// set transaction_log property values

$transaction_log->trans_date = $data->trans_date;
$transaction_log->activity = $data->activity;
$transaction_log->username = $data->username;
$transaction_log->status = $data->status;
 
// update the transaction_log
if($transaction_log->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the transaction_log, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update transaction_log","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update transaction_log. Data is incomplete.","document"=> ""));
}
?>
