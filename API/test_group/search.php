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
include_once '../objects/test_group.php';
 include_once '../token/validatetoken.php';
// instantiate database and test_group object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$test_group = new Test_Group($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$test_group->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$test_group->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query test_group
$stmt = $test_group->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //test_group array
    $test_group_arr=array();
	$test_group_arr["pageno"]=$test_group->pageNo;
	$test_group_arr["pagesize"]=$test_group->no_of_records_per_page;
    $test_group_arr["total_count"]=$test_group->total_record_count();
    $test_group_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $test_group_item=array(
            
"test_group_code" => $test_group_code,
"group_name" => $group_name,
"patient_type" => $patient_type,
"package_category" => $package_category,
"price" => $price,
"enabled" => $enabled
        );
 
        array_push($test_group_arr["records"], $test_group_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show test_group data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "test_group found","document"=> $test_group_arr));
    
}else{
 // no test_group found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no test_group found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No test_group found.","document"=> ""));
    
}
 


