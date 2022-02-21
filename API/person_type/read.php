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
include_once '../objects/person_type.php';
 include_once '../token/validatetoken.php';
// instantiate database and person_type object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$person_type = new Person_Type($db);

$person_type->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$person_type->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read person_type will be here

// query person_type
$stmt = $person_type->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //person_type array
    $person_type_arr=array();
	$person_type_arr["pageno"]=$person_type->pageNo;
	$person_type_arr["pagesize"]=$person_type->no_of_records_per_page;
    $person_type_arr["total_count"]=$person_type->total_record_count();
    $person_type_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $person_type_item=array(
            
"id" => $id,
"name" => $name,
"status" => $status,
"type_group" => $type_group
        );
 
        array_push($person_type_arr["records"], $person_type_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show person_type data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "person_type found","document"=> $person_type_arr));
    
}else{
 // no person_type found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no person_type found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No person_type found.","document"=> ""));
    
}
 


