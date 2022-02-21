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
include_once '../objects/test_reference_range.php';
 include_once '../token/validatetoken.php';
// instantiate database and test_reference_range object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$test_reference_range = new Test_Reference_Range($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$test_reference_range->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$test_reference_range->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query test_reference_range
$stmt = $test_reference_range->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //test_reference_range array
    $test_reference_range_arr=array();
	$test_reference_range_arr["pageno"]=$test_reference_range->pageNo;
	$test_reference_range_arr["pagesize"]=$test_reference_range->no_of_records_per_page;
    $test_reference_range_arr["total_count"]=$test_reference_range->total_record_count();
    $test_reference_range_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $test_reference_range_item=array(
            
"test_marker_code" => $test_marker_code,
"code" => $code,
"min" => $min,
"max" => $max,
"summary" => html_entity_decode($summary)
        );
 
        array_push($test_reference_range_arr["records"], $test_reference_range_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show test_reference_range data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "test_reference_range found","document"=> $test_reference_range_arr));
    
}else{
 // no test_reference_range found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no test_reference_range found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No test_reference_range found.","document"=> ""));
    
}
 


