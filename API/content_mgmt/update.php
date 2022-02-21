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
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../config/database.php';
include_once '../objects/content_mgmt.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare content_mgmt object
$content_mgmt = new Content_Mgmt($db);
 
// get id of content_mgmt to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of content_mgmt to be edited
$content_mgmt->id = $data->id;

if(
!empty($data->name)
&&!empty($data->content)
&&!empty($data->date_updated)
){
// set content_mgmt property values

$content_mgmt->name = $data->name;
$content_mgmt->content = $data->content;
$content_mgmt->date_updated = $data->date_updated;
 
// update the content_mgmt
if($content_mgmt->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the content_mgmt, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update content_mgmt","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update content_mgmt. Data is incomplete.","document"=> ""));
}
?>
