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
import {addMessage_Box, getMessage_Box,getOneMessage_Box, updateMessage_Box} from "../../repo/message_boxRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Message_BoxAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [message_box,setMessage_Box] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(message_box.sender === "" || message_box.sender === undefined)
{
   errorList = { ...errorList,sender: "Required field!"}
}
if(message_box.sender_name === "" || message_box.sender_name === undefined)
{
   errorList = { ...errorList,sender_name: "Required field!"}
}
if(message_box.receiver === "" || message_box.receiver === undefined)
{
   errorList = { ...errorList,receiver: "Required field!"}
}
if(message_box.receiver_name === "" || message_box.receiver_name === undefined)
{
   errorList = { ...errorList,receiver_name: "Required field!"}
}
if(message_box.subject === "" || message_box.subject === undefined)
{
   errorList = { ...errorList,subject: "Required field!"}
}
if(message_box.content === "" || message_box.content === undefined)
{
   errorList = { ...errorList,content: "Required field!"}
}
if(message_box.headers === "" || message_box.headers === undefined)
{
   errorList = { ...errorList,headers: "Required field!"}
}
if(message_box.date_sent === "" || message_box.date_sent === undefined)
{
   errorList = { ...errorList,date_sent: "Required field!"}
}
if(message_box.message_type_code === "" || message_box.message_type_code === undefined)
{
   errorList = { ...errorList,message_type_code: "Required field!"}
}
if(message_box.status === "" || message_box.status === undefined)
{
   errorList = { ...errorList,status: "Required field!"}
}
if(message_box.attachment === "" || message_box.attachment === undefined)
{
   errorList = { ...errorList,attachment: "Required field!"}
}
if(message_box.message_root_id === "" || message_box.message_root_id === undefined)
{
   errorList = { ...errorList,message_root_id: "Required field!"}
}
if(message_box.latest === "" || message_box.latest === undefined)
{
   errorList = { ...errorList,latest: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneMessage_Box(props.match.params.id).then((res) => {
                setMessage_Box(res.data.document)
            })
        }else{
            setMessage_Box({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (message_box.message_id) {
               var updateResponse =  await updateMessage_Box(message_box);
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
                var addResponse = await addMessage_Box(message_box)
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
        <PageTemplate title="Add/Update Message_Box">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(message_box!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.sender}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,sender:e.target.value});checkErrors()}}
defaultValue ={message_box.sender}
error ={(errorMessages.sender)?true:false}
label ={"sender"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.sender_name}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,sender_name:e.target.value});checkErrors()}}
defaultValue ={message_box.sender_name}
error ={(errorMessages.sender_name)?true:false}
label ={"sender_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.receiver}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,receiver:e.target.value});checkErrors()}}
defaultValue ={message_box.receiver}
error ={(errorMessages.receiver)?true:false}
label ={"receiver"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.receiver_name}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,receiver_name:e.target.value});checkErrors()}}
defaultValue ={message_box.receiver_name}
error ={(errorMessages.receiver_name)?true:false}
label ={"receiver_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.subject}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,subject:e.target.value});checkErrors()}}
defaultValue ={message_box.subject}
error ={(errorMessages.subject)?true:false}
label ={"subject"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.content}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,content:e.target.value});checkErrors()}}
defaultValue ={message_box.content}
error ={(errorMessages.content)?true:false}
label ={"content"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.headers}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,headers:e.target.value});checkErrors()}}
defaultValue ={message_box.headers}
error ={(errorMessages.headers)?true:false}
label ={"headers"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_sent}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setMessage_Box({...message_box,date_sent:e.target.value});checkErrors()}}
defaultValue ={message_box.date_sent}
error ={(errorMessages.date_sent)?true:false}
label ={"date_sent"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.message_type_code}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,message_type_code:e.target.value});checkErrors()}}
defaultValue ={message_box.message_type_code}
error ={(errorMessages.message_type_code)?true:false}
label ={"message_type_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.status}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,status:e.target.value});checkErrors()}}
defaultValue ={message_box.status}
error ={(errorMessages.status)?true:false}
label ={"status"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.attachment}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,attachment:e.target.value});checkErrors()}}
defaultValue ={message_box.attachment}
error ={(errorMessages.attachment)?true:false}
label ={"attachment"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.message_root_id}
type ={"number"}
onChange={(e)=>{setMessage_Box({...message_box,message_root_id:e.target.value});checkErrors()}}
defaultValue ={message_box.message_root_id}
error ={(errorMessages.message_root_id)?true:false}
label ={"message_root_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.latest}
type ={"number"}
onChange={(e)=>{setMessage_Box({...message_box,latest:e.target.value});checkErrors()}}
defaultValue ={message_box.latest}
error ={(errorMessages.latest)?true:false}
label ={"latest"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"13"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/message_box')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"14"}>
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

export default withRouter(Message_BoxAddUpdatePage)
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
import {addMessage_Box, getMessage_Box,getOneMessage_Box, updateMessage_Box} from "../../repo/message_boxRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Message_BoxAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [message_box,setMessage_Box] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(message_box.sender === "" || message_box.sender === undefined)
{
   errorList = { ...errorList,sender: "Required field!"}
}
if(message_box.sender_name === "" || message_box.sender_name === undefined)
{
   errorList = { ...errorList,sender_name: "Required field!"}
}
if(message_box.receiver === "" || message_box.receiver === undefined)
{
   errorList = { ...errorList,receiver: "Required field!"}
}
if(message_box.receiver_name === "" || message_box.receiver_name === undefined)
{
   errorList = { ...errorList,receiver_name: "Required field!"}
}
if(message_box.subject === "" || message_box.subject === undefined)
{
   errorList = { ...errorList,subject: "Required field!"}
}
if(message_box.content === "" || message_box.content === undefined)
{
   errorList = { ...errorList,content: "Required field!"}
}
if(message_box.headers === "" || message_box.headers === undefined)
{
   errorList = { ...errorList,headers: "Required field!"}
}
if(message_box.date_sent === "" || message_box.date_sent === undefined)
{
   errorList = { ...errorList,date_sent: "Required field!"}
}
if(message_box.message_type_code === "" || message_box.message_type_code === undefined)
{
   errorList = { ...errorList,message_type_code: "Required field!"}
}
if(message_box.status === "" || message_box.status === undefined)
{
   errorList = { ...errorList,status: "Required field!"}
}
if(message_box.attachment === "" || message_box.attachment === undefined)
{
   errorList = { ...errorList,attachment: "Required field!"}
}
if(message_box.message_root_id === "" || message_box.message_root_id === undefined)
{
   errorList = { ...errorList,message_root_id: "Required field!"}
}
if(message_box.latest === "" || message_box.latest === undefined)
{
   errorList = { ...errorList,latest: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneMessage_Box(props.match.params.id).then((res) => {
                setMessage_Box(res.data.document)
            })
        }else{
            setMessage_Box({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (message_box.message_id) {
               var updateResponse =  await updateMessage_Box(message_box);
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
                var addResponse = await addMessage_Box(message_box)
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
        <PageTemplate title="Add/Update Message_Box">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(message_box!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.sender}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,sender:e.target.value});checkErrors()}}
defaultValue ={message_box.sender}
error ={(errorMessages.sender)?true:false}
label ={"sender"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.sender_name}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,sender_name:e.target.value});checkErrors()}}
defaultValue ={message_box.sender_name}
error ={(errorMessages.sender_name)?true:false}
label ={"sender_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.receiver}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,receiver:e.target.value});checkErrors()}}
defaultValue ={message_box.receiver}
error ={(errorMessages.receiver)?true:false}
label ={"receiver"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.receiver_name}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,receiver_name:e.target.value});checkErrors()}}
defaultValue ={message_box.receiver_name}
error ={(errorMessages.receiver_name)?true:false}
label ={"receiver_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.subject}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,subject:e.target.value});checkErrors()}}
defaultValue ={message_box.subject}
error ={(errorMessages.subject)?true:false}
label ={"subject"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.content}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,content:e.target.value});checkErrors()}}
defaultValue ={message_box.content}
error ={(errorMessages.content)?true:false}
label ={"content"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.headers}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,headers:e.target.value});checkErrors()}}
defaultValue ={message_box.headers}
error ={(errorMessages.headers)?true:false}
label ={"headers"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_sent}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setMessage_Box({...message_box,date_sent:e.target.value});checkErrors()}}
defaultValue ={message_box.date_sent}
error ={(errorMessages.date_sent)?true:false}
label ={"date_sent"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.message_type_code}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,message_type_code:e.target.value});checkErrors()}}
defaultValue ={message_box.message_type_code}
error ={(errorMessages.message_type_code)?true:false}
label ={"message_type_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.status}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,status:e.target.value});checkErrors()}}
defaultValue ={message_box.status}
error ={(errorMessages.status)?true:false}
label ={"status"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.attachment}
type ={"text"}
onChange={(e)=>{setMessage_Box({...message_box,attachment:e.target.value});checkErrors()}}
defaultValue ={message_box.attachment}
error ={(errorMessages.attachment)?true:false}
label ={"attachment"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.message_root_id}
type ={"number"}
onChange={(e)=>{setMessage_Box({...message_box,message_root_id:e.target.value});checkErrors()}}
defaultValue ={message_box.message_root_id}
error ={(errorMessages.message_root_id)?true:false}
label ={"message_root_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.latest}
type ={"number"}
onChange={(e)=>{setMessage_Box({...message_box,latest:e.target.value});checkErrors()}}
defaultValue ={message_box.latest}
error ={(errorMessages.latest)?true:false}
label ={"latest"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"13"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/message_box')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"14"}>
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

export default withRouter(Message_BoxAddUpdatePage)
