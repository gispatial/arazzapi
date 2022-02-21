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
import {addTest_Reference_Range, getTest_Reference_Range,getOneTest_Reference_Range, updateTest_Reference_Range} from "../../repo/test_reference_rangeRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Test_Reference_RangeAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [test_reference_range,setTest_Reference_Range] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(test_reference_range.code === "" || test_reference_range.code === undefined)
{
   errorList = { ...errorList,code: "Required field!"}
}
if(test_reference_range.min === "" || test_reference_range.min === undefined)
{
   errorList = { ...errorList,min: "Required field!"}
}
if(test_reference_range.max === "" || test_reference_range.max === undefined)
{
   errorList = { ...errorList,max: "Required field!"}
}
if(test_reference_range.summary === "" || test_reference_range.summary === undefined)
{
   errorList = { ...errorList,summary: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneTest_Reference_Range(props.match.params.id).then((res) => {
                setTest_Reference_Range(res.data.document)
            })
        }else{
            setTest_Reference_Range({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (test_reference_range.test_marker_code) {
               var updateResponse =  await updateTest_Reference_Range(test_reference_range);
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
                var addResponse = await addTest_Reference_Range(test_reference_range)
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
        <PageTemplate title="Add/Update Test_Reference_Range">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(test_reference_range!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.code}
type ={"text"}
onChange={(e)=>{setTest_Reference_Range({...test_reference_range,code:e.target.value});checkErrors()}}
defaultValue ={test_reference_range.code}
error ={(errorMessages.code)?true:false}
label ={"code"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.min}
type ={"text"}
onChange={(e)=>{setTest_Reference_Range({...test_reference_range,min:e.target.value});checkErrors()}}
defaultValue ={test_reference_range.min}
error ={(errorMessages.min)?true:false}
label ={"min"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.max}
type ={"text"}
onChange={(e)=>{setTest_Reference_Range({...test_reference_range,max:e.target.value});checkErrors()}}
defaultValue ={test_reference_range.max}
error ={(errorMessages.max)?true:false}
label ={"max"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.summary}
type ={"text"}
onChange={(e)=>{setTest_Reference_Range({...test_reference_range,summary:e.target.value});checkErrors()}}
defaultValue ={test_reference_range.summary}
error ={(errorMessages.summary)?true:false}
label ={"summary"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"4"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/test_reference_range')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(Test_Reference_RangeAddUpdatePage)
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
import {addTest_Reference_Range, getTest_Reference_Range,getOneTest_Reference_Range, updateTest_Reference_Range} from "../../repo/test_reference_rangeRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Test_Reference_RangeAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [test_reference_range,setTest_Reference_Range] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(test_reference_range.code === "" || test_reference_range.code === undefined)
{
   errorList = { ...errorList,code: "Required field!"}
}
if(test_reference_range.min === "" || test_reference_range.min === undefined)
{
   errorList = { ...errorList,min: "Required field!"}
}
if(test_reference_range.max === "" || test_reference_range.max === undefined)
{
   errorList = { ...errorList,max: "Required field!"}
}
if(test_reference_range.summary === "" || test_reference_range.summary === undefined)
{
   errorList = { ...errorList,summary: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneTest_Reference_Range(props.match.params.id).then((res) => {
                setTest_Reference_Range(res.data.document)
            })
        }else{
            setTest_Reference_Range({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (test_reference_range.test_marker_code) {
               var updateResponse =  await updateTest_Reference_Range(test_reference_range);
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
                var addResponse = await addTest_Reference_Range(test_reference_range)
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
        <PageTemplate title="Add/Update Test_Reference_Range">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(test_reference_range!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.code}
type ={"text"}
onChange={(e)=>{setTest_Reference_Range({...test_reference_range,code:e.target.value});checkErrors()}}
defaultValue ={test_reference_range.code}
error ={(errorMessages.code)?true:false}
label ={"code"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.min}
type ={"text"}
onChange={(e)=>{setTest_Reference_Range({...test_reference_range,min:e.target.value});checkErrors()}}
defaultValue ={test_reference_range.min}
error ={(errorMessages.min)?true:false}
label ={"min"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.max}
type ={"text"}
onChange={(e)=>{setTest_Reference_Range({...test_reference_range,max:e.target.value});checkErrors()}}
defaultValue ={test_reference_range.max}
error ={(errorMessages.max)?true:false}
label ={"max"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.summary}
type ={"text"}
onChange={(e)=>{setTest_Reference_Range({...test_reference_range,summary:e.target.value});checkErrors()}}
defaultValue ={test_reference_range.summary}
error ={(errorMessages.summary)?true:false}
label ={"summary"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"4"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/test_reference_range')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(Test_Reference_RangeAddUpdatePage)
