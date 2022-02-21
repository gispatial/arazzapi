<?php
class User_Account{
 
    // database connection and table name
    private $conn;
    private $table_name = "user_account";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $reg_no;
public $username;
public $password;
public $name;
public $ic_no;
public $email;
public $acc_type_code;
public $menu_owner;
public $acc_status_code;
public $date_created;
public $date_updated;
public $last_login;
    
 
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
	
	// read user_account
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.reg_no LIKE ? OR t.username LIKE ?  OR t.password LIKE ?  OR t.name LIKE ?  OR t.ic_no LIKE ?  OR t.email LIKE ?  OR t.acc_type_code LIKE ?  OR t.menu_owner LIKE ?  OR t.acc_status_code LIKE ?  OR t.date_created LIKE ?  OR t.date_updated LIKE ?  OR t.last_login LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.username = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->username);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->reg_no = $row['reg_no'];
$this->username = $row['username'];
$this->password = $row['password'];
$this->name = $row['name'];
$this->ic_no = $row['ic_no'];
$this->email = $row['email'];
$this->acc_type_code = $row['acc_type_code'];
$this->menu_owner = $row['menu_owner'];
$this->acc_status_code = $row['acc_status_code'];
$this->date_created = $row['date_created'];
$this->date_updated = $row['date_updated'];
$this->last_login = $row['last_login'];
	}
	
	// create user_account
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET reg_no=:reg_no,username=:username,password=:password,name=:name,ic_no=:ic_no,email=:email,acc_type_code=:acc_type_code,menu_owner=:menu_owner,acc_status_code=:acc_status_code,date_created=:date_created,date_updated=:date_updated,last_login=:last_login";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->reg_no=htmlspecialchars(strip_tags($this->reg_no));
$this->username=htmlspecialchars(strip_tags($this->username));
$this->password=htmlspecialchars(strip_tags($this->password));
$this->name=htmlspecialchars(strip_tags($this->name));
$this->ic_no=htmlspecialchars(strip_tags($this->ic_no));
$this->email=htmlspecialchars(strip_tags($this->email));
$this->acc_type_code=htmlspecialchars(strip_tags($this->acc_type_code));
$this->menu_owner=htmlspecialchars(strip_tags($this->menu_owner));
$this->acc_status_code=htmlspecialchars(strip_tags($this->acc_status_code));
$this->date_created=htmlspecialchars(strip_tags($this->date_created));
$this->date_updated=htmlspecialchars(strip_tags($this->date_updated));
$this->last_login=htmlspecialchars(strip_tags($this->last_login));
	 
		// bind values
		
$stmt->bindParam(":reg_no", $this->reg_no);
$stmt->bindParam(":username", $this->username);
$stmt->bindParam(":password", $this->password);
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":ic_no", $this->ic_no);
$stmt->bindParam(":email", $this->email);
$stmt->bindParam(":acc_type_code", $this->acc_type_code);
$stmt->bindParam(":menu_owner", $this->menu_owner);
$stmt->bindParam(":acc_status_code", $this->acc_status_code);
$stmt->bindParam(":date_created", $this->date_created);
$stmt->bindParam(":date_updated", $this->date_updated);
$stmt->bindParam(":last_login", $this->last_login);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the user_account
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET reg_no=:reg_no,username=:username,password=:password,name=:name,ic_no=:ic_no,email=:email,acc_type_code=:acc_type_code,menu_owner=:menu_owner,acc_status_code=:acc_status_code,date_created=:date_created,date_updated=:date_updated,last_login=:last_login WHERE username = :username";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->reg_no=htmlspecialchars(strip_tags($this->reg_no));
$this->username=htmlspecialchars(strip_tags($this->username));
$this->password=htmlspecialchars(strip_tags($this->password));
$this->name=htmlspecialchars(strip_tags($this->name));
$this->ic_no=htmlspecialchars(strip_tags($this->ic_no));
$this->email=htmlspecialchars(strip_tags($this->email));
$this->acc_type_code=htmlspecialchars(strip_tags($this->acc_type_code));
$this->menu_owner=htmlspecialchars(strip_tags($this->menu_owner));
$this->acc_status_code=htmlspecialchars(strip_tags($this->acc_status_code));
$this->date_created=htmlspecialchars(strip_tags($this->date_created));
$this->date_updated=htmlspecialchars(strip_tags($this->date_updated));
$this->last_login=htmlspecialchars(strip_tags($this->last_login));
$this->username=htmlspecialchars(strip_tags($this->username));
	 
		// bind new values
		
$stmt->bindParam(":reg_no", $this->reg_no);
$stmt->bindParam(":username", $this->username);
$stmt->bindParam(":password", $this->password);
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":ic_no", $this->ic_no);
$stmt->bindParam(":email", $this->email);
$stmt->bindParam(":acc_type_code", $this->acc_type_code);
$stmt->bindParam(":menu_owner", $this->menu_owner);
$stmt->bindParam(":acc_status_code", $this->acc_status_code);
$stmt->bindParam(":date_created", $this->date_created);
$stmt->bindParam(":date_updated", $this->date_updated);
$stmt->bindParam(":last_login", $this->last_login);
$stmt->bindParam(":username", $this->username);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the user_account
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE username = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->username=htmlspecialchars(strip_tags($this->username));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->username);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
