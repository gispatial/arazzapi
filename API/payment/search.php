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
include_once '../objects/payment.php';
 include_once '../token/validatetoken.php';
// instantiate database and payment object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$payment = new Payment($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$payment->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$payment->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query payment
$stmt = $payment->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //payment array
    $payment_arr=array();
	$payment_arr["pageno"]=$payment->pageNo;
	$payment_arr["pagesize"]=$payment->no_of_records_per_page;
    $payment_arr["total_count"]=$payment->total_record_count();
    $payment_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $payment_item=array(
            
"ref_no" => $ref_no,
"amount" => $amount,
"status" => html_entity_decode($status),
"remark" => html_entity_decode($remark),
"method" => $method
        );
 
        array_push($payment_arr["records"], $payment_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show payment data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "payment found","document"=> $payment_arr));
    
}else{
 // no payment found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no payment found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No payment found.","document"=> ""));
    
}
 


