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
include_once '../objects/payment.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare payment object
$payment = new Payment($db);
 
// get id of payment to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of payment to be edited
$payment->ref_no = $data->ref_no;

if(
!empty($data->ref_no)
&&!empty($data->amount)
&&!empty($data->status)
&&!empty($data->remark)
&&!empty($data->method)
){
// set payment property values

$payment->ref_no = $data->ref_no;
$payment->amount = $data->amount;
$payment->status = $data->status;
$payment->remark = $data->remark;
$payment->method = $data->method;
 
// update the payment
if($payment->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the payment, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update payment","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update payment. Data is incomplete.","document"=> ""));
}
?>
