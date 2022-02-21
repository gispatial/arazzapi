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
include_once '../objects/add_on_services.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare add_on_services object
$add_on_services = new Add_On_Services($db);
 
// get id of add_on_services to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of add_on_services to be edited
$add_on_services->add_on_code = $data->add_on_code;

if(
!empty($data->add_on_code)
&&!empty($data->name)
&&!empty($data->price)
&&!empty($data->unit)
&&!empty($data->unit_decimal)
&&!empty($data->remark)
&&!empty($data->status)
&&!empty($data->patient_type_code)
&&!empty($data->no_of_patient)
){
// set add_on_services property values

$add_on_services->add_on_code = $data->add_on_code;
$add_on_services->name = $data->name;
$add_on_services->price = $data->price;
$add_on_services->unit = $data->unit;
$add_on_services->unit_decimal = $data->unit_decimal;
$add_on_services->remark = $data->remark;
$add_on_services->status = $data->status;
$add_on_services->patient_type_code = $data->patient_type_code;
$add_on_services->no_of_patient = $data->no_of_patient;
 
// update the add_on_services
if($add_on_services->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the add_on_services, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update add_on_services","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update add_on_services. Data is incomplete.","document"=> ""));
}
?>
