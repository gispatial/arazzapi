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

include_once '../config/database.php';
include_once '../objects/document_upload.php';
 include_once '../token/validatetoken.php';
// instantiate database and document_upload object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$document_upload = new Document_Upload($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$document_upload->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$document_upload->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query document_upload
$stmt = $document_upload->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //document_upload array
    $document_upload_arr=array();
	$document_upload_arr["pageno"]=$document_upload->pageNo;
	$document_upload_arr["pagesize"]=$document_upload->no_of_records_per_page;
    $document_upload_arr["total_count"]=$document_upload->total_record_count();
    $document_upload_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $document_upload_item=array(
            
"package_category" => $package_category,
"code" => $code,
"name" => html_entity_decode($name),
"note" => html_entity_decode($note),
"sort_id" => $sort_id,
"enabled" => $enabled
        );
 
        array_push($document_upload_arr["records"], $document_upload_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show document_upload data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "document_upload found","document"=> $document_upload_arr));
    
}else{
 // no document_upload found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no document_upload found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No document_upload found.","document"=> ""));
    
}
 


