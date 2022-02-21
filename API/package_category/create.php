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
 
// instantiate package_category object
include_once '../objects/package_category.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$package_category = new Package_Category($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->category_code)
&&!empty($data->description)
&&!empty($data->prefix)
&&!empty($data->picture_path)
&&!empty($data->show_display)){
 
    // set package_category property values
	 
$package_category->category_code = $data->category_code;
$package_category->description = $data->description;
$package_category->prefix = $data->prefix;
$package_category->picture_path = $data->picture_path;
$package_category->show_display = $data->show_display;
 	$lastInsertedId=$package_category->create();
    // create the package_category
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the package_category, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create package_category","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create package_category. Data is incomplete.","document"=> ""));
}
?>
