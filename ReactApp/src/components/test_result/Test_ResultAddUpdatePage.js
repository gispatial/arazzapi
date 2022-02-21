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
import {addTest_Result, getTest_Result,getOneTest_Result, updateTest_Result} from "../../repo/test_resultRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Test_ResultAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [test_result,setTest_Result] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(test_result.reg_no === "" || test_result.reg_no === undefined)
{
   errorList = { ...errorList,reg_no: "Required field!"}
}
if(test_result.booking_no === "" || test_result.booking_no === undefined)
{
   errorList = { ...errorList,booking_no: "Required field!"}
}
if(test_result.test_date === "" || test_result.test_date === undefined)
{
   errorList = { ...errorList,test_date: "Required field!"}
}
if(test_result.test_panel_code === "" || test_result.test_panel_code === undefined)
{
   errorList = { ...errorList,test_panel_code: "Required field!"}
}
if(test_result.test_marker_code === "" || test_result.test_marker_code === undefined)
{
   errorList = { ...errorList,test_marker_code: "Required field!"}
}
if(test_result.test_value === "" || test_result.test_value === undefined)
{
   errorList = { ...errorList,test_value: "Required field!"}
}
if(test_result.source === "" || test_result.source === undefined)
{
   errorList = { ...errorList,source: "Required field!"}
}
if(test_result.date_updated === "" || test_result.date_updated === undefined)
{
   errorList = { ...errorList,date_updated: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneTest_Result(props.match.params.id).then((res) => {
                setTest_Result(res.data.document)
            })
        }else{
            setTest_Result({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (test_result.patient_ic_no) {
               var updateResponse =  await updateTest_Result(test_result);
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
                var addResponse = await addTest_Result(test_result)
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
        <PageTemplate title="Add/Update Test_Result">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(test_result!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.reg_no}
type ={"text"}
onChange={(e)=>{setTest_Result({...test_result,reg_no:e.target.value});checkErrors()}}
defaultValue ={test_result.reg_no}
error ={(errorMessages.reg_no)?true:false}
label ={"reg_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.booking_no}
type ={"text"}
onChange={(e)=>{setTest_Result({...test_result,booking_no:e.target.value});checkErrors()}}
defaultValue ={test_result.booking_no}
error ={(errorMessages.booking_no)?true:false}
label ={"booking_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_date}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setTest_Result({...test_result,test_date:e.target.value});checkErrors()}}
defaultValue ={test_result.test_date}
error ={(errorMessages.test_date)?true:false}
label ={"test_date"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_panel_code}
type ={"text"}
onChange={(e)=>{setTest_Result({...test_result,test_panel_code:e.target.value});checkErrors()}}
defaultValue ={test_result.test_panel_code}
error ={(errorMessages.test_panel_code)?true:false}
label ={"test_panel_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_marker_code}
type ={"text"}
onChange={(e)=>{setTest_Result({...test_result,test_marker_code:e.target.value});checkErrors()}}
defaultValue ={test_result.test_marker_code}
error ={(errorMessages.test_marker_code)?true:false}
label ={"test_marker_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_value}
type ={"text"}
onChange={(e)=>{setTest_Result({...test_result,test_value:e.target.value});checkErrors()}}
defaultValue ={test_result.test_value}
error ={(errorMessages.test_value)?true:false}
label ={"test_value"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.source}
type ={"text"}
onChange={(e)=>{setTest_Result({...test_result,source:e.target.value});checkErrors()}}
defaultValue ={test_result.source}
error ={(errorMessages.source)?true:false}
label ={"source"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_updated}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setTest_Result({...test_result,date_updated:e.target.value});checkErrors()}}
defaultValue ={test_result.date_updated}
error ={(errorMessages.date_updated)?true:false}
label ={"date_updated"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"8"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/test_result')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"9"}>
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

export default withRouter(Test_ResultAddUpdatePage)
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
import {addTest_Result, getTest_Result,getOneTest_Result, updateTest_Result} from "../../repo/test_resultRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Test_ResultAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [test_result,setTest_Result] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(test_result.reg_no === "" || test_result.reg_no === undefined)
{
   errorList = { ...errorList,reg_no: "Required field!"}
}
if(test_result.booking_no === "" || test_result.booking_no === undefined)
{
   errorList = { ...errorList,booking_no: "Required field!"}
}
if(test_result.test_date === "" || test_result.test_date === undefined)
{
   errorList = { ...errorList,test_date: "Required field!"}
}
if(test_result.test_panel_code === "" || test_result.test_panel_code === undefined)
{
   errorList = { ...errorList,test_panel_code: "Required field!"}
}
if(test_result.test_marker_code === "" || test_result.test_marker_code === undefined)
{
   errorList = { ...errorList,test_marker_code: "Required field!"}
}
if(test_result.test_value === "" || test_result.test_value === undefined)
{
   errorList = { ...errorList,test_value: "Required field!"}
}
if(test_result.source === "" || test_result.source === undefined)
{
   errorList = { ...errorList,source: "Required field!"}
}
if(test_result.date_updated === "" || test_result.date_updated === undefined)
{
   errorList = { ...errorList,date_updated: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneTest_Result(props.match.params.id).then((res) => {
                setTest_Result(res.data.document)
            })
        }else{
            setTest_Result({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (test_result.patient_ic_no) {
               var updateResponse =  await updateTest_Result(test_result);
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
                var addResponse = await addTest_Result(test_result)
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
        <PageTemplate title="Add/Update Test_Result">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(test_result!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.reg_no}
type ={"text"}
onChange={(e)=>{setTest_Result({...test_result,reg_no:e.target.value});checkErrors()}}
defaultValue ={test_result.reg_no}
error ={(errorMessages.reg_no)?true:false}
label ={"reg_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.booking_no}
type ={"text"}
onChange={(e)=>{setTest_Result({...test_result,booking_no:e.target.value});checkErrors()}}
defaultValue ={test_result.booking_no}
error ={(errorMessages.booking_no)?true:false}
label ={"booking_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_date}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setTest_Result({...test_result,test_date:e.target.value});checkErrors()}}
defaultValue ={test_result.test_date}
error ={(errorMessages.test_date)?true:false}
label ={"test_date"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_panel_code}
type ={"text"}
onChange={(e)=>{setTest_Result({...test_result,test_panel_code:e.target.value});checkErrors()}}
defaultValue ={test_result.test_panel_code}
error ={(errorMessages.test_panel_code)?true:false}
label ={"test_panel_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_marker_code}
type ={"text"}
onChange={(e)=>{setTest_Result({...test_result,test_marker_code:e.target.value});checkErrors()}}
defaultValue ={test_result.test_marker_code}
error ={(errorMessages.test_marker_code)?true:false}
label ={"test_marker_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_value}
type ={"text"}
onChange={(e)=>{setTest_Result({...test_result,test_value:e.target.value});checkErrors()}}
defaultValue ={test_result.test_value}
error ={(errorMessages.test_value)?true:false}
label ={"test_value"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.source}
type ={"text"}
onChange={(e)=>{setTest_Result({...test_result,source:e.target.value});checkErrors()}}
defaultValue ={test_result.source}
error ={(errorMessages.source)?true:false}
label ={"source"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_updated}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setTest_Result({...test_result,date_updated:e.target.value});checkErrors()}}
defaultValue ={test_result.date_updated}
error ={(errorMessages.date_updated)?true:false}
label ={"date_updated"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"8"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/test_result')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"9"}>
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

export default withRouter(Test_ResultAddUpdatePage)
