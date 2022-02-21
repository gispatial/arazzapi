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
include_once '../objects/ref_relationship.php';
 include_once '../token/validatetoken.php';
// instantiate database and ref_relationship object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$ref_relationship = new Ref_Relationship($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$ref_relationship->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$ref_relationship->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query ref_relationship
$stmt = $ref_relationship->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //ref_relationship array
    $ref_relationship_arr=array();
	$ref_relationship_arr["pageno"]=$ref_relationship->pageNo;
	$ref_relationship_arr["pagesize"]=$ref_relationship->no_of_records_per_page;
    $ref_relationship_arr["total_count"]=$ref_relationship->total_record_count();
    $ref_relationship_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $ref_relationship_item=array(
            
"code" => $code,
"description" => html_entity_decode($description)
        );
 
        array_push($ref_relationship_arr["records"], $ref_relationship_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show ref_relationship data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "ref_relationship found","document"=> $ref_relationship_arr));
    
}else{
 // no ref_relationship found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no ref_relationship found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No ref_relationship found.","document"=> ""));
    
}
 


