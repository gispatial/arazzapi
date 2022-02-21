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
include_once '../objects/package_test_groups.php';
 include_once '../token/validatetoken.php';
// instantiate database and package_test_groups object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$package_test_groups = new Package_Test_Groups($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$package_test_groups->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$package_test_groups->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query package_test_groups
$stmt = $package_test_groups->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //package_test_groups array
    $package_test_groups_arr=array();
	$package_test_groups_arr["pageno"]=$package_test_groups->pageNo;
	$package_test_groups_arr["pagesize"]=$package_test_groups->no_of_records_per_page;
    $package_test_groups_arr["total_count"]=$package_test_groups->total_record_count();
    $package_test_groups_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $package_test_groups_item=array(
            
"package_code" => $package_code,
"test_group_code" => $test_group_code,
"test_location" => $test_location,
"total_test_conducted" => $total_test_conducted,
"remark" => html_entity_decode($remark)
        );
 
        array_push($package_test_groups_arr["records"], $package_test_groups_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show package_test_groups data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "package_test_groups found","document"=> $package_test_groups_arr));
    
}else{
 // no package_test_groups found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no package_test_groups found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No package_test_groups found.","document"=> ""));
    
}
 


