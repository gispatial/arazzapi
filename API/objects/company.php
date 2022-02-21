<?php
class Company{
 
    // database connection and table name
    private $conn;
    private $table_name = "company";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $co_id;
public $co_reg_no;
public $name;
public $address;
public $town;
public $district;
public $postcode;
public $state;
public $geocode;
public $pic_url;
public $contact_no;
public $email;
    
 
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
	
	// read company
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.co_id LIKE ? OR t.co_reg_no LIKE ?  OR t.name LIKE ?  OR t.address LIKE ?  OR t.town LIKE ?  OR t.district LIKE ?  OR t.postcode LIKE ?  OR t.state LIKE ?  OR t.geocode LIKE ?  OR t.pic_url LIKE ?  OR t.contact_no LIKE ?  OR t.email LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}

	function readOne(){
	 
		// query to read single record
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.co_id = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->co_id);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->co_id = $row['co_id'];
$this->co_reg_no = $row['co_reg_no'];
$this->name = $row['name'];
$this->address = $row['address'];
$this->town = $row['town'];
$this->district = $row['district'];
$this->postcode = $row['postcode'];
$this->state = $row['state'];
$this->geocode = $row['geocode'];
$this->pic_url = $row['pic_url'];
$this->contact_no = $row['contact_no'];
$this->email = $row['email'];
	}
	
	// create company
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET co_reg_no=:co_reg_no,name=:name,address=:address,town=:town,district=:district,postcode=:postcode,state=:state,geocode=:geocode,pic_url=:pic_url,contact_no=:contact_no,email=:email";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->co_reg_no=htmlspecialchars(strip_tags($this->co_reg_no));
$this->name=htmlspecialchars(strip_tags($this->name));
$this->address=htmlspecialchars(strip_tags($this->address));
$this->town=htmlspecialchars(strip_tags($this->town));
$this->district=htmlspecialchars(strip_tags($this->district));
$this->postcode=htmlspecialchars(strip_tags($this->postcode));
$this->state=htmlspecialchars(strip_tags($this->state));
$this->geocode=htmlspecialchars(strip_tags($this->geocode));
$this->pic_url=htmlspecialchars(strip_tags($this->pic_url));
$this->contact_no=htmlspecialchars(strip_tags($this->contact_no));
$this->email=htmlspecialchars(strip_tags($this->email));
	 
		// bind values
		
$stmt->bindParam(":co_reg_no", $this->co_reg_no);
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":address", $this->address);
$stmt->bindParam(":town", $this->town);
$stmt->bindParam(":district", $this->district);
$stmt->bindParam(":postcode", $this->postcode);
$stmt->bindParam(":state", $this->state);
$stmt->bindParam(":geocode", $this->geocode);
$stmt->bindParam(":pic_url", $this->pic_url);
$stmt->bindParam(":contact_no", $this->contact_no);
$stmt->bindParam(":email", $this->email);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the company
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET co_reg_no=:co_reg_no,name=:name,address=:address,town=:town,district=:district,postcode=:postcode,state=:state,geocode=:geocode,pic_url=:pic_url,contact_no=:contact_no,email=:email WHERE co_id = :co_id";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->co_reg_no=htmlspecialchars(strip_tags($this->co_reg_no));
$this->name=htmlspecialchars(strip_tags($this->name));
$this->address=htmlspecialchars(strip_tags($this->address));
$this->town=htmlspecialchars(strip_tags($this->town));
$this->district=htmlspecialchars(strip_tags($this->district));
$this->postcode=htmlspecialchars(strip_tags($this->postcode));
$this->state=htmlspecialchars(strip_tags($this->state));
$this->geocode=htmlspecialchars(strip_tags($this->geocode));
$this->pic_url=htmlspecialchars(strip_tags($this->pic_url));
$this->contact_no=htmlspecialchars(strip_tags($this->contact_no));
$this->email=htmlspecialchars(strip_tags($this->email));
$this->co_id=htmlspecialchars(strip_tags($this->co_id));
	 
		// bind new values
		
$stmt->bindParam(":co_reg_no", $this->co_reg_no);
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":address", $this->address);
$stmt->bindParam(":town", $this->town);
$stmt->bindParam(":district", $this->district);
$stmt->bindParam(":postcode", $this->postcode);
$stmt->bindParam(":state", $this->state);
$stmt->bindParam(":geocode", $this->geocode);
$stmt->bindParam(":pic_url", $this->pic_url);
$stmt->bindParam(":contact_no", $this->contact_no);
$stmt->bindParam(":email", $this->email);
$stmt->bindParam(":co_id", $this->co_id);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the company
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE co_id = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->co_id=htmlspecialchars(strip_tags($this->co_id));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->co_id);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
