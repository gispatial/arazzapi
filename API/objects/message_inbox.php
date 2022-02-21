<?php
class Message_Inbox{
 
    // database connection and table name
    private $conn;
    private $table_name = "message_inbox";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $message_inbox_code;
public $sender;
public $receiver;
public $subject;
public $message;
public $headers;
public $date_sent;
public $message_type_code;
public $ic_no;
public $status;
public $attachment;
    
 
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
	
	// read message_inbox
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.message_inbox_code LIKE ? OR t.sender LIKE ?  OR t.receiver LIKE ?  OR t.subject LIKE ?  OR t.message LIKE ?  OR t.headers LIKE ?  OR t.date_sent LIKE ?  OR t.message_type_code LIKE ?  OR t.ic_no LIKE ?  OR t.status LIKE ?  OR t.attachment LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}

	function readOne(){
	 
		// query to read single record
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.message_inbox_code = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->message_inbox_code);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->message_inbox_code = $row['message_inbox_code'];
$this->sender = $row['sender'];
$this->receiver = $row['receiver'];
$this->subject = $row['subject'];
$this->message = $row['message'];
$this->headers = $row['headers'];
$this->date_sent = $row['date_sent'];
$this->message_type_code = $row['message_type_code'];
$this->ic_no = $row['ic_no'];
$this->status = $row['status'];
$this->attachment = $row['attachment'];
	}
	
	// create message_inbox
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET message_inbox_code=:message_inbox_code,sender=:sender,receiver=:receiver,subject=:subject,message=:message,headers=:headers,date_sent=:date_sent,message_type_code=:message_type_code,ic_no=:ic_no,status=:status,attachment=:attachment";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->message_inbox_code=htmlspecialchars(strip_tags($this->message_inbox_code));
$this->sender=htmlspecialchars(strip_tags($this->sender));
$this->receiver=htmlspecialchars(strip_tags($this->receiver));
$this->subject=htmlspecialchars(strip_tags($this->subject));
$this->message=htmlspecialchars(strip_tags($this->message));
$this->headers=htmlspecialchars(strip_tags($this->headers));
$this->date_sent=htmlspecialchars(strip_tags($this->date_sent));
$this->message_type_code=htmlspecialchars(strip_tags($this->message_type_code));
$this->ic_no=htmlspecialchars(strip_tags($this->ic_no));
$this->status=htmlspecialchars(strip_tags($this->status));
$this->attachment=htmlspecialchars(strip_tags($this->attachment));
	 
		// bind values
		
$stmt->bindParam(":message_inbox_code", $this->message_inbox_code);
$stmt->bindParam(":sender", $this->sender);
$stmt->bindParam(":receiver", $this->receiver);
$stmt->bindParam(":subject", $this->subject);
$stmt->bindParam(":message", $this->message);
$stmt->bindParam(":headers", $this->headers);
$stmt->bindParam(":date_sent", $this->date_sent);
$stmt->bindParam(":message_type_code", $this->message_type_code);
$stmt->bindParam(":ic_no", $this->ic_no);
$stmt->bindParam(":status", $this->status);
$stmt->bindParam(":attachment", $this->attachment);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the message_inbox
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET message_inbox_code=:message_inbox_code,sender=:sender,receiver=:receiver,subject=:subject,message=:message,headers=:headers,date_sent=:date_sent,message_type_code=:message_type_code,ic_no=:ic_no,status=:status,attachment=:attachment WHERE message_inbox_code = :message_inbox_code";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->message_inbox_code=htmlspecialchars(strip_tags($this->message_inbox_code));
$this->sender=htmlspecialchars(strip_tags($this->sender));
$this->receiver=htmlspecialchars(strip_tags($this->receiver));
$this->subject=htmlspecialchars(strip_tags($this->subject));
$this->message=htmlspecialchars(strip_tags($this->message));
$this->headers=htmlspecialchars(strip_tags($this->headers));
$this->date_sent=htmlspecialchars(strip_tags($this->date_sent));
$this->message_type_code=htmlspecialchars(strip_tags($this->message_type_code));
$this->ic_no=htmlspecialchars(strip_tags($this->ic_no));
$this->status=htmlspecialchars(strip_tags($this->status));
$this->attachment=htmlspecialchars(strip_tags($this->attachment));
$this->message_inbox_code=htmlspecialchars(strip_tags($this->message_inbox_code));
	 
		// bind new values
		
$stmt->bindParam(":message_inbox_code", $this->message_inbox_code);
$stmt->bindParam(":sender", $this->sender);
$stmt->bindParam(":receiver", $this->receiver);
$stmt->bindParam(":subject", $this->subject);
$stmt->bindParam(":message", $this->message);
$stmt->bindParam(":headers", $this->headers);
$stmt->bindParam(":date_sent", $this->date_sent);
$stmt->bindParam(":message_type_code", $this->message_type_code);
$stmt->bindParam(":ic_no", $this->ic_no);
$stmt->bindParam(":status", $this->status);
$stmt->bindParam(":attachment", $this->attachment);
$stmt->bindParam(":message_inbox_code", $this->message_inbox_code);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the message_inbox
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE message_inbox_code = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->message_inbox_code=htmlspecialchars(strip_tags($this->message_inbox_code));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->message_inbox_code);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
