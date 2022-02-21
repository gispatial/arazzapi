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
include_once '../objects/message_document.php';
 include_once '../token/validatetoken.php';
// instantiate database and message_document object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$message_document = new Message_Document($db);

$message_document->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$message_document->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read message_document will be here

// query message_document
$stmt = $message_document->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //message_document array
    $message_document_arr=array();
	$message_document_arr["pageno"]=$message_document->pageNo;
	$message_document_arr["pagesize"]=$message_document->no_of_records_per_page;
    $message_document_arr["total_count"]=$message_document->total_record_count();
    $message_document_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $message_document_item=array(
            
"message_id" => $message_id,
"filename" => html_entity_decode($filename),
"file_path" => html_entity_decode($file_path),
"date_updated" => $date_updated
        );
 
        array_push($message_document_arr["records"], $message_document_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show message_document data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "message_document found","document"=> $message_document_arr));
    
}else{
 // no message_document found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no message_document found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No message_document found.","document"=> ""));
    
}
 


