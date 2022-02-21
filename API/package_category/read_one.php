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
include_once '../objects/package_category.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare package_category object
$package_category = new Package_Category($db);
 
// set ID property of record to read
$package_category->category_code = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of package_category to be edited
$package_category->readOne();
 
if($package_category->category_code!=null){
    // create array
    $package_category_arr = array(
        
"category_code" => $package_category->category_code,
"description" => html_entity_decode($package_category->description),
"prefix" => $package_category->prefix,
"picture_path" => html_entity_decode($package_category->picture_path),
"show_display" => $package_category->show_display
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "package_category found","document"=> $package_category_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user package_category does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "package_category does not exist.","document"=> ""));
}
?>
