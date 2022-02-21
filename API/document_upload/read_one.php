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
include_once '../objects/document_upload.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare document_upload object
$document_upload = new Document_Upload($db);
 
// set ID property of record to read
$document_upload->package_category = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of document_upload to be edited
$document_upload->readOne();
 
if($document_upload->package_category!=null){
    // create array
    $document_upload_arr = array(
        
"package_category" => $document_upload->package_category,
"code" => $document_upload->code,
"name" => html_entity_decode($document_upload->name),
"note" => html_entity_decode($document_upload->note),
"sort_id" => $document_upload->sort_id,
"enabled" => $document_upload->enabled
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "document_upload found","document"=> $document_upload_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user document_upload does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "document_upload does not exist.","document"=> ""));
}
?>
