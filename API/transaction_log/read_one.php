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
include_once '../objects/transaction_log.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare transaction_log object
$transaction_log = new Transaction_Log($db);
 
// set ID property of record to read
$transaction_log->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of transaction_log to be edited
$transaction_log->readOne();
 
if($transaction_log->id!=null){
    // create array
    $transaction_log_arr = array(
        
"id" => $transaction_log->id,
"trans_date" => $transaction_log->trans_date,
"activity" => html_entity_decode($transaction_log->activity),
"username" => $transaction_log->username,
"status" => $transaction_log->status
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "transaction_log found","document"=> $transaction_log_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user transaction_log does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "transaction_log does not exist.","document"=> ""));
}
?>
