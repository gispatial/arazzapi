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
include_once '../objects/transaction_log.php';
 include_once '../token/validatetoken.php';
// instantiate database and transaction_log object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$transaction_log = new Transaction_Log($db);

$transaction_log->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$transaction_log->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read transaction_log will be here

// query transaction_log
$stmt = $transaction_log->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //transaction_log array
    $transaction_log_arr=array();
	$transaction_log_arr["pageno"]=$transaction_log->pageNo;
	$transaction_log_arr["pagesize"]=$transaction_log->no_of_records_per_page;
    $transaction_log_arr["total_count"]=$transaction_log->total_record_count();
    $transaction_log_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $transaction_log_item=array(
            
"id" => $id,
"trans_date" => $trans_date,
"activity" => html_entity_decode($activity),
"username" => $username,
"status" => $status
        );
 
        array_push($transaction_log_arr["records"], $transaction_log_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show transaction_log data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "transaction_log found","document"=> $transaction_log_arr));
    
}else{
 // no transaction_log found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no transaction_log found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No transaction_log found.","document"=> ""));
    
}
 


