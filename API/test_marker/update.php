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
include_once '../objects/test_marker.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare test_marker object
$test_marker = new Test_Marker($db);
 
// get id of test_marker to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of test_marker to be edited
$test_marker->test_panel_code = $data->test_panel_code;

if(
!empty($data->test_panel_code)
&&!empty($data->code)
&&!empty($data->name)
&&!empty($data->data_format)
){
// set test_marker property values

$test_marker->test_panel_code = $data->test_panel_code;
$test_marker->code = $data->code;
$test_marker->name = $data->name;
$test_marker->description = $data->description;
$test_marker->unit = $data->unit;
$test_marker->data_format = $data->data_format;
 
// update the test_marker
if($test_marker->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the test_marker, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update test_marker","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update test_marker. Data is incomplete.","document"=> ""));
}
?>
