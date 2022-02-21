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
include_once '../objects/six_digit_code.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare six_digit_code object
$six_digit_code = new Six_Digit_Code($db);
 
// set ID property of record to read
$six_digit_code->mobile = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of six_digit_code to be edited
$six_digit_code->readOne();
 
if($six_digit_code->mobile!=null){
    // create array
    $six_digit_code_arr = array(
        
"code" => $six_digit_code->code,
"mobile" => $six_digit_code->mobile,
"expired" => $six_digit_code->expired,
"date_sent" => $six_digit_code->date_sent
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "six_digit_code found","document"=> $six_digit_code_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user six_digit_code does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "six_digit_code does not exist.","document"=> ""));
}
?>
