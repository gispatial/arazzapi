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
include_once '../objects/account_id.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare account_id object
$account_id = new Account_Id($db);
 
// set ID property of record to read
$account_id->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of account_id to be edited
$account_id->readOne();
 
if($account_id->id!=null){
    // create array
    $account_id_arr = array(
        
"id" => $account_id->id
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "account_id found","document"=> $account_id_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user account_id does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "account_id does not exist.","document"=> ""));
}
?>
