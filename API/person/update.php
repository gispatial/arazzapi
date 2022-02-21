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
include_once '../objects/person.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare person object
$person = new Person($db);
 
// get id of person to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of person to be edited
$person->ic_no = $data->ic_no;

if(
!empty($data->name)
&&!empty($data->age)
&&!empty($data->ic_no)
&&!empty($data->email)
&&!empty($data->mobile_no)
&&!empty($data->gender)
&&!empty($data->patient_type_code)
&&!empty($data->address)
&&!empty($data->town)
&&!empty($data->district)
&&!empty($data->postcode)
&&!empty($data->state)
&&!empty($data->photo_path)
&&!empty($data->relationship)
){
// set person property values

$person->reg_no = $data->reg_no;
$person->name = $data->name;
$person->age = $data->age;
$person->ic_no = $data->ic_no;
$person->email = $data->email;
$person->mobile_no = $data->mobile_no;
$person->gender = $data->gender;
$person->patient_type_code = $data->patient_type_code;
$person->address = $data->address;
$person->town = $data->town;
$person->district = $data->district;
$person->postcode = $data->postcode;
$person->state = $data->state;
$person->photo_path = $data->photo_path;
$person->relationship = $data->relationship;
 
// update the person
if($person->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the person, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update person","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update person. Data is incomplete.","document"=> ""));
}
?>
