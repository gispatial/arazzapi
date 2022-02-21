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
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../config/database.php';
include_once '../objects/booking.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare booking object
$booking = new Booking($db);
 
// get id of booking to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of booking to be edited
$booking->booking_no = $data->booking_no;

if(
!empty($data->booking_no)
&&!empty($data->patient_ic_no)
&&!empty($data->reg_no)
&&!empty($data->test_panel_code)
&&!empty($data->status)
&&!empty($data->booking_date)
&&!empty($data->date_submitted)
&&!empty($data->date_updated)
){
// set booking property values

$booking->booking_no = $data->booking_no;
$booking->patient_ic_no = $data->patient_ic_no;
$booking->reg_no = $data->reg_no;
$booking->test_panel_code = $data->test_panel_code;
$booking->status = $data->status;
$booking->booking_date = $data->booking_date;
$booking->date_submitted = $data->date_submitted;
$booking->date_updated = $data->date_updated;
 
// update the booking
if($booking->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the booking, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update booking","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update booking. Data is incomplete.","document"=> ""));
}
?>
