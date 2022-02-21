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
include_once '../objects/menu_item.php';
 include_once '../token/validatetoken.php';
// instantiate database and menu_item object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$menu_item = new Menu_Item($db);

$menu_item->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$menu_item->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read menu_item will be here

// query menu_item
$stmt = $menu_item->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //menu_item array
    $menu_item_arr=array();
	$menu_item_arr["pageno"]=$menu_item->pageNo;
	$menu_item_arr["pagesize"]=$menu_item->no_of_records_per_page;
    $menu_item_arr["total_count"]=$menu_item->total_record_count();
    $menu_item_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $menu_item_item=array(
            
"item_id" => $item_id,
"name" => $name,
"path" => $path,
"page" => $page,
"enabled" => $enabled
        );
 
        array_push($menu_item_arr["records"], $menu_item_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show menu_item data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "menu_item found","document"=> $menu_item_arr));
    
}else{
 // no menu_item found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no menu_item found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No menu_item found.","document"=> ""));
    
}
 


