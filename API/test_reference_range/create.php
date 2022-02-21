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
 
// instantiate test_reference_range object
include_once '../objects/test_reference_range.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$test_reference_range = new Test_Reference_Range($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->test_marker_code)
&&!empty($data->code)
&&!empty($data->min)
&&!empty($data->max)
&&!empty($data->summary)){
 
    // set test_reference_range property values
	 
$test_reference_range->test_marker_code = $data->test_marker_code;
$test_reference_range->code = $data->code;
$test_reference_range->min = $data->min;
$test_reference_range->max = $data->max;
$test_reference_range->summary = $data->summary;
 	$lastInsertedId=$test_reference_range->create();
    // create the test_reference_range
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the test_reference_range, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create test_reference_range","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create test_reference_range. Data is incomplete.","document"=> ""));
}
?>
