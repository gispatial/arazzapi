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

// get database connection
include_once '../config/database.php';
 
// instantiate company_document object
include_once '../objects/company_document.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$company_document = new Company_Document($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->co_reg_no)
&&!empty($data->document_code)
&&!empty($data->filename)
&&!empty($data->ori_filename)
&&!empty($data->file_path)
&&!empty($data->date_updated)){
 
    // set company_document property values
	 
$company_document->co_reg_no = $data->co_reg_no;
$company_document->document_code = $data->document_code;
$company_document->filename = $data->filename;
$company_document->ori_filename = $data->ori_filename;
$company_document->file_path = $data->file_path;
$company_document->date_updated = $data->date_updated;
 	$lastInsertedId=$company_document->create();
    // create the company_document
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the company_document, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create company_document","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create company_document. Data is incomplete.","document"=> ""));
}
?>
