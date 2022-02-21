<?php
class Six_Digit_Code{
 
    // database connection and table name
    private $conn;
    private $table_name = "six_digit_code";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $code;
public $mobile;
public $expired;
public $date_sent;
    
 
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
	
	// read six_digit_code
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.code LIKE ? OR t.mobile LIKE ?  OR t.expired LIKE ?  OR t.date_sent LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.mobile = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->mobile);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->code = $row['code'];
$this->mobile = $row['mobile'];
$this->expired = $row['expired'];
$this->date_sent = $row['date_sent'];
	}
	
	// create six_digit_code
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET code=:code,mobile=:mobile,expired=:expired,date_sent=:date_sent";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->code=htmlspecialchars(strip_tags($this->code));
$this->mobile=htmlspecialchars(strip_tags($this->mobile));
$this->expired=htmlspecialchars(strip_tags($this->expired));
$this->date_sent=htmlspecialchars(strip_tags($this->date_sent));
	 
		// bind values
		
$stmt->bindParam(":code", $this->code);
$stmt->bindParam(":mobile", $this->mobile);
$stmt->bindParam(":expired", $this->expired);
$stmt->bindParam(":date_sent", $this->date_sent);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the six_digit_code
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET code=:code,mobile=:mobile,expired=:expired,date_sent=:date_sent WHERE mobile = :mobile";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->code=htmlspecialchars(strip_tags($this->code));
$this->mobile=htmlspecialchars(strip_tags($this->mobile));
$this->expired=htmlspecialchars(strip_tags($this->expired));
$this->date_sent=htmlspecialchars(strip_tags($this->date_sent));
$this->mobile=htmlspecialchars(strip_tags($this->mobile));
	 
		// bind new values
		
$stmt->bindParam(":code", $this->code);
$stmt->bindParam(":mobile", $this->mobile);
$stmt->bindParam(":expired", $this->expired);
$stmt->bindParam(":date_sent", $this->date_sent);
$stmt->bindParam(":mobile", $this->mobile);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the six_digit_code
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE mobile = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->mobile=htmlspecialchars(strip_tags($this->mobile));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->mobile);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
