<?php
class Package_Add_Ons{
 
    // database connection and table name
    private $conn;
    private $table_name = "package_add_ons";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $package_code;
public $add_on_code;
public $add_on_name;
public $test_location_code;
public $test_location_name;
public $total_test_conducted;
public $patient_type_code;
    
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

	function total_record_count() {
	$query = "select count(1) as total from ". $this->table_name ."";
	$stmt = $this->conn->prepare($query);
	$stmt->execute();
	$row = $stmt->fetch(PDO::FETCH_ASSOC);
	return $row['total'];
	}
	
	// read package_add_ons
	function read(){
		if(isset($_GET["pageNo"])){
		$this->pageNo=$_GET["pageNo"];
		}
		$offset = ($this->pageNo-1) * $this->no_of_records_per_page; 
		// select all query
		$query = "SELECT  t.* FROM ". $this->table_name ." t  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}
	//Search table
	function search($searchKey){
		if(isset($_GET["pageNo"])){
		$this->pageNo=$_GET["pageNo"];
		}
		$offset = ($this->pageNo-1) * $this->no_of_records_per_page; 

		// select all query
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.package_code LIKE ? OR t.add_on_code LIKE ?  OR t.add_on_name LIKE ?  OR t.test_location_code LIKE ?  OR t.test_location_name LIKE ?  OR t.total_test_conducted LIKE ?  OR t.patient_type_code LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind searchKey
		
$stmt->bindParam(1, $searchKey);
$stmt->bindParam(2, $searchKey);
$stmt->bindParam(3, $searchKey);
$stmt->bindParam(4, $searchKey);
$stmt->bindParam(5, $searchKey);
$stmt->bindParam(6, $searchKey);
$stmt->bindParam(7, $searchKey);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}

	function readOne(){
	 
		// query to read single record
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.package_code = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->package_code);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->package_code = $row['package_code'];
$this->add_on_code = $row['add_on_code'];
$this->add_on_name = $row['add_on_name'];
$this->test_location_code = $row['test_location_code'];
$this->test_location_name = $row['test_location_name'];
$this->total_test_conducted = $row['total_test_conducted'];
$this->patient_type_code = $row['patient_type_code'];
	}
	
	// create package_add_ons
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET package_code=:package_code,add_on_code=:add_on_code,add_on_name=:add_on_name,test_location_code=:test_location_code,test_location_name=:test_location_name,total_test_conducted=:total_test_conducted,patient_type_code=:patient_type_code";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->package_code=htmlspecialchars(strip_tags($this->package_code));
$this->add_on_code=htmlspecialchars(strip_tags($this->add_on_code));
$this->add_on_name=htmlspecialchars(strip_tags($this->add_on_name));
$this->test_location_code=htmlspecialchars(strip_tags($this->test_location_code));
$this->test_location_name=htmlspecialchars(strip_tags($this->test_location_name));
$this->total_test_conducted=htmlspecialchars(strip_tags($this->total_test_conducted));
$this->patient_type_code=htmlspecialchars(strip_tags($this->patient_type_code));
	 
		// bind values
		
$stmt->bindParam(":package_code", $this->package_code);
$stmt->bindParam(":add_on_code", $this->add_on_code);
$stmt->bindParam(":add_on_name", $this->add_on_name);
$stmt->bindParam(":test_location_code", $this->test_location_code);
$stmt->bindParam(":test_location_name", $this->test_location_name);
$stmt->bindParam(":total_test_conducted", $this->total_test_conducted);
$stmt->bindParam(":patient_type_code", $this->patient_type_code);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the package_add_ons
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET package_code=:package_code,add_on_code=:add_on_code,add_on_name=:add_on_name,test_location_code=:test_location_code,test_location_name=:test_location_name,total_test_conducted=:total_test_conducted,patient_type_code=:patient_type_code WHERE package_code = :package_code";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->package_code=htmlspecialchars(strip_tags($this->package_code));
$this->add_on_code=htmlspecialchars(strip_tags($this->add_on_code));
$this->add_on_name=htmlspecialchars(strip_tags($this->add_on_name));
$this->test_location_code=htmlspecialchars(strip_tags($this->test_location_code));
$this->test_location_name=htmlspecialchars(strip_tags($this->test_location_name));
$this->total_test_conducted=htmlspecialchars(strip_tags($this->total_test_conducted));
$this->patient_type_code=htmlspecialchars(strip_tags($this->patient_type_code));
$this->package_code=htmlspecialchars(strip_tags($this->package_code));
	 
		// bind new values
		
$stmt->bindParam(":package_code", $this->package_code);
$stmt->bindParam(":add_on_code", $this->add_on_code);
$stmt->bindParam(":add_on_name", $this->add_on_name);
$stmt->bindParam(":test_location_code", $this->test_location_code);
$stmt->bindParam(":test_location_name", $this->test_location_name);
$stmt->bindParam(":total_test_conducted", $this->total_test_conducted);
$stmt->bindParam(":patient_type_code", $this->patient_type_code);
$stmt->bindParam(":package_code", $this->package_code);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the package_add_ons
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE package_code = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->package_code=htmlspecialchars(strip_tags($this->package_code));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->package_code);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
