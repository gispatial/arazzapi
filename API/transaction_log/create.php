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

// get database connection
include_once '../config/database.php';
 
// instantiate transaction_log object
include_once '../objects/transaction_log.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$transaction_log = new Transaction_Log($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->trans_date)
&&!empty($data->activity)
&&!empty($data->username)
&&!empty($data->status)){
 
    // set transaction_log property values
	 
$transaction_log->trans_date = $data->trans_date;
$transaction_log->activity = $data->activity;
$transaction_log->username = $data->username;
$transaction_log->status = $data->status;
 	$lastInsertedId=$transaction_log->create();
    // create the transaction_log
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the transaction_log, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create transaction_log","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create transaction_log. Data is incomplete.","document"=> ""));
}
?>
