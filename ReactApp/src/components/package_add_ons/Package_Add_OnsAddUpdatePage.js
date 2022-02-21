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
import {addPackage_Add_Ons, getPackage_Add_Ons,getOnePackage_Add_Ons, updatePackage_Add_Ons} from "../../repo/package_add_onsRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Package_Add_OnsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [package_add_ons,setPackage_Add_Ons] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(package_add_ons.add_on_code === "" || package_add_ons.add_on_code === undefined)
{
   errorList = { ...errorList,add_on_code: "Required field!"}
}
if(package_add_ons.add_on_name === "" || package_add_ons.add_on_name === undefined)
{
   errorList = { ...errorList,add_on_name: "Required field!"}
}
if(package_add_ons.test_location_code === "" || package_add_ons.test_location_code === undefined)
{
   errorList = { ...errorList,test_location_code: "Required field!"}
}
if(package_add_ons.test_location_name === "" || package_add_ons.test_location_name === undefined)
{
   errorList = { ...errorList,test_location_name: "Required field!"}
}
if(package_add_ons.total_test_conducted === "" || package_add_ons.total_test_conducted === undefined)
{
   errorList = { ...errorList,total_test_conducted: "Required field!"}
}
if(package_add_ons.patient_type_code === "" || package_add_ons.patient_type_code === undefined)
{
   errorList = { ...errorList,patient_type_code: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOnePackage_Add_Ons(props.match.params.id).then((res) => {
                setPackage_Add_Ons(res.data.document)
            })
        }else{
            setPackage_Add_Ons({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (package_add_ons.package_code) {
               var updateResponse =  await updatePackage_Add_Ons(package_add_ons);
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
                var addResponse = await addPackage_Add_Ons(package_add_ons)
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
        <PageTemplate title="Add/Update Package_Add_Ons">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(package_add_ons!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.add_on_code}
type ={"text"}
onChange={(e)=>{setPackage_Add_Ons({...package_add_ons,add_on_code:e.target.value});checkErrors()}}
defaultValue ={package_add_ons.add_on_code}
error ={(errorMessages.add_on_code)?true:false}
label ={"add_on_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.add_on_name}
type ={"text"}
onChange={(e)=>{setPackage_Add_Ons({...package_add_ons,add_on_name:e.target.value});checkErrors()}}
defaultValue ={package_add_ons.add_on_name}
error ={(errorMessages.add_on_name)?true:false}
label ={"add_on_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_location_code}
type ={"text"}
onChange={(e)=>{setPackage_Add_Ons({...package_add_ons,test_location_code:e.target.value});checkErrors()}}
defaultValue ={package_add_ons.test_location_code}
error ={(errorMessages.test_location_code)?true:false}
label ={"test_location_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_location_name}
type ={"text"}
onChange={(e)=>{setPackage_Add_Ons({...package_add_ons,test_location_name:e.target.value});checkErrors()}}
defaultValue ={package_add_ons.test_location_name}
error ={(errorMessages.test_location_name)?true:false}
label ={"test_location_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.total_test_conducted}
type ={"number"}
onChange={(e)=>{setPackage_Add_Ons({...package_add_ons,total_test_conducted:e.target.value});checkErrors()}}
defaultValue ={package_add_ons.total_test_conducted}
error ={(errorMessages.total_test_conducted)?true:false}
label ={"total_test_conducted"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.patient_type_code}
type ={"text"}
onChange={(e)=>{setPackage_Add_Ons({...package_add_ons,patient_type_code:e.target.value});checkErrors()}}
defaultValue ={package_add_ons.patient_type_code}
error ={(errorMessages.patient_type_code)?true:false}
label ={"patient_type_code"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"6"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/package_add_ons')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"7"}>
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

export default withRouter(Package_Add_OnsAddUpdatePage)
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
import {addPackage_Add_Ons, getPackage_Add_Ons,getOnePackage_Add_Ons, updatePackage_Add_Ons} from "../../repo/package_add_onsRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Package_Add_OnsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [package_add_ons,setPackage_Add_Ons] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(package_add_ons.add_on_code === "" || package_add_ons.add_on_code === undefined)
{
   errorList = { ...errorList,add_on_code: "Required field!"}
}
if(package_add_ons.add_on_name === "" || package_add_ons.add_on_name === undefined)
{
   errorList = { ...errorList,add_on_name: "Required field!"}
}
if(package_add_ons.test_location_code === "" || package_add_ons.test_location_code === undefined)
{
   errorList = { ...errorList,test_location_code: "Required field!"}
}
if(package_add_ons.test_location_name === "" || package_add_ons.test_location_name === undefined)
{
   errorList = { ...errorList,test_location_name: "Required field!"}
}
if(package_add_ons.total_test_conducted === "" || package_add_ons.total_test_conducted === undefined)
{
   errorList = { ...errorList,total_test_conducted: "Required field!"}
}
if(package_add_ons.patient_type_code === "" || package_add_ons.patient_type_code === undefined)
{
   errorList = { ...errorList,patient_type_code: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOnePackage_Add_Ons(props.match.params.id).then((res) => {
                setPackage_Add_Ons(res.data.document)
            })
        }else{
            setPackage_Add_Ons({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (package_add_ons.package_code) {
               var updateResponse =  await updatePackage_Add_Ons(package_add_ons);
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
                var addResponse = await addPackage_Add_Ons(package_add_ons)
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
        <PageTemplate title="Add/Update Package_Add_Ons">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(package_add_ons!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.add_on_code}
type ={"text"}
onChange={(e)=>{setPackage_Add_Ons({...package_add_ons,add_on_code:e.target.value});checkErrors()}}
defaultValue ={package_add_ons.add_on_code}
error ={(errorMessages.add_on_code)?true:false}
label ={"add_on_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.add_on_name}
type ={"text"}
onChange={(e)=>{setPackage_Add_Ons({...package_add_ons,add_on_name:e.target.value});checkErrors()}}
defaultValue ={package_add_ons.add_on_name}
error ={(errorMessages.add_on_name)?true:false}
label ={"add_on_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_location_code}
type ={"text"}
onChange={(e)=>{setPackage_Add_Ons({...package_add_ons,test_location_code:e.target.value});checkErrors()}}
defaultValue ={package_add_ons.test_location_code}
error ={(errorMessages.test_location_code)?true:false}
label ={"test_location_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_location_name}
type ={"text"}
onChange={(e)=>{setPackage_Add_Ons({...package_add_ons,test_location_name:e.target.value});checkErrors()}}
defaultValue ={package_add_ons.test_location_name}
error ={(errorMessages.test_location_name)?true:false}
label ={"test_location_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.total_test_conducted}
type ={"number"}
onChange={(e)=>{setPackage_Add_Ons({...package_add_ons,total_test_conducted:e.target.value});checkErrors()}}
defaultValue ={package_add_ons.total_test_conducted}
error ={(errorMessages.total_test_conducted)?true:false}
label ={"total_test_conducted"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.patient_type_code}
type ={"text"}
onChange={(e)=>{setPackage_Add_Ons({...package_add_ons,patient_type_code:e.target.value});checkErrors()}}
defaultValue ={package_add_ons.patient_type_code}
error ={(errorMessages.patient_type_code)?true:false}
label ={"patient_type_code"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"6"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/package_add_ons')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"7"}>
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

export default withRouter(Package_Add_OnsAddUpdatePage)
