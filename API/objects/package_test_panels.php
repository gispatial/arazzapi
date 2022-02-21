<?php
class Package_Test_Panels{
 
    // database connection and table name
    private $conn;
    private $table_name = "package_test_panels";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $package_code;
public $test_panel_code;
public $test_location;
public $total_test_conducted;
public $remark;
    
 
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
	
	// read package_test_panels
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.package_code LIKE ? OR t.test_panel_code LIKE ?  OR t.test_location LIKE ?  OR t.total_test_conducted LIKE ?  OR t.remark LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind searchKey
		
$stmt->bindParam(1, $searchKey);
$stmt->bindParam(2, $searchKey);
$stmt->bindParam(3, $searchKey);
$stmt->bindParam(4, $searchKey);
$stmt->bindParam(5, $searchKey);
	 
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
$this->test_panel_code = $row['test_panel_code'];
$this->test_location = $row['test_location'];
$this->total_test_conducted = $row['total_test_conducted'];
$this->remark = $row['remark'];
	}
	
	// create package_test_panels
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET package_code=:package_code,test_panel_code=:test_panel_code,test_location=:test_location,total_test_conducted=:total_test_conducted,remark=:remark";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->package_code=htmlspecialchars(strip_tags($this->package_code));
$this->test_panel_code=htmlspecialchars(strip_tags($this->test_panel_code));
$this->test_location=htmlspecialchars(strip_tags($this->test_location));
$this->total_test_conducted=htmlspecialchars(strip_tags($this->total_test_conducted));
$this->remark=htmlspecialchars(strip_tags($this->remark));
	 
		// bind values
		
$stmt->bindParam(":package_code", $this->package_code);
$stmt->bindParam(":test_panel_code", $this->test_panel_code);
$stmt->bindParam(":test_location", $this->test_location);
$stmt->bindParam(":total_test_conducted", $this->total_test_conducted);
$stmt->bindParam(":remark", $this->remark);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the package_test_panels
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET package_code=:package_code,test_panel_code=:test_panel_code,test_location=:test_location,total_test_conducted=:total_test_conducted,remark=:remark WHERE package_code = :package_code";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->package_code=htmlspecialchars(strip_tags($this->package_code));
$this->test_panel_code=htmlspecialchars(strip_tags($this->test_panel_code));
$this->test_location=htmlspecialchars(strip_tags($this->test_location));
$this->total_test_conducted=htmlspecialchars(strip_tags($this->total_test_conducted));
$this->remark=htmlspecialchars(strip_tags($this->remark));
$this->package_code=htmlspecialchars(strip_tags($this->package_code));
	 
		// bind new values
		
$stmt->bindParam(":package_code", $this->package_code);
$stmt->bindParam(":test_panel_code", $this->test_panel_code);
$stmt->bindParam(":test_location", $this->test_location);
$stmt->bindParam(":total_test_conducted", $this->total_test_conducted);
$stmt->bindParam(":remark", $this->remark);
$stmt->bindParam(":package_code", $this->package_code);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the package_test_panels
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
