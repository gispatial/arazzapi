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
include_once '../objects/account_id.php';
 include_once '../token/validatetoken.php';
// instantiate database and account_id object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$account_id = new Account_Id($db);

$account_id->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$account_id->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read account_id will be here

// query account_id
$stmt = $account_id->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //account_id array
    $account_id_arr=array();
	$account_id_arr["pageno"]=$account_id->pageNo;
	$account_id_arr["pagesize"]=$account_id->no_of_records_per_page;
    $account_id_arr["total_count"]=$account_id->total_record_count();
    $account_id_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $account_id_item=array(
            
"id" => $id
        );
 
        array_push($account_id_arr["records"], $account_id_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show account_id data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "account_id found","document"=> $account_id_arr));
    
}else{
 // no account_id found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no account_id found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No account_id found.","document"=> ""));
    
}
 


