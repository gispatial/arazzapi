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
include_once '../objects/notification.php';
 include_once '../token/validatetoken.php';
// instantiate database and notification object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$notification = new Notification($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$notification->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$notification->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query notification
$stmt = $notification->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //notification array
    $notification_arr=array();
	$notification_arr["pageno"]=$notification->pageNo;
	$notification_arr["pagesize"]=$notification->no_of_records_per_page;
    $notification_arr["total_count"]=$notification->total_record_count();
    $notification_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $notification_item=array(
            
"id" => $id,
"email_title" => html_entity_decode($email_title),
"email_content" => html_entity_decode($email_content),
"sms_content" => html_entity_decode($sms_content)
        );
 
        array_push($notification_arr["records"], $notification_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show notification data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "notification found","document"=> $notification_arr));
    
}else{
 // no notification found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no notification found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No notification found.","document"=> ""));
    
}
 


