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
include_once '../objects/test_location.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare test_location object
$test_location = new Test_Location($db);
 
// set ID property of record to read
$test_location->code = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of test_location to be edited
$test_location->readOne();
 
if($test_location->code!=null){
    // create array
    $test_location_arr = array(
        
"code" => $test_location->code,
"name" => $test_location->name
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "test_location found","document"=> $test_location_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user test_location does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "test_location does not exist.","document"=> ""));
}
?>
