<?php
class Registration_Person{
 
    // database connection and table name
    private $conn;
    private $table_name = "registration_person";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $reg_no;
public $ic_no;
public $username;
public $person_type_code;
public $admin_type;
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
	
	// read registration_person
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.reg_no LIKE ? OR t.ic_no LIKE ?  OR t.username LIKE ?  OR t.person_type_code LIKE ?  OR t.admin_type LIKE ?  OR t.patient_type_code LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.reg_no = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->reg_no);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->reg_no = $row['reg_no'];
$this->ic_no = $row['ic_no'];
$this->username = $row['username'];
$this->person_type_code = $row['person_type_code'];
$this->admin_type = $row['admin_type'];
$this->patient_type_code = $row['patient_type_code'];
	}
	
	// create registration_person
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET reg_no=:reg_no,ic_no=:ic_no,username=:username,person_type_code=:person_type_code,admin_type=:admin_type,patient_type_code=:patient_type_code";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->reg_no=htmlspecialchars(strip_tags($this->reg_no));
$this->ic_no=htmlspecialchars(strip_tags($this->ic_no));
$this->username=htmlspecialchars(strip_tags($this->username));
$this->person_type_code=htmlspecialchars(strip_tags($this->person_type_code));
$this->admin_type=htmlspecialchars(strip_tags($this->admin_type));
$this->patient_type_code=htmlspecialchars(strip_tags($this->patient_type_code));
	 
		// bind values
		
$stmt->bindParam(":reg_no", $this->reg_no);
$stmt->bindParam(":ic_no", $this->ic_no);
$stmt->bindParam(":username", $this->username);
$stmt->bindParam(":person_type_code", $this->person_type_code);
$stmt->bindParam(":admin_type", $this->admin_type);
$stmt->bindParam(":patient_type_code", $this->patient_type_code);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the registration_person
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET reg_no=:reg_no,ic_no=:ic_no,username=:username,person_type_code=:person_type_code,admin_type=:admin_type,patient_type_code=:patient_type_code WHERE reg_no = :reg_no";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->reg_no=htmlspecialchars(strip_tags($this->reg_no));
$this->ic_no=htmlspecialchars(strip_tags($this->ic_no));
$this->username=htmlspecialchars(strip_tags($this->username));
$this->person_type_code=htmlspecialchars(strip_tags($this->person_type_code));
$this->admin_type=htmlspecialchars(strip_tags($this->admin_type));
$this->patient_type_code=htmlspecialchars(strip_tags($this->patient_type_code));
$this->reg_no=htmlspecialchars(strip_tags($this->reg_no));
	 
		// bind new values
		
$stmt->bindParam(":reg_no", $this->reg_no);
$stmt->bindParam(":ic_no", $this->ic_no);
$stmt->bindParam(":username", $this->username);
$stmt->bindParam(":person_type_code", $this->person_type_code);
$stmt->bindParam(":admin_type", $this->admin_type);
$stmt->bindParam(":patient_type_code", $this->patient_type_code);
$stmt->bindParam(":reg_no", $this->reg_no);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the registration_person
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE reg_no = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->reg_no=htmlspecialchars(strip_tags($this->reg_no));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->reg_no);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
