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
include_once '../objects/message_box.php';
 include_once '../token/validatetoken.php';
// instantiate database and message_box object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$message_box = new Message_Box($db);

$message_box->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$message_box->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read message_box will be here

// query message_box
$stmt = $message_box->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //message_box array
    $message_box_arr=array();
	$message_box_arr["pageno"]=$message_box->pageNo;
	$message_box_arr["pagesize"]=$message_box->no_of_records_per_page;
    $message_box_arr["total_count"]=$message_box->total_record_count();
    $message_box_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $message_box_item=array(
            
"message_id" => $message_id,
"sender" => $sender,
"sender_name" => html_entity_decode($sender_name),
"receiver" => $receiver,
"receiver_name" => html_entity_decode($receiver_name),
"subject" => html_entity_decode($subject),
"content" => $content,
"headers" => html_entity_decode($headers),
"date_sent" => $date_sent,
"message_type_code" => $message_type_code,
"status" => $status,
"attachment" => $attachment,
"message_root_id" => $message_root_id,
"latest" => $latest
        );
 
        array_push($message_box_arr["records"], $message_box_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show message_box data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "message_box found","document"=> $message_box_arr));
    
}else{
 // no message_box found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no message_box found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No message_box found.","document"=> ""));
    
}
 


