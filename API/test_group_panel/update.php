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
include_once '../objects/test_group_panel.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare test_group_panel object
$test_group_panel = new Test_Group_Panel($db);
 
// get id of test_group_panel to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of test_group_panel to be edited
$test_group_panel->test_group_code = $data->test_group_code;

if(
!empty($data->test_group_code)
&&!empty($data->test_panel_code)
){
// set test_group_panel property values

$test_group_panel->test_group_code = $data->test_group_code;
$test_group_panel->test_panel_code = $data->test_panel_code;
 
// update the test_group_panel
if($test_group_panel->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the test_group_panel, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update test_group_panel","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update test_group_panel. Data is incomplete.","document"=> ""));
}
?>
