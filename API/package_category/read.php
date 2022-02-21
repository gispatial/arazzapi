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
include_once '../objects/package_category.php';
 include_once '../token/validatetoken.php';
// instantiate database and package_category object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$package_category = new Package_Category($db);

$package_category->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$package_category->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read package_category will be here

// query package_category
$stmt = $package_category->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //package_category array
    $package_category_arr=array();
	$package_category_arr["pageno"]=$package_category->pageNo;
	$package_category_arr["pagesize"]=$package_category->no_of_records_per_page;
    $package_category_arr["total_count"]=$package_category->total_record_count();
    $package_category_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $package_category_item=array(
            
"category_code" => $category_code,
"description" => html_entity_decode($description),
"prefix" => $prefix,
"picture_path" => html_entity_decode($picture_path),
"show_display" => $show_display
        );
 
        array_push($package_category_arr["records"], $package_category_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show package_category data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "package_category found","document"=> $package_category_arr));
    
}else{
 // no package_category found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no package_category found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No package_category found.","document"=> ""));
    
}
 


