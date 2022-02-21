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
include_once '../objects/account_status.php';
 include_once '../token/validatetoken.php';
// instantiate database and account_status object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$account_status = new Account_Status($db);

$account_status->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$account_status->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read account_status will be here

// query account_status
$stmt = $account_status->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //account_status array
    $account_status_arr=array();
	$account_status_arr["pageno"]=$account_status->pageNo;
	$account_status_arr["pagesize"]=$account_status->no_of_records_per_page;
    $account_status_arr["total_count"]=$account_status->total_record_count();
    $account_status_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $account_status_item=array(
            
"acc_status_code" => $acc_status_code,
"description" => $description,
"login_status" => $login_status
        );
 
        array_push($account_status_arr["records"], $account_status_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show account_status data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "account_status found","document"=> $account_status_arr));
    
}else{
 // no account_status found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no account_status found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No account_status found.","document"=> ""));
    
}
 


