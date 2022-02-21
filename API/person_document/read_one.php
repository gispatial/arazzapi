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
include_once '../objects/person_document.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare person_document object
$person_document = new Person_Document($db);
 
// set ID property of record to read
$person_document->ic_no = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of person_document to be edited
$person_document->readOne();
 
if($person_document->ic_no!=null){
    // create array
    $person_document_arr = array(
        
"ic_no" => $person_document->ic_no,
"document_code" => $person_document->document_code,
"filename" => html_entity_decode($person_document->filename),
"ori_filename" => html_entity_decode($person_document->ori_filename),
"file_path" => html_entity_decode($person_document->file_path),
"date_updated" => $person_document->date_updated
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "person_document found","document"=> $person_document_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user person_document does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "person_document does not exist.","document"=> ""));
}
?>
