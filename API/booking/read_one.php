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
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../objects/booking.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare booking object
$booking = new Booking($db);
 
// set ID property of record to read
$booking->booking_no = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of booking to be edited
$booking->readOne();
 
if($booking->booking_no!=null){
    // create array
    $booking_arr = array(
        
"booking_no" => $booking->booking_no,
"patient_ic_no" => $booking->patient_ic_no,
"reg_no" => $booking->reg_no,
"test_panel_code" => $booking->test_panel_code,
"status" => $booking->status,
"booking_date" => $booking->booking_date,
"date_submitted" => $booking->date_submitted,
"date_updated" => $booking->date_updated
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "booking found","document"=> $booking_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user booking does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "booking does not exist.","document"=> ""));
}
?>
