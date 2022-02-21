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
include_once '../objects/account_type_2.php';
 include_once '../token/validatetoken.php';
// instantiate database and account_type_2 object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$account_type_2 = new Account_Type_2($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$account_type_2->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$account_type_2->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query account_type_2
$stmt = $account_type_2->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //account_type_2 array
    $account_type_2_arr=array();
	$account_type_2_arr["pageno"]=$account_type_2->pageNo;
	$account_type_2_arr["pagesize"]=$account_type_2->no_of_records_per_page;
    $account_type_2_arr["total_count"]=$account_type_2->total_record_count();
    $account_type_2_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $account_type_2_item=array(
            
"id" => $id,
"name" => $name,
"status" => $status,
"type_group" => $type_group
        );
 
        array_push($account_type_2_arr["records"], $account_type_2_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show account_type_2 data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "account_type_2 found","document"=> $account_type_2_arr));
    
}else{
 // no account_type_2 found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no account_type_2 found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No account_type_2 found.","document"=> ""));
    
}
 


