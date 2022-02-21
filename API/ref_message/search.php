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
include_once '../objects/ref_message.php';
 include_once '../token/validatetoken.php';
// instantiate database and ref_message object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$ref_message = new Ref_Message($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$ref_message->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$ref_message->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query ref_message
$stmt = $ref_message->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //ref_message array
    $ref_message_arr=array();
	$ref_message_arr["pageno"]=$ref_message->pageNo;
	$ref_message_arr["pagesize"]=$ref_message->no_of_records_per_page;
    $ref_message_arr["total_count"]=$ref_message->total_record_count();
    $ref_message_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $ref_message_item=array(
            
"message_type_code" => $message_type_code,
"message_type_desc" => $message_type_desc
        );
 
        array_push($ref_message_arr["records"], $ref_message_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show ref_message data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "ref_message found","document"=> $ref_message_arr));
    
}else{
 // no ref_message found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no ref_message found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No ref_message found.","document"=> ""));
    
}
 


