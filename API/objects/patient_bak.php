<?php
class Patient_Bak{
 
    // database connection and table name
    private $conn;
    private $table_name = "patient_bak";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $refno;
public $name;
public $age;
public $ic_no;
public $email;
public $mobile_no;
public $gender;
public $type;
public $address;
public $town;
public $district;
public $postcode;
public $state;
    
 
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
	
	// read patient_bak
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.refno LIKE ? OR t.name LIKE ?  OR t.age LIKE ?  OR t.ic_no LIKE ?  OR t.email LIKE ?  OR t.mobile_no LIKE ?  OR t.gender LIKE ?  OR t.type LIKE ?  OR t.address LIKE ?  OR t.town LIKE ?  OR t.district LIKE ?  OR t.postcode LIKE ?  OR t.state LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
$this->name = $row['name'];
$this->age = $row['age'];
$this->ic_no = $row['ic_no'];
$this->email = $row['email'];
$this->mobile_no = $row['mobile_no'];
$this->gender = $row['gender'];
$this->type = $row['type'];
$this->address = $row['address'];
$this->town = $row['town'];
$this->district = $row['district'];
$this->postcode = $row['postcode'];
$this->state = $row['state'];
	}
	
	// create patient_bak
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET refno=:refno,name=:name,age=:age,ic_no=:ic_no,email=:email,mobile_no=:mobile_no,gender=:gender,type=:type,address=:address,town=:town,district=:district,postcode=:postcode,state=:state";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->refno=htmlspecialchars(strip_tags($this->refno));
$this->name=htmlspecialchars(strip_tags($this->name));
$this->age=htmlspecialchars(strip_tags($this->age));
$this->ic_no=htmlspecialchars(strip_tags($this->ic_no));
$this->email=htmlspecialchars(strip_tags($this->email));
$this->mobile_no=htmlspecialchars(strip_tags($this->mobile_no));
$this->gender=htmlspecialchars(strip_tags($this->gender));
$this->type=htmlspecialchars(strip_tags($this->type));
$this->address=htmlspecialchars(strip_tags($this->address));
$this->town=htmlspecialchars(strip_tags($this->town));
$this->district=htmlspecialchars(strip_tags($this->district));
$this->postcode=htmlspecialchars(strip_tags($this->postcode));
$this->state=htmlspecialchars(strip_tags($this->state));
	 
		// bind values
		
$stmt->bindParam(":refno", $this->refno);
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":age", $this->age);
$stmt->bindParam(":ic_no", $this->ic_no);
$stmt->bindParam(":email", $this->email);
$stmt->bindParam(":mobile_no", $this->mobile_no);
$stmt->bindParam(":gender", $this->gender);
$stmt->bindParam(":type", $this->type);
$stmt->bindParam(":address", $this->address);
$stmt->bindParam(":town", $this->town);
$stmt->bindParam(":district", $this->district);
$stmt->bindParam(":postcode", $this->postcode);
$stmt->bindParam(":state", $this->state);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the patient_bak
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET refno=:refno,name=:name,age=:age,ic_no=:ic_no,email=:email,mobile_no=:mobile_no,gender=:gender,type=:type,address=:address,town=:town,district=:district,postcode=:postcode,state=:state WHERE refno = :refno";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->refno=htmlspecialchars(strip_tags($this->refno));
$this->name=htmlspecialchars(strip_tags($this->name));
$this->age=htmlspecialchars(strip_tags($this->age));
$this->ic_no=htmlspecialchars(strip_tags($this->ic_no));
$this->email=htmlspecialchars(strip_tags($this->email));
$this->mobile_no=htmlspecialchars(strip_tags($this->mobile_no));
$this->gender=htmlspecialchars(strip_tags($this->gender));
$this->type=htmlspecialchars(strip_tags($this->type));
$this->address=htmlspecialchars(strip_tags($this->address));
$this->town=htmlspecialchars(strip_tags($this->town));
$this->district=htmlspecialchars(strip_tags($this->district));
$this->postcode=htmlspecialchars(strip_tags($this->postcode));
$this->state=htmlspecialchars(strip_tags($this->state));
$this->refno=htmlspecialchars(strip_tags($this->refno));
	 
		// bind new values
		
$stmt->bindParam(":refno", $this->refno);
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":age", $this->age);
$stmt->bindParam(":ic_no", $this->ic_no);
$stmt->bindParam(":email", $this->email);
$stmt->bindParam(":mobile_no", $this->mobile_no);
$stmt->bindParam(":gender", $this->gender);
$stmt->bindParam(":type", $this->type);
$stmt->bindParam(":address", $this->address);
$stmt->bindParam(":town", $this->town);
$stmt->bindParam(":district", $this->district);
$stmt->bindParam(":postcode", $this->postcode);
$stmt->bindParam(":state", $this->state);
$stmt->bindParam(":refno", $this->refno);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the patient_bak
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
