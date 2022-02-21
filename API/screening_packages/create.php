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
 
// instantiate screening_packages object
include_once '../objects/screening_packages.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$screening_packages = new Screening_Packages($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->package_code)
&&!empty($data->single_package)
&&!empty($data->category_code)
&&!empty($data->picture_path)
&&!empty($data->price)
&&!empty($data->license_validity_year)
&&!empty($data->test_included)
&&!empty($data->note)
&&!empty($data->commercial)){
 
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
 	$lastInsertedId=$screening_packages->create();
    // create the screening_packages
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the screening_packages, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create screening_packages","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create screening_packages. Data is incomplete.","document"=> ""));
}
?>
