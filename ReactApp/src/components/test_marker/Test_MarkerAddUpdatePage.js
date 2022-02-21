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
import {addTest_Marker, getTest_Marker,getOneTest_Marker, updateTest_Marker} from "../../repo/test_markerRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Test_MarkerAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [test_marker,setTest_Marker] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(test_marker.code === "" || test_marker.code === undefined)
{
   errorList = { ...errorList,code: "Required field!"}
}
if(test_marker.name === "" || test_marker.name === undefined)
{
   errorList = { ...errorList,name: "Required field!"}
}
if(test_marker.data_format === "" || test_marker.data_format === undefined)
{
   errorList = { ...errorList,data_format: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneTest_Marker(props.match.params.id).then((res) => {
                setTest_Marker(res.data.document)
            })
        }else{
            setTest_Marker({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (test_marker.test_panel_code) {
               var updateResponse =  await updateTest_Marker(test_marker);
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
                var addResponse = await addTest_Marker(test_marker)
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
        <PageTemplate title="Add/Update Test_Marker">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(test_marker!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.code}
type ={"text"}
onChange={(e)=>{setTest_Marker({...test_marker,code:e.target.value});checkErrors()}}
defaultValue ={test_marker.code}
error ={(errorMessages.code)?true:false}
label ={"code"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.name}
type ={"text"}
onChange={(e)=>{setTest_Marker({...test_marker,name:e.target.value});checkErrors()}}
defaultValue ={test_marker.name}
error ={(errorMessages.name)?true:false}
label ={"name"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.description}
type ={"text"}
onChange={(e)=>{setTest_Marker({...test_marker,description:e.target.value});checkErrors()}}
defaultValue ={test_marker.description}
error ={(errorMessages.description)?true:false}
label ={"description"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.unit}
type ={"text"}
onChange={(e)=>{setTest_Marker({...test_marker,unit:e.target.value});checkErrors()}}
defaultValue ={test_marker.unit}
error ={(errorMessages.unit)?true:false}
label ={"unit"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.data_format}
type ={"number"}
onChange={(e)=>{setTest_Marker({...test_marker,data_format:e.target.value});checkErrors()}}
defaultValue ={test_marker.data_format}
error ={(errorMessages.data_format)?true:false}
label ={"data_format"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"5"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/test_marker')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"6"}>
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

export default withRouter(Test_MarkerAddUpdatePage)
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
import {addTest_Marker, getTest_Marker,getOneTest_Marker, updateTest_Marker} from "../../repo/test_markerRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Test_MarkerAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [test_marker,setTest_Marker] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(test_marker.code === "" || test_marker.code === undefined)
{
   errorList = { ...errorList,code: "Required field!"}
}
if(test_marker.name === "" || test_marker.name === undefined)
{
   errorList = { ...errorList,name: "Required field!"}
}
if(test_marker.data_format === "" || test_marker.data_format === undefined)
{
   errorList = { ...errorList,data_format: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneTest_Marker(props.match.params.id).then((res) => {
                setTest_Marker(res.data.document)
            })
        }else{
            setTest_Marker({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (test_marker.test_panel_code) {
               var updateResponse =  await updateTest_Marker(test_marker);
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
                var addResponse = await addTest_Marker(test_marker)
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
        <PageTemplate title="Add/Update Test_Marker">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(test_marker!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.code}
type ={"text"}
onChange={(e)=>{setTest_Marker({...test_marker,code:e.target.value});checkErrors()}}
defaultValue ={test_marker.code}
error ={(errorMessages.code)?true:false}
label ={"code"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.name}
type ={"text"}
onChange={(e)=>{setTest_Marker({...test_marker,name:e.target.value});checkErrors()}}
defaultValue ={test_marker.name}
error ={(errorMessages.name)?true:false}
label ={"name"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.description}
type ={"text"}
onChange={(e)=>{setTest_Marker({...test_marker,description:e.target.value});checkErrors()}}
defaultValue ={test_marker.description}
error ={(errorMessages.description)?true:false}
label ={"description"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.unit}
type ={"text"}
onChange={(e)=>{setTest_Marker({...test_marker,unit:e.target.value});checkErrors()}}
defaultValue ={test_marker.unit}
error ={(errorMessages.unit)?true:false}
label ={"unit"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.data_format}
type ={"number"}
onChange={(e)=>{setTest_Marker({...test_marker,data_format:e.target.value});checkErrors()}}
defaultValue ={test_marker.data_format}
error ={(errorMessages.data_format)?true:false}
label ={"data_format"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"5"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/test_marker')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"6"}>
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

export default withRouter(Test_MarkerAddUpdatePage)
