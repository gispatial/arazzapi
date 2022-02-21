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
include_once '../objects/company_document.php';
 include_once '../token/validatetoken.php';
// instantiate database and company_document object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$company_document = new Company_Document($db);

$company_document->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$company_document->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read company_document will be here

// query company_document
$stmt = $company_document->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //company_document array
    $company_document_arr=array();
	$company_document_arr["pageno"]=$company_document->pageNo;
	$company_document_arr["pagesize"]=$company_document->no_of_records_per_page;
    $company_document_arr["total_count"]=$company_document->total_record_count();
    $company_document_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $company_document_item=array(
            
"co_reg_no" => $co_reg_no,
"document_code" => $document_code,
"filename" => html_entity_decode($filename),
"ori_filename" => html_entity_decode($ori_filename),
"file_path" => html_entity_decode($file_path),
"date_updated" => $date_updated
        );
 
        array_push($company_document_arr["records"], $company_document_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show company_document data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "company_document found","document"=> $company_document_arr));
    
}else{
 // no company_document found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no company_document found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No company_document found.","document"=> ""));
    
}
 


