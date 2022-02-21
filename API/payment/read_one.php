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
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../objects/payment.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare payment object
$payment = new Payment($db);
 
// set ID property of record to read
$payment->ref_no = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of payment to be edited
$payment->readOne();
 
if($payment->ref_no!=null){
    // create array
    $payment_arr = array(
        
"ref_no" => $payment->ref_no,
"amount" => $payment->amount,
"status" => html_entity_decode($payment->status),
"remark" => html_entity_decode($payment->remark),
"method" => $payment->method
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "payment found","document"=> $payment_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user payment does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "payment does not exist.","document"=> ""));
}
?>
