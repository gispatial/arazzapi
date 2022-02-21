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
 
// instantiate package_test_groups object
include_once '../objects/package_test_groups.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$package_test_groups = new Package_Test_Groups($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->package_code)
&&!empty($data->test_group_code)
&&!empty($data->test_location)
&&!empty($data->total_test_conducted)
&&!empty($data->remark)){
 
    // set package_test_groups property values
	 
$package_test_groups->package_code = $data->package_code;
$package_test_groups->test_group_code = $data->test_group_code;
$package_test_groups->test_location = $data->test_location;
$package_test_groups->total_test_conducted = $data->total_test_conducted;
$package_test_groups->remark = $data->remark;
 	$lastInsertedId=$package_test_groups->create();
    // create the package_test_groups
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the package_test_groups, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create package_test_groups","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create package_test_groups. Data is incomplete.","document"=> ""));
}
?>
