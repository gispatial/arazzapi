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
include_once '../objects/content_mgmt.php';
 include_once '../token/validatetoken.php';
// instantiate database and content_mgmt object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$content_mgmt = new Content_Mgmt($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$content_mgmt->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$content_mgmt->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query content_mgmt
$stmt = $content_mgmt->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //content_mgmt array
    $content_mgmt_arr=array();
	$content_mgmt_arr["pageno"]=$content_mgmt->pageNo;
	$content_mgmt_arr["pagesize"]=$content_mgmt->no_of_records_per_page;
    $content_mgmt_arr["total_count"]=$content_mgmt->total_record_count();
    $content_mgmt_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $content_mgmt_item=array(
            
"id" => $id,
"name" => $name,
"content" => $content,
"date_updated" => $date_updated
        );
 
        array_push($content_mgmt_arr["records"], $content_mgmt_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show content_mgmt data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "content_mgmt found","document"=> $content_mgmt_arr));
    
}else{
 // no content_mgmt found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no content_mgmt found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No content_mgmt found.","document"=> ""));
    
}
 


