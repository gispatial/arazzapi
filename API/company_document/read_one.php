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
include_once '../objects/company_document.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare company_document object
$company_document = new Company_Document($db);
 
// set ID property of record to read
$company_document->co_reg_no = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of company_document to be edited
$company_document->readOne();
 
if($company_document->co_reg_no!=null){
    // create array
    $company_document_arr = array(
        
"co_reg_no" => $company_document->co_reg_no,
"document_code" => $company_document->document_code,
"filename" => html_entity_decode($company_document->filename),
"ori_filename" => html_entity_decode($company_document->ori_filename),
"file_path" => html_entity_decode($company_document->file_path),
"date_updated" => $company_document->date_updated
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "company_document found","document"=> $company_document_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user company_document does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "company_document does not exist.","document"=> ""));
}
?>
