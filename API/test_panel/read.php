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
include_once '../objects/test_panel.php';
 include_once '../token/validatetoken.php';
// instantiate database and test_panel object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$test_panel = new Test_Panel($db);

$test_panel->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$test_panel->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read test_panel will be here

// query test_panel
$stmt = $test_panel->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //test_panel array
    $test_panel_arr=array();
	$test_panel_arr["pageno"]=$test_panel->pageNo;
	$test_panel_arr["pagesize"]=$test_panel->no_of_records_per_page;
    $test_panel_arr["total_count"]=$test_panel->total_record_count();
    $test_panel_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $test_panel_item=array(
            
"panel_id" => $panel_id,
"test_panel_code" => $test_panel_code,
"name" => $name,
"description" => html_entity_decode($description),
"input_type" => $input_type
        );
 
        array_push($test_panel_arr["records"], $test_panel_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show test_panel data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "test_panel found","document"=> $test_panel_arr));
    
}else{
 // no test_panel found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no test_panel found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No test_panel found.","document"=> ""));
    
}
 


