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
 
// instantiate test_result object
include_once '../objects/test_result.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$test_result = new Test_Result($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->patient_ic_no)
&&!empty($data->reg_no)
&&!empty($data->booking_no)
&&!empty($data->test_date)
&&!empty($data->test_panel_code)
&&!empty($data->test_marker_code)
&&!empty($data->test_value)
&&!empty($data->source)
&&!empty($data->date_updated)){
 
    // set test_result property values
	 
$test_result->patient_ic_no = $data->patient_ic_no;
$test_result->reg_no = $data->reg_no;
$test_result->booking_no = $data->booking_no;
$test_result->test_date = $data->test_date;
$test_result->test_panel_code = $data->test_panel_code;
$test_result->test_marker_code = $data->test_marker_code;
$test_result->test_value = $data->test_value;
$test_result->source = $data->source;
$test_result->date_updated = $data->date_updated;
 	$lastInsertedId=$test_result->create();
    // create the test_result
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the test_result, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create test_result","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create test_result. Data is incomplete.","document"=> ""));
}
?>
