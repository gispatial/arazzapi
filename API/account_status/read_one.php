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
include_once '../objects/account_status.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare account_status object
$account_status = new Account_Status($db);
 
// set ID property of record to read
$account_status->acc_status_code = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of account_status to be edited
$account_status->readOne();
 
if($account_status->acc_status_code!=null){
    // create array
    $account_status_arr = array(
        
"acc_status_code" => $account_status->acc_status_code,
"description" => $account_status->description,
"login_status" => $account_status->login_status
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "account_status found","document"=> $account_status_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user account_status does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "account_status does not exist.","document"=> ""));
}
?>
