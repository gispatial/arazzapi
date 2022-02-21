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
include_once '../objects/test_marker.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare test_marker object
$test_marker = new Test_Marker($db);
 
// set ID property of record to read
$test_marker->test_panel_code = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of test_marker to be edited
$test_marker->readOne();
 
if($test_marker->test_panel_code!=null){
    // create array
    $test_marker_arr = array(
        
"test_panel_code" => $test_marker->test_panel_code,
"code" => $test_marker->code,
"name" => $test_marker->name,
"description" => html_entity_decode($test_marker->description),
"unit" => $test_marker->unit,
"data_format" => $test_marker->data_format
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "test_marker found","document"=> $test_marker_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user test_marker does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "test_marker does not exist.","document"=> ""));
}
?>
