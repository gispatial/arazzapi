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
import {addSms_Log, getSms_Log,getOneSms_Log, updateSms_Log} from "../../repo/sms_logRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Sms_LogAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [sms_log,setSms_Log] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(sms_log.date_sent === "" || sms_log.date_sent === undefined)
{
   errorList = { ...errorList,date_sent: "Required field!"}
}
if(sms_log.mobile_no === "" || sms_log.mobile_no === undefined)
{
   errorList = { ...errorList,mobile_no: "Required field!"}
}
if(sms_log.message === "" || sms_log.message === undefined)
{
   errorList = { ...errorList,message: "Required field!"}
}
if(sms_log.status === "" || sms_log.status === undefined)
{
   errorList = { ...errorList,status: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneSms_Log(props.match.params.id).then((res) => {
                setSms_Log(res.data.document)
            })
        }else{
            setSms_Log({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (sms_log.id) {
               var updateResponse =  await updateSms_Log(sms_log);
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
                var addResponse = await addSms_Log(sms_log)
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
        <PageTemplate title="Add/Update Sms_Log">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(sms_log!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_sent}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setSms_Log({...sms_log,date_sent:e.target.value});checkErrors()}}
defaultValue ={sms_log.date_sent}
error ={(errorMessages.date_sent)?true:false}
label ={"date_sent"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.mobile_no}
type ={"text"}
onChange={(e)=>{setSms_Log({...sms_log,mobile_no:e.target.value});checkErrors()}}
defaultValue ={sms_log.mobile_no}
error ={(errorMessages.mobile_no)?true:false}
label ={"mobile_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.message}
type ={"text"}
onChange={(e)=>{setSms_Log({...sms_log,message:e.target.value});checkErrors()}}
defaultValue ={sms_log.message}
error ={(errorMessages.message)?true:false}
label ={"message"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.status}
type ={"text"}
onChange={(e)=>{setSms_Log({...sms_log,status:e.target.value});checkErrors()}}
defaultValue ={sms_log.status}
error ={(errorMessages.status)?true:false}
label ={"status"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"4"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/sms_log')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"5"}>
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

export default withRouter(Sms_LogAddUpdatePage)
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
import {addSms_Log, getSms_Log,getOneSms_Log, updateSms_Log} from "../../repo/sms_logRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Sms_LogAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [sms_log,setSms_Log] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(sms_log.date_sent === "" || sms_log.date_sent === undefined)
{
   errorList = { ...errorList,date_sent: "Required field!"}
}
if(sms_log.mobile_no === "" || sms_log.mobile_no === undefined)
{
   errorList = { ...errorList,mobile_no: "Required field!"}
}
if(sms_log.message === "" || sms_log.message === undefined)
{
   errorList = { ...errorList,message: "Required field!"}
}
if(sms_log.status === "" || sms_log.status === undefined)
{
   errorList = { ...errorList,status: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneSms_Log(props.match.params.id).then((res) => {
                setSms_Log(res.data.document)
            })
        }else{
            setSms_Log({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (sms_log.id) {
               var updateResponse =  await updateSms_Log(sms_log);
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
                var addResponse = await addSms_Log(sms_log)
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
        <PageTemplate title="Add/Update Sms_Log">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(sms_log!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_sent}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setSms_Log({...sms_log,date_sent:e.target.value});checkErrors()}}
defaultValue ={sms_log.date_sent}
error ={(errorMessages.date_sent)?true:false}
label ={"date_sent"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.mobile_no}
type ={"text"}
onChange={(e)=>{setSms_Log({...sms_log,mobile_no:e.target.value});checkErrors()}}
defaultValue ={sms_log.mobile_no}
error ={(errorMessages.mobile_no)?true:false}
label ={"mobile_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.message}
type ={"text"}
onChange={(e)=>{setSms_Log({...sms_log,message:e.target.value});checkErrors()}}
defaultValue ={sms_log.message}
error ={(errorMessages.message)?true:false}
label ={"message"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.status}
type ={"text"}
onChange={(e)=>{setSms_Log({...sms_log,status:e.target.value});checkErrors()}}
defaultValue ={sms_log.status}
error ={(errorMessages.status)?true:false}
label ={"status"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"4"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/sms_log')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"5"}>
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

export default withRouter(Sms_LogAddUpdatePage)
