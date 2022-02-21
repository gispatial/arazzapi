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
 
// instantiate six_digit_code object
include_once '../objects/six_digit_code.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$six_digit_code = new Six_Digit_Code($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->code)
&&!empty($data->mobile)
&&!empty($data->expired)
&&!empty($data->date_sent)){
 
    // set six_digit_code property values
	 
$six_digit_code->code = $data->code;
$six_digit_code->mobile = $data->mobile;
$six_digit_code->expired = $data->expired;
$six_digit_code->date_sent = $data->date_sent;
 	$lastInsertedId=$six_digit_code->create();
    // create the six_digit_code
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the six_digit_code, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create six_digit_code","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create six_digit_code. Data is incomplete.","document"=> ""));
}
?>
