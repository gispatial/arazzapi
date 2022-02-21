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
include_once '../objects/sms_notification.php';
 include_once '../token/validatetoken.php';
// instantiate database and sms_notification object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$sms_notification = new Sms_Notification($db);

$sms_notification->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$sms_notification->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read sms_notification will be here

// query sms_notification
$stmt = $sms_notification->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //sms_notification array
    $sms_notification_arr=array();
	$sms_notification_arr["pageno"]=$sms_notification->pageNo;
	$sms_notification_arr["pagesize"]=$sms_notification->no_of_records_per_page;
    $sms_notification_arr["total_count"]=$sms_notification->total_record_count();
    $sms_notification_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $sms_notification_item=array(
            
"code" => $code,
"message" => html_entity_decode($message),
"params" => $params,
"response_msg_success" => html_entity_decode($response_msg_success),
"response_msg_failed" => html_entity_decode($response_msg_failed)
        );
 
        array_push($sms_notification_arr["records"], $sms_notification_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show sms_notification data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "sms_notification found","document"=> $sms_notification_arr));
    
}else{
 // no sms_notification found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no sms_notification found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No sms_notification found.","document"=> ""));
    
}
 


