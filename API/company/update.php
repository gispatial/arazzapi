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
include_once '../objects/company.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare company object
$company = new Company($db);
 
// get id of company to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of company to be edited
$company->co_id = $data->co_id;

if(
!empty($data->co_reg_no)
&&!empty($data->name)
&&!empty($data->address)
&&!empty($data->town)
&&!empty($data->district)
&&!empty($data->postcode)
&&!empty($data->state)
&&!empty($data->geocode)
&&!empty($data->pic_url)
&&!empty($data->contact_no)
&&!empty($data->email)
){
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
 
// update the company
if($company->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the company, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update company","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update company. Data is incomplete.","document"=> ""));
}
?>
