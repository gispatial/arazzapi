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
 
// instantiate person object
include_once '../objects/person.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$person = new Person($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->name)
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
&&!empty($data->relationship)){
 
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
 	$lastInsertedId=$person->create();
    // create the person
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the person, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create person","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create person. Data is incomplete.","document"=> ""));
}
?>
