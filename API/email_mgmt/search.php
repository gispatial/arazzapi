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
include_once '../objects/email_mgmt.php';
 include_once '../token/validatetoken.php';
// instantiate database and email_mgmt object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$email_mgmt = new Email_Mgmt($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$email_mgmt->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$email_mgmt->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query email_mgmt
$stmt = $email_mgmt->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //email_mgmt array
    $email_mgmt_arr=array();
	$email_mgmt_arr["pageno"]=$email_mgmt->pageNo;
	$email_mgmt_arr["pagesize"]=$email_mgmt->no_of_records_per_page;
    $email_mgmt_arr["total_count"]=$email_mgmt->total_record_count();
    $email_mgmt_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $email_mgmt_item=array(
            
"code" => $code,
"title" => html_entity_decode($title),
"content" => html_entity_decode($content),
"sender" => html_entity_decode($sender),
"active" => $active
        );
 
        array_push($email_mgmt_arr["records"], $email_mgmt_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show email_mgmt data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "email_mgmt found","document"=> $email_mgmt_arr));
    
}else{
 // no email_mgmt found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no email_mgmt found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No email_mgmt found.","document"=> ""));
    
}
 


