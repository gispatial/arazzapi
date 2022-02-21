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
include_once '../objects/health_result.php';
 include_once '../token/validatetoken.php';
// instantiate database and health_result object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$health_result = new Health_Result($db);

$health_result->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$health_result->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read health_result will be here

// query health_result
$stmt = $health_result->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //health_result array
    $health_result_arr=array();
	$health_result_arr["pageno"]=$health_result->pageNo;
	$health_result_arr["pagesize"]=$health_result->no_of_records_per_page;
    $health_result_arr["total_count"]=$health_result->total_record_count();
    $health_result_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $health_result_item=array(
            
"refno" => $refno,
"result_name" => $result_name,
"result_value" => $result_value,
"month" => $month
        );
 
        array_push($health_result_arr["records"], $health_result_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show health_result data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "health_result found","document"=> $health_result_arr));
    
}else{
 // no health_result found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no health_result found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No health_result found.","document"=> ""));
    
}
 


