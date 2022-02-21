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
include_once '../objects/package_test_panels.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare package_test_panels object
$package_test_panels = new Package_Test_Panels($db);
 
// set ID property of record to read
$package_test_panels->package_code = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of package_test_panels to be edited
$package_test_panels->readOne();
 
if($package_test_panels->package_code!=null){
    // create array
    $package_test_panels_arr = array(
        
"package_code" => $package_test_panels->package_code,
"test_panel_code" => $package_test_panels->test_panel_code,
"test_location" => $package_test_panels->test_location,
"total_test_conducted" => $package_test_panels->total_test_conducted,
"remark" => html_entity_decode($package_test_panels->remark)
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "package_test_panels found","document"=> $package_test_panels_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user package_test_panels does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "package_test_panels does not exist.","document"=> ""));
}
?>
