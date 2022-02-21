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
include_once '../objects/account_type_2.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare account_type_2 object
$account_type_2 = new Account_Type_2($db);
 
// set ID property of record to read
$account_type_2->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of account_type_2 to be edited
$account_type_2->readOne();
 
if($account_type_2->id!=null){
    // create array
    $account_type_2_arr = array(
        
"id" => $account_type_2->id,
"name" => $account_type_2->name,
"status" => $account_type_2->status,
"type_group" => $account_type_2->type_group
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "account_type_2 found","document"=> $account_type_2_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user account_type_2 does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "account_type_2 does not exist.","document"=> ""));
}
?>
