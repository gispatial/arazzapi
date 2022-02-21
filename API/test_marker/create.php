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
 
// instantiate test_marker object
include_once '../objects/test_marker.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$test_marker = new Test_Marker($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->test_panel_code)
&&!empty($data->code)
&&!empty($data->name)
&&!empty($data->data_format)){
 
    // set test_marker property values
	 
$test_marker->test_panel_code = $data->test_panel_code;
$test_marker->code = $data->code;
$test_marker->name = $data->name;
$test_marker->description = $data->description;
$test_marker->unit = $data->unit;
$test_marker->data_format = $data->data_format;
 	$lastInsertedId=$test_marker->create();
    // create the test_marker
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the test_marker, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create test_marker","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create test_marker. Data is incomplete.","document"=> ""));
}
?>
