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
include_once '../objects/test_result.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare test_result object
$test_result = new Test_Result($db);
 
// set ID property of record to read
$test_result->patient_ic_no = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of test_result to be edited
$test_result->readOne();
 
if($test_result->patient_ic_no!=null){
    // create array
    $test_result_arr = array(
        
"patient_ic_no" => $test_result->patient_ic_no,
"reg_no" => $test_result->reg_no,
"booking_no" => $test_result->booking_no,
"test_date" => $test_result->test_date,
"test_panel_code" => $test_result->test_panel_code,
"test_marker_code" => $test_result->test_marker_code,
"test_value" => $test_result->test_value,
"source" => $test_result->source,
"date_updated" => $test_result->date_updated
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "test_result found","document"=> $test_result_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user test_result does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "test_result does not exist.","document"=> ""));
}
?>
