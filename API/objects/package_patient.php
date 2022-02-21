<?php
class Package_Patient{
 
    // database connection and table name
    private $conn;
    private $table_name = "package_patient";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $package_code;
public $patient_type_code;
public $total_patient;
public $doc_required;
    
 
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
	
	// read package_patient
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.package_code LIKE ? OR t.patient_type_code LIKE ?  OR t.total_patient LIKE ?  OR t.doc_required LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
$this->patient_type_code = $row['patient_type_code'];
$this->total_patient = $row['total_patient'];
$this->doc_required = $row['doc_required'];
	}
	
	// create package_patient
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET package_code=:package_code,patient_type_code=:patient_type_code,total_patient=:total_patient,doc_required=:doc_required";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->package_code=htmlspecialchars(strip_tags($this->package_code));
$this->patient_type_code=htmlspecialchars(strip_tags($this->patient_type_code));
$this->total_patient=htmlspecialchars(strip_tags($this->total_patient));
$this->doc_required=htmlspecialchars(strip_tags($this->doc_required));
	 
		// bind values
		
$stmt->bindParam(":package_code", $this->package_code);
$stmt->bindParam(":patient_type_code", $this->patient_type_code);
$stmt->bindParam(":total_patient", $this->total_patient);
$stmt->bindParam(":doc_required", $this->doc_required);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the package_patient
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET package_code=:package_code,patient_type_code=:patient_type_code,total_patient=:total_patient,doc_required=:doc_required WHERE package_code = :package_code";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->package_code=htmlspecialchars(strip_tags($this->package_code));
$this->patient_type_code=htmlspecialchars(strip_tags($this->patient_type_code));
$this->total_patient=htmlspecialchars(strip_tags($this->total_patient));
$this->doc_required=htmlspecialchars(strip_tags($this->doc_required));
$this->package_code=htmlspecialchars(strip_tags($this->package_code));
	 
		// bind new values
		
$stmt->bindParam(":package_code", $this->package_code);
$stmt->bindParam(":patient_type_code", $this->patient_type_code);
$stmt->bindParam(":total_patient", $this->total_patient);
$stmt->bindParam(":doc_required", $this->doc_required);
$stmt->bindParam(":package_code", $this->package_code);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the package_patient
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
