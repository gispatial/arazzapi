<?php
class Medication_Prescription{
 
    // database connection and table name
    private $conn;
    private $table_name = "medication_prescription";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $medication_id;
public $doctor_id;
public $patient_id;
public $no;
public $date;
    
 
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
	
	// read medication_prescription
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.medication_id LIKE ? OR t.doctor_id LIKE ?  OR t.patient_id LIKE ?  OR t.no LIKE ?  OR t.date LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.ERROR_NOPRIMARYKEYFOUND = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->ERROR_NOPRIMARYKEYFOUND);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->medication_id = $row['medication_id'];
$this->doctor_id = $row['doctor_id'];
$this->patient_id = $row['patient_id'];
$this->no = $row['no'];
$this->date = $row['date'];
	}
	
	// create medication_prescription
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET medication_id=:medication_id,doctor_id=:doctor_id,patient_id=:patient_id,no=:no,date=:date";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->medication_id=htmlspecialchars(strip_tags($this->medication_id));
$this->doctor_id=htmlspecialchars(strip_tags($this->doctor_id));
$this->patient_id=htmlspecialchars(strip_tags($this->patient_id));
$this->no=htmlspecialchars(strip_tags($this->no));
$this->date=htmlspecialchars(strip_tags($this->date));
	 
		// bind values
		
$stmt->bindParam(":medication_id", $this->medication_id);
$stmt->bindParam(":doctor_id", $this->doctor_id);
$stmt->bindParam(":patient_id", $this->patient_id);
$stmt->bindParam(":no", $this->no);
$stmt->bindParam(":date", $this->date);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the medication_prescription
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET medication_id=:medication_id,doctor_id=:doctor_id,patient_id=:patient_id,no=:no,date=:date WHERE ERROR_NOPRIMARYKEYFOUND = :ERROR_NOPRIMARYKEYFOUND";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->medication_id=htmlspecialchars(strip_tags($this->medication_id));
$this->doctor_id=htmlspecialchars(strip_tags($this->doctor_id));
$this->patient_id=htmlspecialchars(strip_tags($this->patient_id));
$this->no=htmlspecialchars(strip_tags($this->no));
$this->date=htmlspecialchars(strip_tags($this->date));
$this->ERROR_NOPRIMARYKEYFOUND=htmlspecialchars(strip_tags($this->ERROR_NOPRIMARYKEYFOUND));
	 
		// bind new values
		
$stmt->bindParam(":medication_id", $this->medication_id);
$stmt->bindParam(":doctor_id", $this->doctor_id);
$stmt->bindParam(":patient_id", $this->patient_id);
$stmt->bindParam(":no", $this->no);
$stmt->bindParam(":date", $this->date);
$stmt->bindParam(":ERROR_NOPRIMARYKEYFOUND", $this->ERROR_NOPRIMARYKEYFOUND);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the medication_prescription
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE ERROR_NOPRIMARYKEYFOUND = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->ERROR_NOPRIMARYKEYFOUND=htmlspecialchars(strip_tags($this->ERROR_NOPRIMARYKEYFOUND));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->ERROR_NOPRIMARYKEYFOUND);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
