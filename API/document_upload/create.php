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
 
// instantiate document_upload object
include_once '../objects/document_upload.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$document_upload = new Document_Upload($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->package_category)
&&!empty($data->code)
&&!empty($data->name)
&&!empty($data->note)
&&!empty($data->sort_id)
&&!empty($data->enabled)){
 
    // set document_upload property values
	 
$document_upload->package_category = $data->package_category;
$document_upload->code = $data->code;
$document_upload->name = $data->name;
$document_upload->note = $data->note;
$document_upload->sort_id = $data->sort_id;
$document_upload->enabled = $data->enabled;
 	$lastInsertedId=$document_upload->create();
    // create the document_upload
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the document_upload, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create document_upload","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create document_upload. Data is incomplete.","document"=> ""));
}
?>
