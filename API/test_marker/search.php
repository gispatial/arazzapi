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
include_once '../objects/test_marker.php';
 include_once '../token/validatetoken.php';
// instantiate database and test_marker object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$test_marker = new Test_Marker($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$test_marker->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$test_marker->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query test_marker
$stmt = $test_marker->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //test_marker array
    $test_marker_arr=array();
	$test_marker_arr["pageno"]=$test_marker->pageNo;
	$test_marker_arr["pagesize"]=$test_marker->no_of_records_per_page;
    $test_marker_arr["total_count"]=$test_marker->total_record_count();
    $test_marker_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $test_marker_item=array(
            
"test_panel_code" => $test_panel_code,
"code" => $code,
"name" => $name,
"description" => html_entity_decode($description),
"unit" => $unit,
"data_format" => $data_format
        );
 
        array_push($test_marker_arr["records"], $test_marker_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show test_marker data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "test_marker found","document"=> $test_marker_arr));
    
}else{
 // no test_marker found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no test_marker found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No test_marker found.","document"=> ""));
    
}
 


