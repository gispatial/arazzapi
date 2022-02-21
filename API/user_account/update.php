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
include_once '../objects/user_account.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare user_account object
$user_account = new User_Account($db);
 
// get id of user_account to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of user_account to be edited
$user_account->username = $data->username;

if(
!empty($data->reg_no)
&&!empty($data->username)
&&!empty($data->password)
&&!empty($data->name)
&&!empty($data->ic_no)
&&!empty($data->email)
&&!empty($data->acc_type_code)
&&!empty($data->menu_owner)
&&!empty($data->acc_status_code)
&&!empty($data->date_created)
&&!empty($data->date_updated)
&&!empty($data->last_login)
){
// set user_account property values

$user_account->reg_no = $data->reg_no;
$user_account->username = $data->username;
$user_account->password = $data->password;
$user_account->name = $data->name;
$user_account->ic_no = $data->ic_no;
$user_account->email = $data->email;
$user_account->acc_type_code = $data->acc_type_code;
$user_account->menu_owner = $data->menu_owner;
$user_account->acc_status_code = $data->acc_status_code;
$user_account->date_created = $data->date_created;
$user_account->date_updated = $data->date_updated;
$user_account->last_login = $data->last_login;
 
// update the user_account
if($user_account->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the user_account, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update user_account","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update user_account. Data is incomplete.","document"=> ""));
}
?>
