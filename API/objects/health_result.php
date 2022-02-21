<?php
class Health_Result{
 
    // database connection and table name
    private $conn;
    private $table_name = "health_result";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $refno;
public $result_name;
public $result_value;
public $month;
    
 
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
	
	// read health_result
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.refno LIKE ? OR t.result_name LIKE ?  OR t.result_value LIKE ?  OR t.month LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind searchKey
		
$stmt->bindParam(1, $searchKey);
$stmt->bindParam(2, $searchKey);
$stmt->bindParam(3, $searchKey);
$stmt->bindParam(4, $searchKey);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}

	function readOne(){
	 
		// query to read single record
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.refno = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->refno);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->refno = $row['refno'];
$this->result_name = $row['result_name'];
$this->result_value = $row['result_value'];
$this->month = $row['month'];
	}
	
	// create health_result
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET refno=:refno,result_name=:result_name,result_value=:result_value,month=:month";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->refno=htmlspecialchars(strip_tags($this->refno));
$this->result_name=htmlspecialchars(strip_tags($this->result_name));
$this->result_value=htmlspecialchars(strip_tags($this->result_value));
$this->month=htmlspecialchars(strip_tags($this->month));
	 
		// bind values
		
$stmt->bindParam(":refno", $this->refno);
$stmt->bindParam(":result_name", $this->result_name);
$stmt->bindParam(":result_value", $this->result_value);
$stmt->bindParam(":month", $this->month);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the health_result
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET refno=:refno,result_name=:result_name,result_value=:result_value,month=:month WHERE refno = :refno";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->refno=htmlspecialchars(strip_tags($this->refno));
$this->result_name=htmlspecialchars(strip_tags($this->result_name));
$this->result_value=htmlspecialchars(strip_tags($this->result_value));
$this->month=htmlspecialchars(strip_tags($this->month));
$this->refno=htmlspecialchars(strip_tags($this->refno));
	 
		// bind new values
		
$stmt->bindParam(":refno", $this->refno);
$stmt->bindParam(":result_name", $this->result_name);
$stmt->bindParam(":result_value", $this->result_value);
$stmt->bindParam(":month", $this->month);
$stmt->bindParam(":refno", $this->refno);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the health_result
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE refno = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->refno=htmlspecialchars(strip_tags($this->refno));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->refno);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
