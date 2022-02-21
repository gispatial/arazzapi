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
include_once '../objects/content_mgmt.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare content_mgmt object
$content_mgmt = new Content_Mgmt($db);
 
// set ID property of record to read
$content_mgmt->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of content_mgmt to be edited
$content_mgmt->readOne();
 
if($content_mgmt->id!=null){
    // create array
    $content_mgmt_arr = array(
        
"id" => $content_mgmt->id,
"name" => $content_mgmt->name,
"content" => $content_mgmt->content,
"date_updated" => $content_mgmt->date_updated
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "content_mgmt found","document"=> $content_mgmt_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user content_mgmt does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "content_mgmt does not exist.","document"=> ""));
}
?>
