<?php
class Test_Reference_Range{
 
    // database connection and table name
    private $conn;
    private $table_name = "test_reference_range";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $test_marker_code;
public $code;
public $min;
public $max;
public $summary;
    
 
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
	
	// read test_reference_range
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.test_marker_code LIKE ? OR t.code LIKE ?  OR t.min LIKE ?  OR t.max LIKE ?  OR t.summary LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.test_marker_code = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->test_marker_code);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->test_marker_code = $row['test_marker_code'];
$this->code = $row['code'];
$this->min = $row['min'];
$this->max = $row['max'];
$this->summary = $row['summary'];
	}
	
	// create test_reference_range
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET test_marker_code=:test_marker_code,code=:code,min=:min,max=:max,summary=:summary";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->test_marker_code=htmlspecialchars(strip_tags($this->test_marker_code));
$this->code=htmlspecialchars(strip_tags($this->code));
$this->min=htmlspecialchars(strip_tags($this->min));
$this->max=htmlspecialchars(strip_tags($this->max));
$this->summary=htmlspecialchars(strip_tags($this->summary));
	 
		// bind values
		
$stmt->bindParam(":test_marker_code", $this->test_marker_code);
$stmt->bindParam(":code", $this->code);
$stmt->bindParam(":min", $this->min);
$stmt->bindParam(":max", $this->max);
$stmt->bindParam(":summary", $this->summary);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the test_reference_range
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET test_marker_code=:test_marker_code,code=:code,min=:min,max=:max,summary=:summary WHERE test_marker_code = :test_marker_code";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->test_marker_code=htmlspecialchars(strip_tags($this->test_marker_code));
$this->code=htmlspecialchars(strip_tags($this->code));
$this->min=htmlspecialchars(strip_tags($this->min));
$this->max=htmlspecialchars(strip_tags($this->max));
$this->summary=htmlspecialchars(strip_tags($this->summary));
$this->test_marker_code=htmlspecialchars(strip_tags($this->test_marker_code));
	 
		// bind new values
		
$stmt->bindParam(":test_marker_code", $this->test_marker_code);
$stmt->bindParam(":code", $this->code);
$stmt->bindParam(":min", $this->min);
$stmt->bindParam(":max", $this->max);
$stmt->bindParam(":summary", $this->summary);
$stmt->bindParam(":test_marker_code", $this->test_marker_code);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the test_reference_range
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE test_marker_code = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->test_marker_code=htmlspecialchars(strip_tags($this->test_marker_code));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->test_marker_code);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
