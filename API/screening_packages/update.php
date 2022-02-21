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
include_once '../objects/screening_packages.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare screening_packages object
$screening_packages = new Screening_Packages($db);
 
// get id of screening_packages to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of screening_packages to be edited
$screening_packages->package_code = $data->package_code;

if(
!empty($data->package_code)
&&!empty($data->single_package)
&&!empty($data->category_code)
&&!empty($data->picture_path)
&&!empty($data->price)
&&!empty($data->license_validity_year)
&&!empty($data->test_included)
&&!empty($data->note)
&&!empty($data->commercial)
){
// set screening_packages property values

$screening_packages->package_code = $data->package_code;
$screening_packages->single_package = $data->single_package;
$screening_packages->category_code = $data->category_code;
$screening_packages->picture_path = $data->picture_path;
$screening_packages->price = $data->price;
$screening_packages->license_validity_year = $data->license_validity_year;
$screening_packages->test_included = $data->test_included;
$screening_packages->note = $data->note;
$screening_packages->commercial = $data->commercial;
 
// update the screening_packages
if($screening_packages->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the screening_packages, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update screening_packages","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update screening_packages. Data is incomplete.","document"=> ""));
}
?>
