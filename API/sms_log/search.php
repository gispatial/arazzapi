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
include_once '../objects/sms_log.php';
 include_once '../token/validatetoken.php';
// instantiate database and sms_log object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$sms_log = new Sms_Log($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$sms_log->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$sms_log->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query sms_log
$stmt = $sms_log->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //sms_log array
    $sms_log_arr=array();
	$sms_log_arr["pageno"]=$sms_log->pageNo;
	$sms_log_arr["pagesize"]=$sms_log->no_of_records_per_page;
    $sms_log_arr["total_count"]=$sms_log->total_record_count();
    $sms_log_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $sms_log_item=array(
            
"id" => $id,
"date_sent" => $date_sent,
"mobile_no" => $mobile_no,
"message" => html_entity_decode($message),
"status" => $status
        );
 
        array_push($sms_log_arr["records"], $sms_log_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show sms_log data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "sms_log found","document"=> $sms_log_arr));
    
}else{
 // no sms_log found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no sms_log found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No sms_log found.","document"=> ""));
    
}
 


