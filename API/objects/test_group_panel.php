<?php
class Test_Group_Panel{
 
    // database connection and table name
    private $conn;
    private $table_name = "test_group_panel";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $test_group_code;
public $test_panel_code;
    
 
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
	
	// read test_group_panel
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.test_group_code LIKE ? OR t.test_panel_code LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind searchKey
		
$stmt->bindParam(1, $searchKey);
$stmt->bindParam(2, $searchKey);
	 
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
$this->test_panel_code = $row['test_panel_code'];
	}
	
	// create test_group_panel
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET test_group_code=:test_group_code,test_panel_code=:test_panel_code";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->test_group_code=htmlspecialchars(strip_tags($this->test_group_code));
$this->test_panel_code=htmlspecialchars(strip_tags($this->test_panel_code));
	 
		// bind values
		
$stmt->bindParam(":test_group_code", $this->test_group_code);
$stmt->bindParam(":test_panel_code", $this->test_panel_code);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the test_group_panel
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET test_group_code=:test_group_code,test_panel_code=:test_panel_code WHERE test_group_code = :test_group_code";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->test_group_code=htmlspecialchars(strip_tags($this->test_group_code));
$this->test_panel_code=htmlspecialchars(strip_tags($this->test_panel_code));
$this->test_group_code=htmlspecialchars(strip_tags($this->test_group_code));
	 
		// bind new values
		
$stmt->bindParam(":test_group_code", $this->test_group_code);
$stmt->bindParam(":test_panel_code", $this->test_panel_code);
$stmt->bindParam(":test_group_code", $this->test_group_code);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the test_group_panel
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
