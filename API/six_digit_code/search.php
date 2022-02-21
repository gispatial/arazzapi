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
include_once '../objects/six_digit_code.php';
 include_once '../token/validatetoken.php';
// instantiate database and six_digit_code object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$six_digit_code = new Six_Digit_Code($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$six_digit_code->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$six_digit_code->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query six_digit_code
$stmt = $six_digit_code->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //six_digit_code array
    $six_digit_code_arr=array();
	$six_digit_code_arr["pageno"]=$six_digit_code->pageNo;
	$six_digit_code_arr["pagesize"]=$six_digit_code->no_of_records_per_page;
    $six_digit_code_arr["total_count"]=$six_digit_code->total_record_count();
    $six_digit_code_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $six_digit_code_item=array(
            
"code" => $code,
"mobile" => $mobile,
"expired" => $expired,
"date_sent" => $date_sent
        );
 
        array_push($six_digit_code_arr["records"], $six_digit_code_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show six_digit_code data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "six_digit_code found","document"=> $six_digit_code_arr));
    
}else{
 // no six_digit_code found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no six_digit_code found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No six_digit_code found.","document"=> ""));
    
}
 


