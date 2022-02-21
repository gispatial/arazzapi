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
 
// instantiate registration object
include_once '../objects/registration.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$registration = new Registration($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->package_code)
&&!empty($data->amount_fee)
&&!empty($data->main_account_id)
&&!empty($data->date_registered)
&&!empty($data->date_expired)){
 
    // set registration property values
	 
$registration->package_code = $data->package_code;
$registration->amount_fee = $data->amount_fee;
$registration->main_account_id = $data->main_account_id;
$registration->date_registered = $data->date_registered;
$registration->date_expired = $data->date_expired;
 	$lastInsertedId=$registration->create();
    // create the registration
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the registration, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create registration","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create registration. Data is incomplete.","document"=> ""));
}
?>
