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
include_once '../objects/user_account.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare user_account object
$user_account = new User_Account($db);
 
// set ID property of record to read
$user_account->username = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of user_account to be edited
$user_account->readOne();
 
if($user_account->username!=null){
    // create array
    $user_account_arr = array(
        
"reg_no" => $user_account->reg_no,
"username" => $user_account->username,
"password" => $user_account->password,
"name" => html_entity_decode($user_account->name),
"ic_no" => $user_account->ic_no,
"email" => html_entity_decode($user_account->email),
"acc_type_code" => $user_account->acc_type_code,
"menu_owner" => $user_account->menu_owner,
"acc_status_code" => $user_account->acc_status_code,
"date_created" => $user_account->date_created,
"date_updated" => $user_account->date_updated,
"last_login" => $user_account->last_login
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "user_account found","document"=> $user_account_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user user_account does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "user_account does not exist.","document"=> ""));
}
?>
