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
include_once '../objects/screening_packages.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare screening_packages object
$screening_packages = new Screening_Packages($db);
 
// set ID property of record to read
$screening_packages->package_code = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of screening_packages to be edited
$screening_packages->readOne();
 
if($screening_packages->package_code!=null){
    // create array
    $screening_packages_arr = array(
        
"package_code" => $screening_packages->package_code,
"single_package" => html_entity_decode($screening_packages->single_package),
"category_code" => $screening_packages->category_code,
"picture_path" => html_entity_decode($screening_packages->picture_path),
"price" => $screening_packages->price,
"license_validity_year" => $screening_packages->license_validity_year,
"test_included" => html_entity_decode($screening_packages->test_included),
"note" => html_entity_decode($screening_packages->note),
"commercial" => $screening_packages->commercial
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "screening_packages found","document"=> $screening_packages_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user screening_packages does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "screening_packages does not exist.","document"=> ""));
}
?>
