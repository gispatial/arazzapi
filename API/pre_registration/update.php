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
include_once '../objects/pre_registration.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare pre_registration object
$pre_registration = new Pre_Registration($db);
 
// get id of pre_registration to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of pre_registration to be edited
$pre_registration->seq_reg_no = $data->seq_reg_no;

if(
!empty($data->reg_no)
&&!empty($data->ic_no)
&&!empty($data->name)
&&!empty($data->mobile_no)
&&!empty($data->email)
&&!empty($data->package_code)
&&!empty($data->center_code)
&&!empty($data->amount_paid)
&&!empty($data->payment_no)
&&!empty($data->payment_method)
&&!empty($data->date_registered)
&&!empty($data->date_expired)
&&!empty($data->status)
){
// set pre_registration property values

$pre_registration->reg_no = $data->reg_no;
$pre_registration->ic_no = $data->ic_no;
$pre_registration->name = $data->name;
$pre_registration->mobile_no = $data->mobile_no;
$pre_registration->email = $data->email;
$pre_registration->package_code = $data->package_code;
$pre_registration->center_code = $data->center_code;
$pre_registration->amount_paid = $data->amount_paid;
$pre_registration->payment_no = $data->payment_no;
$pre_registration->payment_date = $data->payment_date;
$pre_registration->payment_method = $data->payment_method;
$pre_registration->date_registered = $data->date_registered;
$pre_registration->date_expired = $data->date_expired;
$pre_registration->status = $data->status;
$pre_registration->company_reg_no = $data->company_reg_no;
 
// update the pre_registration
if($pre_registration->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the pre_registration, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update pre_registration","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update pre_registration. Data is incomplete.","document"=> ""));
}
?>
