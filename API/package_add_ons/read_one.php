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
include_once '../objects/package_add_ons.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare package_add_ons object
$package_add_ons = new Package_Add_Ons($db);
 
// set ID property of record to read
$package_add_ons->package_code = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of package_add_ons to be edited
$package_add_ons->readOne();
 
if($package_add_ons->package_code!=null){
    // create array
    $package_add_ons_arr = array(
        
"package_code" => $package_add_ons->package_code,
"add_on_code" => $package_add_ons->add_on_code,
"add_on_name" => html_entity_decode($package_add_ons->add_on_name),
"test_location_code" => $package_add_ons->test_location_code,
"test_location_name" => $package_add_ons->test_location_name,
"total_test_conducted" => $package_add_ons->total_test_conducted,
"patient_type_code" => $package_add_ons->patient_type_code
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "package_add_ons found","document"=> $package_add_ons_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user package_add_ons does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "package_add_ons does not exist.","document"=> ""));
}
?>
