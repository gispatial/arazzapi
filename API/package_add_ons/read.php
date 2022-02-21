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
include_once '../objects/package_add_ons.php';
 include_once '../token/validatetoken.php';
// instantiate database and package_add_ons object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$package_add_ons = new Package_Add_Ons($db);

$package_add_ons->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$package_add_ons->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read package_add_ons will be here

// query package_add_ons
$stmt = $package_add_ons->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //package_add_ons array
    $package_add_ons_arr=array();
	$package_add_ons_arr["pageno"]=$package_add_ons->pageNo;
	$package_add_ons_arr["pagesize"]=$package_add_ons->no_of_records_per_page;
    $package_add_ons_arr["total_count"]=$package_add_ons->total_record_count();
    $package_add_ons_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $package_add_ons_item=array(
            
"package_code" => $package_code,
"add_on_code" => $add_on_code,
"add_on_name" => html_entity_decode($add_on_name),
"test_location_code" => $test_location_code,
"test_location_name" => $test_location_name,
"total_test_conducted" => $total_test_conducted,
"patient_type_code" => $patient_type_code
        );
 
        array_push($package_add_ons_arr["records"], $package_add_ons_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show package_add_ons data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "package_add_ons found","document"=> $package_add_ons_arr));
    
}else{
 // no package_add_ons found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no package_add_ons found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No package_add_ons found.","document"=> ""));
    
}
 


