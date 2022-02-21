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
include_once '../objects/document_upload.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare document_upload object
$document_upload = new Document_Upload($db);
 
// get id of document_upload to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of document_upload to be edited
$document_upload->package_category = $data->package_category;

if(
!empty($data->package_category)
&&!empty($data->code)
&&!empty($data->name)
&&!empty($data->note)
&&!empty($data->sort_id)
&&!empty($data->enabled)
){
// set document_upload property values

$document_upload->package_category = $data->package_category;
$document_upload->code = $data->code;
$document_upload->name = $data->name;
$document_upload->note = $data->note;
$document_upload->sort_id = $data->sort_id;
$document_upload->enabled = $data->enabled;
 
// update the document_upload
if($document_upload->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the document_upload, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update document_upload","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update document_upload. Data is incomplete.","document"=> ""));
}
?>
