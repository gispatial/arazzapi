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
include_once '../objects/test_reference_range.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare test_reference_range object
$test_reference_range = new Test_Reference_Range($db);
 
// set ID property of record to read
$test_reference_range->test_marker_code = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of test_reference_range to be edited
$test_reference_range->readOne();
 
if($test_reference_range->test_marker_code!=null){
    // create array
    $test_reference_range_arr = array(
        
"test_marker_code" => $test_reference_range->test_marker_code,
"code" => $test_reference_range->code,
"min" => $test_reference_range->min,
"max" => $test_reference_range->max,
"summary" => html_entity_decode($test_reference_range->summary)
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "test_reference_range found","document"=> $test_reference_range_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user test_reference_range does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "test_reference_range does not exist.","document"=> ""));
}
?>
