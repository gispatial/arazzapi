<?php
class Pre_Registration{
 
    // database connection and table name
    private $conn;
    private $table_name = "pre_registration";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $seq_reg_no;
public $reg_no;
public $ic_no;
public $name;
public $mobile_no;
public $email;
public $package_code;
public $center_code;
public $amount_paid;
public $payment_no;
public $payment_date;
public $payment_method;
public $date_registered;
public $date_expired;
public $status;
public $company_reg_no;
    
 
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
	
	// read pre_registration
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.seq_reg_no LIKE ? OR t.reg_no LIKE ?  OR t.ic_no LIKE ?  OR t.name LIKE ?  OR t.mobile_no LIKE ?  OR t.email LIKE ?  OR t.package_code LIKE ?  OR t.center_code LIKE ?  OR t.amount_paid LIKE ?  OR t.payment_no LIKE ?  OR t.payment_date LIKE ?  OR t.payment_method LIKE ?  OR t.date_registered LIKE ?  OR t.date_expired LIKE ?  OR t.status LIKE ?  OR t.company_reg_no LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind searchKey
		
$stmt->bindParam(1, $searchKey);
$stmt->bindParam(2, $searchKey);
$stmt->bindParam(3, $searchKey);
$stmt->bindParam(4, $searchKey);
$stmt->bindParam(5, $searchKey);
$stmt->bindParam(6, $searchKey);
$stmt->bindParam(7, $searchKey);
$stmt->bindParam(8, $searchKey);
$stmt->bindParam(9, $searchKey);
$stmt->bindParam(10, $searchKey);
$stmt->bindParam(11, $searchKey);
$stmt->bindParam(12, $searchKey);
$stmt->bindParam(13, $searchKey);
$stmt->bindParam(14, $searchKey);
$stmt->bindParam(15, $searchKey);
$stmt->bindParam(16, $searchKey);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}

	function readOne(){
	 
		// query to read single record
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.seq_reg_no = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->seq_reg_no);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->seq_reg_no = $row['seq_reg_no'];
$this->reg_no = $row['reg_no'];
$this->ic_no = $row['ic_no'];
$this->name = $row['name'];
$this->mobile_no = $row['mobile_no'];
$this->email = $row['email'];
$this->package_code = $row['package_code'];
$this->center_code = $row['center_code'];
$this->amount_paid = $row['amount_paid'];
$this->payment_no = $row['payment_no'];
$this->payment_date = $row['payment_date'];
$this->payment_method = $row['payment_method'];
$this->date_registered = $row['date_registered'];
$this->date_expired = $row['date_expired'];
$this->status = $row['status'];
$this->company_reg_no = $row['company_reg_no'];
	}
	
	// create pre_registration
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET reg_no=:reg_no,ic_no=:ic_no,name=:name,mobile_no=:mobile_no,email=:email,package_code=:package_code,center_code=:center_code,amount_paid=:amount_paid,payment_no=:payment_no,payment_date=:payment_date,payment_method=:payment_method,date_registered=:date_registered,date_expired=:date_expired,status=:status,company_reg_no=:company_reg_no";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->reg_no=htmlspecialchars(strip_tags($this->reg_no));
$this->ic_no=htmlspecialchars(strip_tags($this->ic_no));
$this->name=htmlspecialchars(strip_tags($this->name));
$this->mobile_no=htmlspecialchars(strip_tags($this->mobile_no));
$this->email=htmlspecialchars(strip_tags($this->email));
$this->package_code=htmlspecialchars(strip_tags($this->package_code));
$this->center_code=htmlspecialchars(strip_tags($this->center_code));
$this->amount_paid=htmlspecialchars(strip_tags($this->amount_paid));
$this->payment_no=htmlspecialchars(strip_tags($this->payment_no));
$this->payment_date=htmlspecialchars(strip_tags($this->payment_date));
$this->payment_method=htmlspecialchars(strip_tags($this->payment_method));
$this->date_registered=htmlspecialchars(strip_tags($this->date_registered));
$this->date_expired=htmlspecialchars(strip_tags($this->date_expired));
$this->status=htmlspecialchars(strip_tags($this->status));
$this->company_reg_no=htmlspecialchars(strip_tags($this->company_reg_no));
	 
		// bind values
		
$stmt->bindParam(":reg_no", $this->reg_no);
$stmt->bindParam(":ic_no", $this->ic_no);
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":mobile_no", $this->mobile_no);
$stmt->bindParam(":email", $this->email);
$stmt->bindParam(":package_code", $this->package_code);
$stmt->bindParam(":center_code", $this->center_code);
$stmt->bindParam(":amount_paid", $this->amount_paid);
$stmt->bindParam(":payment_no", $this->payment_no);
$stmt->bindParam(":payment_date", $this->payment_date);
$stmt->bindParam(":payment_method", $this->payment_method);
$stmt->bindParam(":date_registered", $this->date_registered);
$stmt->bindParam(":date_expired", $this->date_expired);
$stmt->bindParam(":status", $this->status);
$stmt->bindParam(":company_reg_no", $this->company_reg_no);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the pre_registration
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET reg_no=:reg_no,ic_no=:ic_no,name=:name,mobile_no=:mobile_no,email=:email,package_code=:package_code,center_code=:center_code,amount_paid=:amount_paid,payment_no=:payment_no,payment_date=:payment_date,payment_method=:payment_method,date_registered=:date_registered,date_expired=:date_expired,status=:status,company_reg_no=:company_reg_no WHERE seq_reg_no = :seq_reg_no";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->reg_no=htmlspecialchars(strip_tags($this->reg_no));
$this->ic_no=htmlspecialchars(strip_tags($this->ic_no));
$this->name=htmlspecialchars(strip_tags($this->name));
$this->mobile_no=htmlspecialchars(strip_tags($this->mobile_no));
$this->email=htmlspecialchars(strip_tags($this->email));
$this->package_code=htmlspecialchars(strip_tags($this->package_code));
$this->center_code=htmlspecialchars(strip_tags($this->center_code));
$this->amount_paid=htmlspecialchars(strip_tags($this->amount_paid));
$this->payment_no=htmlspecialchars(strip_tags($this->payment_no));
$this->payment_date=htmlspecialchars(strip_tags($this->payment_date));
$this->payment_method=htmlspecialchars(strip_tags($this->payment_method));
$this->date_registered=htmlspecialchars(strip_tags($this->date_registered));
$this->date_expired=htmlspecialchars(strip_tags($this->date_expired));
$this->status=htmlspecialchars(strip_tags($this->status));
$this->company_reg_no=htmlspecialchars(strip_tags($this->company_reg_no));
$this->seq_reg_no=htmlspecialchars(strip_tags($this->seq_reg_no));
	 
		// bind new values
		
$stmt->bindParam(":reg_no", $this->reg_no);
$stmt->bindParam(":ic_no", $this->ic_no);
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":mobile_no", $this->mobile_no);
$stmt->bindParam(":email", $this->email);
$stmt->bindParam(":package_code", $this->package_code);
$stmt->bindParam(":center_code", $this->center_code);
$stmt->bindParam(":amount_paid", $this->amount_paid);
$stmt->bindParam(":payment_no", $this->payment_no);
$stmt->bindParam(":payment_date", $this->payment_date);
$stmt->bindParam(":payment_method", $this->payment_method);
$stmt->bindParam(":date_registered", $this->date_registered);
$stmt->bindParam(":date_expired", $this->date_expired);
$stmt->bindParam(":status", $this->status);
$stmt->bindParam(":company_reg_no", $this->company_reg_no);
$stmt->bindParam(":seq_reg_no", $this->seq_reg_no);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the pre_registration
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE seq_reg_no = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->seq_reg_no=htmlspecialchars(strip_tags($this->seq_reg_no));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->seq_reg_no);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
