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
include_once '../objects/package_category.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare package_category object
$package_category = new Package_Category($db);
 
// get id of package_category to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of package_category to be edited
$package_category->category_code = $data->category_code;

if(
!empty($data->category_code)
&&!empty($data->description)
&&!empty($data->prefix)
&&!empty($data->picture_path)
&&!empty($data->show_display)
){
// set package_category property values

$package_category->category_code = $data->category_code;
$package_category->description = $data->description;
$package_category->prefix = $data->prefix;
$package_category->picture_path = $data->picture_path;
$package_category->show_display = $data->show_display;
 
// update the package_category
if($package_category->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the package_category, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update package_category","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update package_category. Data is incomplete.","document"=> ""));
}
?>
