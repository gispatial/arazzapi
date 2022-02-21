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
include_once '../objects/test_group.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare test_group object
$test_group = new Test_Group($db);
 
// get id of test_group to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of test_group to be edited
$test_group->test_group_code = $data->test_group_code;

if(
!empty($data->test_group_code)
&&!empty($data->group_name)
&&!empty($data->patient_type)
&&!empty($data->package_category)
&&!empty($data->price)
&&!empty($data->enabled)
){
// set test_group property values

$test_group->test_group_code = $data->test_group_code;
$test_group->group_name = $data->group_name;
$test_group->patient_type = $data->patient_type;
$test_group->package_category = $data->package_category;
$test_group->price = $data->price;
$test_group->enabled = $data->enabled;
 
// update the test_group
if($test_group->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the test_group, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update test_group","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update test_group. Data is incomplete.","document"=> ""));
}
?>
