<?php
class Account_Status{
 
    // database connection and table name
    private $conn;
    private $table_name = "account_status";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $acc_status_code;
public $description;
public $login_status;
    
 
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
	
	// read account_status
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.acc_status_code LIKE ? OR t.description LIKE ?  OR t.login_status LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind searchKey
		
$stmt->bindParam(1, $searchKey);
$stmt->bindParam(2, $searchKey);
$stmt->bindParam(3, $searchKey);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}

	function readOne(){
	 
		// query to read single record
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.acc_status_code = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->acc_status_code);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->acc_status_code = $row['acc_status_code'];
$this->description = $row['description'];
$this->login_status = $row['login_status'];
	}
	
	// create account_status
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET acc_status_code=:acc_status_code,description=:description,login_status=:login_status";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->acc_status_code=htmlspecialchars(strip_tags($this->acc_status_code));
$this->description=htmlspecialchars(strip_tags($this->description));
$this->login_status=htmlspecialchars(strip_tags($this->login_status));
	 
		// bind values
		
$stmt->bindParam(":acc_status_code", $this->acc_status_code);
$stmt->bindParam(":description", $this->description);
$stmt->bindParam(":login_status", $this->login_status);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the account_status
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET acc_status_code=:acc_status_code,description=:description,login_status=:login_status WHERE acc_status_code = :acc_status_code";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->acc_status_code=htmlspecialchars(strip_tags($this->acc_status_code));
$this->description=htmlspecialchars(strip_tags($this->description));
$this->login_status=htmlspecialchars(strip_tags($this->login_status));
$this->acc_status_code=htmlspecialchars(strip_tags($this->acc_status_code));
	 
		// bind new values
		
$stmt->bindParam(":acc_status_code", $this->acc_status_code);
$stmt->bindParam(":description", $this->description);
$stmt->bindParam(":login_status", $this->login_status);
$stmt->bindParam(":acc_status_code", $this->acc_status_code);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the account_status
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE acc_status_code = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->acc_status_code=htmlspecialchars(strip_tags($this->acc_status_code));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->acc_status_code);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
