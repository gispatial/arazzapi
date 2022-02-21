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
include_once '../objects/pre_registration.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare pre_registration object
$pre_registration = new Pre_Registration($db);
 
// set ID property of record to read
$pre_registration->seq_reg_no = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of pre_registration to be edited
$pre_registration->readOne();
 
if($pre_registration->seq_reg_no!=null){
    // create array
    $pre_registration_arr = array(
        
"seq_reg_no" => $pre_registration->seq_reg_no,
"reg_no" => $pre_registration->reg_no,
"ic_no" => $pre_registration->ic_no,
"name" => $pre_registration->name,
"mobile_no" => $pre_registration->mobile_no,
"email" => $pre_registration->email,
"package_code" => $pre_registration->package_code,
"center_code" => $pre_registration->center_code,
"amount_paid" => $pre_registration->amount_paid,
"payment_no" => $pre_registration->payment_no,
"payment_date" => $pre_registration->payment_date,
"payment_method" => $pre_registration->payment_method,
"date_registered" => $pre_registration->date_registered,
"date_expired" => $pre_registration->date_expired,
"status" => $pre_registration->status,
"company_reg_no" => $pre_registration->company_reg_no
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "pre_registration found","document"=> $pre_registration_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user pre_registration does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "pre_registration does not exist.","document"=> ""));
}
?>
