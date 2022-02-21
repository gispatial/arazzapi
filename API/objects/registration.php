<?php
class Registration{
 
    // database connection and table name
    private $conn;
    private $table_name = "registration";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $package_code;
public $amount_fee;
public $main_account_id;
public $date_registered;
public $date_expired;
    
 
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
	
	// read registration
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.package_code LIKE ? OR t.amount_fee LIKE ?  OR t.main_account_id LIKE ?  OR t.date_registered LIKE ?  OR t.date_expired LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
		
$this->package_code = $row['package_code'];
$this->amount_fee = $row['amount_fee'];
$this->main_account_id = $row['main_account_id'];
$this->date_registered = $row['date_registered'];
$this->date_expired = $row['date_expired'];
	}
	
	// create registration
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET package_code=:package_code,amount_fee=:amount_fee,main_account_id=:main_account_id,date_registered=:date_registered,date_expired=:date_expired";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->package_code=htmlspecialchars(strip_tags($this->package_code));
$this->amount_fee=htmlspecialchars(strip_tags($this->amount_fee));
$this->main_account_id=htmlspecialchars(strip_tags($this->main_account_id));
$this->date_registered=htmlspecialchars(strip_tags($this->date_registered));
$this->date_expired=htmlspecialchars(strip_tags($this->date_expired));
	 
		// bind values
		
$stmt->bindParam(":package_code", $this->package_code);
$stmt->bindParam(":amount_fee", $this->amount_fee);
$stmt->bindParam(":main_account_id", $this->main_account_id);
$stmt->bindParam(":date_registered", $this->date_registered);
$stmt->bindParam(":date_expired", $this->date_expired);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the registration
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET package_code=:package_code,amount_fee=:amount_fee,main_account_id=:main_account_id,date_registered=:date_registered,date_expired=:date_expired WHERE ERROR_NOPRIMARYKEYFOUND = :ERROR_NOPRIMARYKEYFOUND";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->package_code=htmlspecialchars(strip_tags($this->package_code));
$this->amount_fee=htmlspecialchars(strip_tags($this->amount_fee));
$this->main_account_id=htmlspecialchars(strip_tags($this->main_account_id));
$this->date_registered=htmlspecialchars(strip_tags($this->date_registered));
$this->date_expired=htmlspecialchars(strip_tags($this->date_expired));
$this->ERROR_NOPRIMARYKEYFOUND=htmlspecialchars(strip_tags($this->ERROR_NOPRIMARYKEYFOUND));
	 
		// bind new values
		
$stmt->bindParam(":package_code", $this->package_code);
$stmt->bindParam(":amount_fee", $this->amount_fee);
$stmt->bindParam(":main_account_id", $this->main_account_id);
$stmt->bindParam(":date_registered", $this->date_registered);
$stmt->bindParam(":date_expired", $this->date_expired);
$stmt->bindParam(":ERROR_NOPRIMARYKEYFOUND", $this->ERROR_NOPRIMARYKEYFOUND);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the registration
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
