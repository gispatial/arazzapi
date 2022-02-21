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
include_once '../objects/package_test_groups.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare package_test_groups object
$package_test_groups = new Package_Test_Groups($db);
 
// get id of package_test_groups to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of package_test_groups to be edited
$package_test_groups->package_code = $data->package_code;

if(
!empty($data->package_code)
&&!empty($data->test_group_code)
&&!empty($data->test_location)
&&!empty($data->total_test_conducted)
&&!empty($data->remark)
){
// set package_test_groups property values

$package_test_groups->package_code = $data->package_code;
$package_test_groups->test_group_code = $data->test_group_code;
$package_test_groups->test_location = $data->test_location;
$package_test_groups->total_test_conducted = $data->total_test_conducted;
$package_test_groups->remark = $data->remark;
 
// update the package_test_groups
if($package_test_groups->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the package_test_groups, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update package_test_groups","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update package_test_groups. Data is incomplete.","document"=> ""));
}
?>
