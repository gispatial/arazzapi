<?php
class Payment{
 
    // database connection and table name
    private $conn;
    private $table_name = "payment";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $ref_no;
public $amount;
public $status;
public $remark;
public $method;
    
 
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
	
	// read payment
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.ref_no LIKE ? OR t.amount LIKE ?  OR t.status LIKE ?  OR t.remark LIKE ?  OR t.method LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.ref_no = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->ref_no);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->ref_no = $row['ref_no'];
$this->amount = $row['amount'];
$this->status = $row['status'];
$this->remark = $row['remark'];
$this->method = $row['method'];
	}
	
	// create payment
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET ref_no=:ref_no,amount=:amount,status=:status,remark=:remark,method=:method";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->ref_no=htmlspecialchars(strip_tags($this->ref_no));
$this->amount=htmlspecialchars(strip_tags($this->amount));
$this->status=htmlspecialchars(strip_tags($this->status));
$this->remark=htmlspecialchars(strip_tags($this->remark));
$this->method=htmlspecialchars(strip_tags($this->method));
	 
		// bind values
		
$stmt->bindParam(":ref_no", $this->ref_no);
$stmt->bindParam(":amount", $this->amount);
$stmt->bindParam(":status", $this->status);
$stmt->bindParam(":remark", $this->remark);
$stmt->bindParam(":method", $this->method);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the payment
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET ref_no=:ref_no,amount=:amount,status=:status,remark=:remark,method=:method WHERE ref_no = :ref_no";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->ref_no=htmlspecialchars(strip_tags($this->ref_no));
$this->amount=htmlspecialchars(strip_tags($this->amount));
$this->status=htmlspecialchars(strip_tags($this->status));
$this->remark=htmlspecialchars(strip_tags($this->remark));
$this->method=htmlspecialchars(strip_tags($this->method));
$this->ref_no=htmlspecialchars(strip_tags($this->ref_no));
	 
		// bind new values
		
$stmt->bindParam(":ref_no", $this->ref_no);
$stmt->bindParam(":amount", $this->amount);
$stmt->bindParam(":status", $this->status);
$stmt->bindParam(":remark", $this->remark);
$stmt->bindParam(":method", $this->method);
$stmt->bindParam(":ref_no", $this->ref_no);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the payment
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE ref_no = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->ref_no=htmlspecialchars(strip_tags($this->ref_no));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->ref_no);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
