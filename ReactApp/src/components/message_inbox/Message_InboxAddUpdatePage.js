import {withRouter} from "react-router";
import TextField from "@material-ui/core/TextField";
import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Switch} from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import PageTemplate from "../templates/Template";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import history from '../../history';
import {addMessage_Inbox, getMessage_Inbox,getOneMessage_Inbox, updateMessage_Inbox} from "../../repo/message_inboxRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Message_InboxAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [message_inbox,setMessage_Inbox] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(message_inbox.sender === "" || message_inbox.sender === undefined)
{
   errorList = { ...errorList,sender: "Required field!"}
}
if(message_inbox.receiver === "" || message_inbox.receiver === undefined)
{
   errorList = { ...errorList,receiver: "Required field!"}
}
if(message_inbox.subject === "" || message_inbox.subject === undefined)
{
   errorList = { ...errorList,subject: "Required field!"}
}
if(message_inbox.message === "" || message_inbox.message === undefined)
{
   errorList = { ...errorList,message: "Required field!"}
}
if(message_inbox.headers === "" || message_inbox.headers === undefined)
{
   errorList = { ...errorList,headers: "Required field!"}
}
if(message_inbox.date_sent === "" || message_inbox.date_sent === undefined)
{
   errorList = { ...errorList,date_sent: "Required field!"}
}
if(message_inbox.message_type_code === "" || message_inbox.message_type_code === undefined)
{
   errorList = { ...errorList,message_type_code: "Required field!"}
}
if(message_inbox.ic_no === "" || message_inbox.ic_no === undefined)
{
   errorList = { ...errorList,ic_no: "Required field!"}
}
if(message_inbox.status === "" || message_inbox.status === undefined)
{
   errorList = { ...errorList,status: "Required field!"}
}
if(message_inbox.attachment === "" || message_inbox.attachment === undefined)
{
   errorList = { ...errorList,attachment: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneMessage_Inbox(props.match.params.id).then((res) => {
                setMessage_Inbox(res.data.document)
            })
        }else{
            setMessage_Inbox({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (message_inbox.message_inbox_code) {
               var updateResponse =  await updateMessage_Inbox(message_inbox);
               if(updateResponse && updateResponse.data){
                   if(updateResponse.data.code===1){
                    setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Record Updated Successfully.",severity:"success"});
                     }else{
                    setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Updated failed. Please try again.", severity:"error"});
                }
               }else{
                setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Updated failed. Please try again.", severity:"error"});
            }
                //props.history.push("/");
            } else {
                var addResponse = await addMessage_Inbox(message_inbox)
                if(addResponse && addResponse.data){
                    if(addResponse.data.code===1){
                        setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Record Added Successfully.",severity:"success"});
                          }else{
                        setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Add Record Failed. Please try again.",severity:"error"});
                    }
                }else{
                    setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Add Record Failed. Please try again.",severity:"error"});
                    
                }
                //props.history.push("/");
            }
        }else{
            setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Invalid Data. Please try again.",severity:"error"});
                   
        } 
    }catch (e) {
        setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Invalid Data. Please try again.",severity:"error"});
            
    }

    }
   
    const hideAlert = () => {
        setAlertstate({ ...alertState, open: false });
      };
    return(
        <PageTemplate title="Add/Update Message_Inbox">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(message_inbox!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.sender}
type ={"text"}
onChange={(e)=>{setMessage_Inbox({...message_inbox,sender:e.target.value});checkErrors()}}
defaultValue ={message_inbox.sender}
error ={(errorMessages.sender)?true:false}
label ={"sender"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.receiver}
type ={"text"}
onChange={(e)=>{setMessage_Inbox({...message_inbox,receiver:e.target.value});checkErrors()}}
defaultValue ={message_inbox.receiver}
error ={(errorMessages.receiver)?true:false}
label ={"receiver"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.subject}
type ={"text"}
onChange={(e)=>{setMessage_Inbox({...message_inbox,subject:e.target.value});checkErrors()}}
defaultValue ={message_inbox.subject}
error ={(errorMessages.subject)?true:false}
label ={"subject"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.message}
type ={"text"}
onChange={(e)=>{setMessage_Inbox({...message_inbox,message:e.target.value});checkErrors()}}
defaultValue ={message_inbox.message}
error ={(errorMessages.message)?true:false}
label ={"message"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.headers}
type ={"text"}
onChange={(e)=>{setMessage_Inbox({...message_inbox,headers:e.target.value});checkErrors()}}
defaultValue ={message_inbox.headers}
error ={(errorMessages.headers)?true:false}
label ={"headers"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_sent}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setMessage_Inbox({...message_inbox,date_sent:e.target.value});checkErrors()}}
defaultValue ={message_inbox.date_sent}
error ={(errorMessages.date_sent)?true:false}
label ={"date_sent"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.message_type_code}
type ={"text"}
onChange={(e)=>{setMessage_Inbox({...message_inbox,message_type_code:e.target.value});checkErrors()}}
defaultValue ={message_inbox.message_type_code}
error ={(errorMessages.message_type_code)?true:false}
label ={"message_type_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.ic_no}
type ={"text"}
onChange={(e)=>{setMessage_Inbox({...message_inbox,ic_no:e.target.value});checkErrors()}}
defaultValue ={message_inbox.ic_no}
error ={(errorMessages.ic_no)?true:false}
label ={"ic_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.status}
type ={"text"}
onChange={(e)=>{setMessage_Inbox({...message_inbox,status:e.target.value});checkErrors()}}
defaultValue ={message_inbox.status}
error ={(errorMessages.status)?true:false}
label ={"status"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.attachment}
type ={"text"}
onChange={(e)=>{setMessage_Inbox({...message_inbox,attachment:e.target.value});checkErrors()}}
defaultValue ={message_inbox.attachment}
error ={(errorMessages.attachment)?true:false}
label ={"attachment"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"10"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/message_inbox')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"11"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button variant={"contained"} color="primary"  type={"Sumbit"}>Save</Button>
</Grid>
</Grid>

                        </Grid>
                        :null}
                </form>
                
               
                </CardContent>
                </Card>
                <Snackbar autoHideDuration={6000}
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={hideAlert}
                    key={vertical + horizontal}>
                       <Alert onClose={hideAlert}  severity={severity}>
                       {message}
                    </Alert>
                </Snackbar>
        </PageTemplate>
    )
}

export default withRouter(Message_InboxAddUpdatePage)
import {withRouter} from "react-router";
import TextField from "@material-ui/core/TextField";
import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Switch} from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import PageTemplate from "../templates/Template";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import history from '../../history';
import {addMessage_Inbox, getMessage_Inbox,getOneMessage_Inbox, updateMessage_Inbox} from "../../repo/message_inboxRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Message_InboxAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [message_inbox,setMessage_Inbox] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(message_inbox.sender === "" || message_inbox.sender === undefined)
{
   errorList = { ...errorList,sender: "Required field!"}
}
if(message_inbox.receiver === "" || message_inbox.receiver === undefined)
{
   errorList = { ...errorList,receiver: "Required field!"}
}
if(message_inbox.subject === "" || message_inbox.subject === undefined)
{
   errorList = { ...errorList,subject: "Required field!"}
}
if(message_inbox.message === "" || message_inbox.message === undefined)
{
   errorList = { ...errorList,message: "Required field!"}
}
if(message_inbox.headers === "" || message_inbox.headers === undefined)
{
   errorList = { ...errorList,headers: "Required field!"}
}
if(message_inbox.date_sent === "" || message_inbox.date_sent === undefined)
{
   errorList = { ...errorList,date_sent: "Required field!"}
}
if(message_inbox.message_type_code === "" || message_inbox.message_type_code === undefined)
{
   errorList = { ...errorList,message_type_code: "Required field!"}
}
if(message_inbox.ic_no === "" || message_inbox.ic_no === undefined)
{
   errorList = { ...errorList,ic_no: "Required field!"}
}
if(message_inbox.status === "" || message_inbox.status === undefined)
{
   errorList = { ...errorList,status: "Required field!"}
}
if(message_inbox.attachment === "" || message_inbox.attachment === undefined)
{
   errorList = { ...errorList,attachment: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneMessage_Inbox(props.match.params.id).then((res) => {
                setMessage_Inbox(res.data.document)
            })
        }else{
            setMessage_Inbox({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (message_inbox.message_inbox_code) {
               var updateResponse =  await updateMessage_Inbox(message_inbox);
               if(updateResponse && updateResponse.data){
                   if(updateResponse.data.code===1){
                    setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Record Updated Successfully.",severity:"success"});
                     }else{
                    setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Updated failed. Please try again.", severity:"error"});
                }
               }else{
                setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Updated failed. Please try again.", severity:"error"});
            }
                //props.history.push("/");
            } else {
                var addResponse = await addMessage_Inbox(message_inbox)
                if(addResponse && addResponse.data){
                    if(addResponse.data.code===1){
                        setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Record Added Successfully.",severity:"success"});
                          }else{
                        setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Add Record Failed. Please try again.",severity:"error"});
                    }
                }else{
                    setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Add Record Failed. Please try again.",severity:"error"});
                    
                }
                //props.history.push("/");
            }
        }else{
            setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Invalid Data. Please try again.",severity:"error"});
                   
        } 
    }catch (e) {
        setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Invalid Data. Please try again.",severity:"error"});
            
    }

    }
   
    const hideAlert = () => {
        setAlertstate({ ...alertState, open: false });
      };
    return(
        <PageTemplate title="Add/Update Message_Inbox">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(message_inbox!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.sender}
type ={"text"}
onChange={(e)=>{setMessage_Inbox({...message_inbox,sender:e.target.value});checkErrors()}}
defaultValue ={message_inbox.sender}
error ={(errorMessages.sender)?true:false}
label ={"sender"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.receiver}
type ={"text"}
onChange={(e)=>{setMessage_Inbox({...message_inbox,receiver:e.target.value});checkErrors()}}
defaultValue ={message_inbox.receiver}
error ={(errorMessages.receiver)?true:false}
label ={"receiver"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.subject}
type ={"text"}
onChange={(e)=>{setMessage_Inbox({...message_inbox,subject:e.target.value});checkErrors()}}
defaultValue ={message_inbox.subject}
error ={(errorMessages.subject)?true:false}
label ={"subject"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.message}
type ={"text"}
onChange={(e)=>{setMessage_Inbox({...message_inbox,message:e.target.value});checkErrors()}}
defaultValue ={message_inbox.message}
error ={(errorMessages.message)?true:false}
label ={"message"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.headers}
type ={"text"}
onChange={(e)=>{setMessage_Inbox({...message_inbox,headers:e.target.value});checkErrors()}}
defaultValue ={message_inbox.headers}
error ={(errorMessages.headers)?true:false}
label ={"headers"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_sent}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setMessage_Inbox({...message_inbox,date_sent:e.target.value});checkErrors()}}
defaultValue ={message_inbox.date_sent}
error ={(errorMessages.date_sent)?true:false}
label ={"date_sent"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.message_type_code}
type ={"text"}
onChange={(e)=>{setMessage_Inbox({...message_inbox,message_type_code:e.target.value});checkErrors()}}
defaultValue ={message_inbox.message_type_code}
error ={(errorMessages.message_type_code)?true:false}
label ={"message_type_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.ic_no}
type ={"text"}
onChange={(e)=>{setMessage_Inbox({...message_inbox,ic_no:e.target.value});checkErrors()}}
defaultValue ={message_inbox.ic_no}
error ={(errorMessages.ic_no)?true:false}
label ={"ic_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.status}
type ={"text"}
onChange={(e)=>{setMessage_Inbox({...message_inbox,status:e.target.value});checkErrors()}}
defaultValue ={message_inbox.status}
error ={(errorMessages.status)?true:false}
label ={"status"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.attachment}
type ={"text"}
onChange={(e)=>{setMessage_Inbox({...message_inbox,attachment:e.target.value});checkErrors()}}
defaultValue ={message_inbox.attachment}
error ={(errorMessages.attachment)?true:false}
label ={"attachment"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"10"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/message_inbox')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"11"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button variant={"contained"} color="primary"  type={"Sumbit"}>Save</Button>
</Grid>
</Grid>

                        </Grid>
                        :null}
                </form>
                
               
                </CardContent>
                </Card>
                <Snackbar autoHideDuration={6000}
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={hideAlert}
                    key={vertical + horizontal}>
                       <Alert onClose={hideAlert}  severity={severity}>
                       {message}
                    </Alert>
                </Snackbar>
        </PageTemplate>
    )
}

export default withRouter(Message_InboxAddUpdatePage)
