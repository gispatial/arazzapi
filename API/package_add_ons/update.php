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
include_once '../objects/package_add_ons.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare package_add_ons object
$package_add_ons = new Package_Add_Ons($db);
 
// get id of package_add_ons to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of package_add_ons to be edited
$package_add_ons->package_code = $data->package_code;

if(
!empty($data->package_code)
&&!empty($data->add_on_code)
&&!empty($data->add_on_name)
&&!empty($data->test_location_code)
&&!empty($data->test_location_name)
&&!empty($data->total_test_conducted)
&&!empty($data->patient_type_code)
){
// set package_add_ons property values

$package_add_ons->package_code = $data->package_code;
$package_add_ons->add_on_code = $data->add_on_code;
$package_add_ons->add_on_name = $data->add_on_name;
$package_add_ons->test_location_code = $data->test_location_code;
$package_add_ons->test_location_name = $data->test_location_name;
$package_add_ons->total_test_conducted = $data->total_test_conducted;
$package_add_ons->patient_type_code = $data->patient_type_code;
 
// update the package_add_ons
if($package_add_ons->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the package_add_ons, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update package_add_ons","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update package_add_ons. Data is incomplete.","document"=> ""));
}
?>
