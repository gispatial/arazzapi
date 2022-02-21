<?php
class Test_Group{
 
    // database connection and table name
    private $conn;
    private $table_name = "test_group";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $test_group_code;
public $group_name;
public $patient_type;
public $package_category;
public $price;
public $enabled;
    
 
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
	
	// read test_group
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.test_group_code LIKE ? OR t.group_name LIKE ?  OR t.patient_type LIKE ?  OR t.package_category LIKE ?  OR t.price LIKE ?  OR t.enabled LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind searchKey
		
$stmt->bindParam(1, $searchKey);
$stmt->bindParam(2, $searchKey);
$stmt->bindParam(3, $searchKey);
$stmt->bindParam(4, $searchKey);
$stmt->bindParam(5, $searchKey);
$stmt->bindParam(6, $searchKey);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}

	function readOne(){
	 
		// query to read single record
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.test_group_code = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->test_group_code);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->test_group_code = $row['test_group_code'];
$this->group_name = $row['group_name'];
$this->patient_type = $row['patient_type'];
$this->package_category = $row['package_category'];
$this->price = $row['price'];
$this->enabled = $row['enabled'];
	}
	
	// create test_group
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET test_group_code=:test_group_code,group_name=:group_name,patient_type=:patient_type,package_category=:package_category,price=:price,enabled=:enabled";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->test_group_code=htmlspecialchars(strip_tags($this->test_group_code));
$this->group_name=htmlspecialchars(strip_tags($this->group_name));
$this->patient_type=htmlspecialchars(strip_tags($this->patient_type));
$this->package_category=htmlspecialchars(strip_tags($this->package_category));
$this->price=htmlspecialchars(strip_tags($this->price));
$this->enabled=htmlspecialchars(strip_tags($this->enabled));
	 
		// bind values
		
$stmt->bindParam(":test_group_code", $this->test_group_code);
$stmt->bindParam(":group_name", $this->group_name);
$stmt->bindParam(":patient_type", $this->patient_type);
$stmt->bindParam(":package_category", $this->package_category);
$stmt->bindParam(":price", $this->price);
$stmt->bindParam(":enabled", $this->enabled);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the test_group
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET test_group_code=:test_group_code,group_name=:group_name,patient_type=:patient_type,package_category=:package_category,price=:price,enabled=:enabled WHERE test_group_code = :test_group_code";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->test_group_code=htmlspecialchars(strip_tags($this->test_group_code));
$this->group_name=htmlspecialchars(strip_tags($this->group_name));
$this->patient_type=htmlspecialchars(strip_tags($this->patient_type));
$this->package_category=htmlspecialchars(strip_tags($this->package_category));
$this->price=htmlspecialchars(strip_tags($this->price));
$this->enabled=htmlspecialchars(strip_tags($this->enabled));
$this->test_group_code=htmlspecialchars(strip_tags($this->test_group_code));
	 
		// bind new values
		
$stmt->bindParam(":test_group_code", $this->test_group_code);
$stmt->bindParam(":group_name", $this->group_name);
$stmt->bindParam(":patient_type", $this->patient_type);
$stmt->bindParam(":package_category", $this->package_category);
$stmt->bindParam(":price", $this->price);
$stmt->bindParam(":enabled", $this->enabled);
$stmt->bindParam(":test_group_code", $this->test_group_code);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the test_group
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE test_group_code = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->test_group_code=htmlspecialchars(strip_tags($this->test_group_code));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->test_group_code);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
