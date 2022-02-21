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
include_once '../objects/message_inbox.php';
 include_once '../token/validatetoken.php';
// instantiate database and message_inbox object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$message_inbox = new Message_Inbox($db);

$message_inbox->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$message_inbox->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read message_inbox will be here

// query message_inbox
$stmt = $message_inbox->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //message_inbox array
    $message_inbox_arr=array();
	$message_inbox_arr["pageno"]=$message_inbox->pageNo;
	$message_inbox_arr["pagesize"]=$message_inbox->no_of_records_per_page;
    $message_inbox_arr["total_count"]=$message_inbox->total_record_count();
    $message_inbox_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $message_inbox_item=array(
            
"message_inbox_code" => $message_inbox_code,
"sender" => $sender,
"receiver" => $receiver,
"subject" => html_entity_decode($subject),
"message" => $message,
"headers" => html_entity_decode($headers),
"date_sent" => $date_sent,
"message_type_code" => $message_type_code,
"ic_no" => $ic_no,
"status" => $status,
"attachment" => $attachment
        );
 
        array_push($message_inbox_arr["records"], $message_inbox_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show message_inbox data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "message_inbox found","document"=> $message_inbox_arr));
    
}else{
 // no message_inbox found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no message_inbox found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No message_inbox found.","document"=> ""));
    
}
 


