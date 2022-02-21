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
include_once '../objects/notification_log.php';
 include_once '../token/validatetoken.php';
// instantiate database and notification_log object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$notification_log = new Notification_Log($db);

$notification_log->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$notification_log->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read notification_log will be here

// query notification_log
$stmt = $notification_log->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //notification_log array
    $notification_log_arr=array();
	$notification_log_arr["pageno"]=$notification_log->pageNo;
	$notification_log_arr["pagesize"]=$notification_log->no_of_records_per_page;
    $notification_log_arr["total_count"]=$notification_log->total_record_count();
    $notification_log_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $notification_log_item=array(
            
"notification_id" => $notification_id,
"person_id" => $person_id,
"date_send" => $date_send
        );
 
        array_push($notification_log_arr["records"], $notification_log_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show notification_log data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "notification_log found","document"=> $notification_log_arr));
    
}else{
 // no notification_log found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no notification_log found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No notification_log found.","document"=> ""));
    
}
 


