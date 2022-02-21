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
include_once '../objects/booking.php';
 include_once '../token/validatetoken.php';
// instantiate database and booking object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$booking = new Booking($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$booking->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$booking->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query booking
$stmt = $booking->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //booking array
    $booking_arr=array();
	$booking_arr["pageno"]=$booking->pageNo;
	$booking_arr["pagesize"]=$booking->no_of_records_per_page;
    $booking_arr["total_count"]=$booking->total_record_count();
    $booking_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $booking_item=array(
            
"booking_no" => $booking_no,
"patient_ic_no" => $patient_ic_no,
"reg_no" => $reg_no,
"test_panel_code" => $test_panel_code,
"status" => $status,
"booking_date" => $booking_date,
"date_submitted" => $date_submitted,
"date_updated" => $date_updated
        );
 
        array_push($booking_arr["records"], $booking_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show booking data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "booking found","document"=> $booking_arr));
    
}else{
 // no booking found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no booking found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No booking found.","document"=> ""));
    
}
 


