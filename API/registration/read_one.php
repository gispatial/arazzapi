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
include_once '../objects/registration.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare registration object
$registration = new Registration($db);
 
// set ID property of record to read
$registration->ERROR_NOPRIMARYKEYFOUND = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of registration to be edited
$registration->readOne();
 
if($registration->ERROR_NOPRIMARYKEYFOUND!=null){
    // create array
    $registration_arr = array(
        
"package_code" => $registration->package_code,
"amount_fee" => $registration->amount_fee,
"main_account_id" => $registration->main_account_id,
"date_registered" => $registration->date_registered,
"date_expired" => $registration->date_expired
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "registration found","document"=> $registration_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user registration does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "registration does not exist.","document"=> ""));
}
?>
