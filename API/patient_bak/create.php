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
 
// instantiate patient_bak object
include_once '../objects/patient_bak.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$patient_bak = new Patient_Bak($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->refno)
&&!empty($data->name)
&&!empty($data->age)
&&!empty($data->gender)
&&!empty($data->type)
&&!empty($data->address)
&&!empty($data->town)
&&!empty($data->district)
&&!empty($data->postcode)
&&!empty($data->state)){
 
    // set patient_bak property values
	 
$patient_bak->refno = $data->refno;
$patient_bak->name = $data->name;
$patient_bak->age = $data->age;
$patient_bak->ic_no = $data->ic_no;
$patient_bak->email = $data->email;
$patient_bak->mobile_no = $data->mobile_no;
$patient_bak->gender = $data->gender;
$patient_bak->type = $data->type;
$patient_bak->address = $data->address;
$patient_bak->town = $data->town;
$patient_bak->district = $data->district;
$patient_bak->postcode = $data->postcode;
$patient_bak->state = $data->state;
 	$lastInsertedId=$patient_bak->create();
    // create the patient_bak
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the patient_bak, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create patient_bak","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create patient_bak. Data is incomplete.","document"=> ""));
}
?>
