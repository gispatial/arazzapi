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
 
// instantiate company object
include_once '../objects/company.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$company = new Company($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->co_reg_no)
&&!empty($data->name)
&&!empty($data->address)
&&!empty($data->town)
&&!empty($data->district)
&&!empty($data->postcode)
&&!empty($data->state)
&&!empty($data->geocode)
&&!empty($data->pic_url)
&&!empty($data->contact_no)
&&!empty($data->email)){
 
    // set company property values
	 
$company->co_reg_no = $data->co_reg_no;
$company->name = $data->name;
$company->address = $data->address;
$company->town = $data->town;
$company->district = $data->district;
$company->postcode = $data->postcode;
$company->state = $data->state;
$company->geocode = $data->geocode;
$company->pic_url = $data->pic_url;
$company->contact_no = $data->contact_no;
$company->email = $data->email;
 	$lastInsertedId=$company->create();
    // create the company
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the company, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create company","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create company. Data is incomplete.","document"=> ""));
}
?>
