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
include_once '../objects/test_result.php';
 include_once '../token/validatetoken.php';
// instantiate database and test_result object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$test_result = new Test_Result($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$test_result->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$test_result->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query test_result
$stmt = $test_result->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //test_result array
    $test_result_arr=array();
	$test_result_arr["pageno"]=$test_result->pageNo;
	$test_result_arr["pagesize"]=$test_result->no_of_records_per_page;
    $test_result_arr["total_count"]=$test_result->total_record_count();
    $test_result_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $test_result_item=array(
            
"patient_ic_no" => $patient_ic_no,
"reg_no" => $reg_no,
"booking_no" => $booking_no,
"test_date" => $test_date,
"test_panel_code" => $test_panel_code,
"test_marker_code" => $test_marker_code,
"test_value" => $test_value,
"source" => $source,
"date_updated" => $date_updated
        );
 
        array_push($test_result_arr["records"], $test_result_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show test_result data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "test_result found","document"=> $test_result_arr));
    
}else{
 // no test_result found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no test_result found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No test_result found.","document"=> ""));
    
}
 


