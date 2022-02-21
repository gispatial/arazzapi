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
include_once '../objects/menu_main.php';
 include_once '../token/validatetoken.php';
// instantiate database and menu_main object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$menu_main = new Menu_Main($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$menu_main->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$menu_main->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query menu_main
$stmt = $menu_main->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //menu_main array
    $menu_main_arr=array();
	$menu_main_arr["pageno"]=$menu_main->pageNo;
	$menu_main_arr["pagesize"]=$menu_main->no_of_records_per_page;
    $menu_main_arr["total_count"]=$menu_main->total_record_count();
    $menu_main_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $menu_main_item=array(
            
"main_id" => $main_id,
"title" => html_entity_decode($title),
"owner" => $owner
        );
 
        array_push($menu_main_arr["records"], $menu_main_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show menu_main data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "menu_main found","document"=> $menu_main_arr));
    
}else{
 // no menu_main found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no menu_main found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No menu_main found.","document"=> ""));
    
}
 


