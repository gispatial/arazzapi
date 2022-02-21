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
include_once '../objects/test_group_panel.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare test_group_panel object
$test_group_panel = new Test_Group_Panel($db);
 
// set ID property of record to read
$test_group_panel->test_group_code = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of test_group_panel to be edited
$test_group_panel->readOne();
 
if($test_group_panel->test_group_code!=null){
    // create array
    $test_group_panel_arr = array(
        
"test_group_code" => $test_group_panel->test_group_code,
"test_panel_code" => $test_group_panel->test_panel_code
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "test_group_panel found","document"=> $test_group_panel_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user test_group_panel does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "test_group_panel does not exist.","document"=> ""));
}
?>
