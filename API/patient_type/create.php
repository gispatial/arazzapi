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
 
// instantiate patient_type object
include_once '../objects/patient_type.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$patient_type = new Patient_Type($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->patient_type_code)
&&!empty($data->name)
&&!empty($data->min_age)
&&!empty($data->max_age)){
 
    // set patient_type property values
	 
$patient_type->patient_type_code = $data->patient_type_code;
$patient_type->name = $data->name;
$patient_type->min_age = $data->min_age;
$patient_type->max_age = $data->max_age;
 	$lastInsertedId=$patient_type->create();
    // create the patient_type
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the patient_type, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create patient_type","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create patient_type. Data is incomplete.","document"=> ""));
}
?>
