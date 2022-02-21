<?php
class Patient_Type{
 
    // database connection and table name
    private $conn;
    private $table_name = "patient_type";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $patient_type_code;
public $name;
public $min_age;
public $max_age;
    
 
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
	
	// read patient_type
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.patient_type_code LIKE ? OR t.name LIKE ?  OR t.min_age LIKE ?  OR t.max_age LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.patient_type_code = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->patient_type_code);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->patient_type_code = $row['patient_type_code'];
$this->name = $row['name'];
$this->min_age = $row['min_age'];
$this->max_age = $row['max_age'];
	}
	
	// create patient_type
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET patient_type_code=:patient_type_code,name=:name,min_age=:min_age,max_age=:max_age";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->patient_type_code=htmlspecialchars(strip_tags($this->patient_type_code));
$this->name=htmlspecialchars(strip_tags($this->name));
$this->min_age=htmlspecialchars(strip_tags($this->min_age));
$this->max_age=htmlspecialchars(strip_tags($this->max_age));
	 
		// bind values
		
$stmt->bindParam(":patient_type_code", $this->patient_type_code);
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":min_age", $this->min_age);
$stmt->bindParam(":max_age", $this->max_age);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the patient_type
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET patient_type_code=:patient_type_code,name=:name,min_age=:min_age,max_age=:max_age WHERE patient_type_code = :patient_type_code";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->patient_type_code=htmlspecialchars(strip_tags($this->patient_type_code));
$this->name=htmlspecialchars(strip_tags($this->name));
$this->min_age=htmlspecialchars(strip_tags($this->min_age));
$this->max_age=htmlspecialchars(strip_tags($this->max_age));
$this->patient_type_code=htmlspecialchars(strip_tags($this->patient_type_code));
	 
		// bind new values
		
$stmt->bindParam(":patient_type_code", $this->patient_type_code);
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":min_age", $this->min_age);
$stmt->bindParam(":max_age", $this->max_age);
$stmt->bindParam(":patient_type_code", $this->patient_type_code);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the patient_type
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE patient_type_code = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->patient_type_code=htmlspecialchars(strip_tags($this->patient_type_code));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->patient_type_code);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
