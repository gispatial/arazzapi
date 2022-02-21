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
include_once '../objects/person_document.php';
 include_once '../token/validatetoken.php';
// instantiate database and person_document object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$person_document = new Person_Document($db);

$person_document->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$person_document->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read person_document will be here

// query person_document
$stmt = $person_document->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //person_document array
    $person_document_arr=array();
	$person_document_arr["pageno"]=$person_document->pageNo;
	$person_document_arr["pagesize"]=$person_document->no_of_records_per_page;
    $person_document_arr["total_count"]=$person_document->total_record_count();
    $person_document_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $person_document_item=array(
            
"ic_no" => $ic_no,
"document_code" => $document_code,
"filename" => html_entity_decode($filename),
"ori_filename" => html_entity_decode($ori_filename),
"file_path" => html_entity_decode($file_path),
"date_updated" => $date_updated
        );
 
        array_push($person_document_arr["records"], $person_document_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show person_document data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "person_document found","document"=> $person_document_arr));
    
}else{
 // no person_document found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no person_document found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No person_document found.","document"=> ""));
    
}
 


