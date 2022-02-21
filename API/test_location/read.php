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
include_once '../objects/test_location.php';
 include_once '../token/validatetoken.php';
// instantiate database and test_location object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$test_location = new Test_Location($db);

$test_location->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$test_location->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read test_location will be here

// query test_location
$stmt = $test_location->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //test_location array
    $test_location_arr=array();
	$test_location_arr["pageno"]=$test_location->pageNo;
	$test_location_arr["pagesize"]=$test_location->no_of_records_per_page;
    $test_location_arr["total_count"]=$test_location->total_record_count();
    $test_location_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $test_location_item=array(
            
"code" => $code,
"name" => $name
        );
 
        array_push($test_location_arr["records"], $test_location_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show test_location data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "test_location found","document"=> $test_location_arr));
    
}else{
 // no test_location found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no test_location found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No test_location found.","document"=> ""));
    
}
 


