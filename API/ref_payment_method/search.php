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
include_once '../objects/ref_payment_method.php';
 include_once '../token/validatetoken.php';
// instantiate database and ref_payment_method object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$ref_payment_method = new Ref_Payment_Method($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$ref_payment_method->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$ref_payment_method->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query ref_payment_method
$stmt = $ref_payment_method->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //ref_payment_method array
    $ref_payment_method_arr=array();
	$ref_payment_method_arr["pageno"]=$ref_payment_method->pageNo;
	$ref_payment_method_arr["pagesize"]=$ref_payment_method->no_of_records_per_page;
    $ref_payment_method_arr["total_count"]=$ref_payment_method->total_record_count();
    $ref_payment_method_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $ref_payment_method_item=array(
            
"code" => $code,
"description" => html_entity_decode($description)
        );
 
        array_push($ref_payment_method_arr["records"], $ref_payment_method_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show ref_payment_method data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "ref_payment_method found","document"=> $ref_payment_method_arr));
    
}else{
 // no ref_payment_method found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no ref_payment_method found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No ref_payment_method found.","document"=> ""));
    
}
 


