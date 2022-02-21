<?php
class Ref_State{
 
    // database connection and table name
    private $conn;
    private $table_name = "ref_state";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $state_code;
public $state_name;
    
 
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
	
	// read ref_state
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.state_code LIKE ? OR t.state_name LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.state_code = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->state_code);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->state_code = $row['state_code'];
$this->state_name = $row['state_name'];
	}
	
	// create ref_state
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET state_code=:state_code,state_name=:state_name";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->state_code=htmlspecialchars(strip_tags($this->state_code));
$this->state_name=htmlspecialchars(strip_tags($this->state_name));
	 
		// bind values
		
$stmt->bindParam(":state_code", $this->state_code);
$stmt->bindParam(":state_name", $this->state_name);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the ref_state
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET state_code=:state_code,state_name=:state_name WHERE state_code = :state_code";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->state_code=htmlspecialchars(strip_tags($this->state_code));
$this->state_name=htmlspecialchars(strip_tags($this->state_name));
$this->state_code=htmlspecialchars(strip_tags($this->state_code));
	 
		// bind new values
		
$stmt->bindParam(":state_code", $this->state_code);
$stmt->bindParam(":state_name", $this->state_name);
$stmt->bindParam(":state_code", $this->state_code);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the ref_state
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE state_code = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->state_code=htmlspecialchars(strip_tags($this->state_code));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->state_code);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
