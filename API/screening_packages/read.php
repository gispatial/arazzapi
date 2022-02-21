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
include_once '../objects/screening_packages.php';
 include_once '../token/validatetoken.php';
// instantiate database and screening_packages object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$screening_packages = new Screening_Packages($db);

$screening_packages->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$screening_packages->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read screening_packages will be here

// query screening_packages
$stmt = $screening_packages->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //screening_packages array
    $screening_packages_arr=array();
	$screening_packages_arr["pageno"]=$screening_packages->pageNo;
	$screening_packages_arr["pagesize"]=$screening_packages->no_of_records_per_page;
    $screening_packages_arr["total_count"]=$screening_packages->total_record_count();
    $screening_packages_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $screening_packages_item=array(
            
"package_code" => $package_code,
"single_package" => html_entity_decode($single_package),
"category_code" => $category_code,
"picture_path" => html_entity_decode($picture_path),
"price" => $price,
"license_validity_year" => $license_validity_year,
"test_included" => html_entity_decode($test_included),
"note" => html_entity_decode($note),
"commercial" => $commercial
        );
 
        array_push($screening_packages_arr["records"], $screening_packages_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show screening_packages data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "screening_packages found","document"=> $screening_packages_arr));
    
}else{
 // no screening_packages found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no screening_packages found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No screening_packages found.","document"=> ""));
    
}
 


