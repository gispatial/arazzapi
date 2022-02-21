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
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../objects/menu_main_item.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare menu_main_item object
$menu_main_item = new Menu_Main_Item($db);
 
// set ID property of record to read
$menu_main_item->main_id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of menu_main_item to be edited
$menu_main_item->readOne();
 
if($menu_main_item->main_id!=null){
    // create array
    $menu_main_item_arr = array(
        
"main_id" => $menu_main_item->main_id,
"item_id" => $menu_main_item->item_id,
"sort_id" => $menu_main_item->sort_id
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "menu_main_item found","document"=> $menu_main_item_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user menu_main_item does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "menu_main_item does not exist.","document"=> ""));
}
?>
