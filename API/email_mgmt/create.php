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
 
// instantiate email_mgmt object
include_once '../objects/email_mgmt.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$email_mgmt = new Email_Mgmt($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->code)
&&!empty($data->title)
&&!empty($data->content)
&&!empty($data->sender)
&&!empty($data->active)){
 
    // set email_mgmt property values
	 
$email_mgmt->code = $data->code;
$email_mgmt->title = $data->title;
$email_mgmt->content = $data->content;
$email_mgmt->sender = $data->sender;
$email_mgmt->active = $data->active;
 	$lastInsertedId=$email_mgmt->create();
    // create the email_mgmt
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the email_mgmt, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create email_mgmt","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create email_mgmt. Data is incomplete.","document"=> ""));
}
?>
