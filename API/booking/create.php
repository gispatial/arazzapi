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

// get database connection
include_once '../config/database.php';
 
// instantiate booking object
include_once '../objects/booking.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$booking = new Booking($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!empty($data->booking_no)
&&!empty($data->patient_ic_no)
&&!empty($data->reg_no)
&&!empty($data->test_panel_code)
&&!empty($data->status)
&&!empty($data->booking_date)
&&!empty($data->date_submitted)
&&!empty($data->date_updated)){
 
    // set booking property values
	 
$booking->booking_no = $data->booking_no;
$booking->patient_ic_no = $data->patient_ic_no;
$booking->reg_no = $data->reg_no;
$booking->test_panel_code = $data->test_panel_code;
$booking->status = $data->status;
$booking->booking_date = $data->booking_date;
$booking->date_submitted = $data->date_submitted;
$booking->date_updated = $data->date_updated;
 	$lastInsertedId=$booking->create();
    // create the booking
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the booking, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create booking","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create booking. Data is incomplete.","document"=> ""));
}
?>
