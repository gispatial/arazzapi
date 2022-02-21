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
import {addAdd_On_Services, getAdd_On_Services,getOneAdd_On_Services, updateAdd_On_Services} from "../../repo/add_on_servicesRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Add_On_ServicesAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [add_on_services,setAdd_On_Services] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(add_on_services.name === "" || add_on_services.name === undefined)
{
   errorList = { ...errorList,name: "Required field!"}
}
if(add_on_services.price === "" || add_on_services.price === undefined)
{
   errorList = { ...errorList,price: "Required field!"}
}
if(add_on_services.unit === "" || add_on_services.unit === undefined)
{
   errorList = { ...errorList,unit: "Required field!"}
}
if(add_on_services.unit_decimal === "" || add_on_services.unit_decimal === undefined)
{
   errorList = { ...errorList,unit_decimal: "Required field!"}
}
if(add_on_services.remark === "" || add_on_services.remark === undefined)
{
   errorList = { ...errorList,remark: "Required field!"}
}
if(add_on_services.status === "" || add_on_services.status === undefined)
{
   errorList = { ...errorList,status: "Required field!"}
}
if(add_on_services.patient_type_code === "" || add_on_services.patient_type_code === undefined)
{
   errorList = { ...errorList,patient_type_code: "Required field!"}
}
if(add_on_services.no_of_patient === "" || add_on_services.no_of_patient === undefined)
{
   errorList = { ...errorList,no_of_patient: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneAdd_On_Services(props.match.params.id).then((res) => {
                setAdd_On_Services(res.data.document)
            })
        }else{
            setAdd_On_Services({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (add_on_services.add_on_code) {
               var updateResponse =  await updateAdd_On_Services(add_on_services);
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
                var addResponse = await addAdd_On_Services(add_on_services)
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
        <PageTemplate title="Add/Update Add_On_Services">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(add_on_services!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.name}
type ={"text"}
onChange={(e)=>{setAdd_On_Services({...add_on_services,name:e.target.value});checkErrors()}}
defaultValue ={add_on_services.name}
error ={(errorMessages.name)?true:false}
label ={"name"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.price}
type ={"number"}
onChange={(e)=>{setAdd_On_Services({...add_on_services,price:e.target.value});checkErrors()}}
defaultValue ={add_on_services.price}
error ={(errorMessages.price)?true:false}
label ={"price"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.unit}
type ={"text"}
onChange={(e)=>{setAdd_On_Services({...add_on_services,unit:e.target.value});checkErrors()}}
defaultValue ={add_on_services.unit}
error ={(errorMessages.unit)?true:false}
label ={"unit"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.unit_decimal}
type ={"number"}
onChange={(e)=>{setAdd_On_Services({...add_on_services,unit_decimal:e.target.value});checkErrors()}}
defaultValue ={add_on_services.unit_decimal}
error ={(errorMessages.unit_decimal)?true:false}
label ={"unit_decimal"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.remark}
type ={"text"}
onChange={(e)=>{setAdd_On_Services({...add_on_services,remark:e.target.value});checkErrors()}}
defaultValue ={add_on_services.remark}
error ={(errorMessages.remark)?true:false}
label ={"remark"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.status}
type ={"text"}
onChange={(e)=>{setAdd_On_Services({...add_on_services,status:e.target.value});checkErrors()}}
defaultValue ={add_on_services.status}
error ={(errorMessages.status)?true:false}
label ={"status"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.patient_type_code}
type ={"text"}
onChange={(e)=>{setAdd_On_Services({...add_on_services,patient_type_code:e.target.value});checkErrors()}}
defaultValue ={add_on_services.patient_type_code}
error ={(errorMessages.patient_type_code)?true:false}
label ={"patient_type_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.no_of_patient}
type ={"number"}
onChange={(e)=>{setAdd_On_Services({...add_on_services,no_of_patient:e.target.value});checkErrors()}}
defaultValue ={add_on_services.no_of_patient}
error ={(errorMessages.no_of_patient)?true:false}
label ={"no_of_patient"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"8"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/add_on_services')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(Add_On_ServicesAddUpdatePage)
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
import {addAdd_On_Services, getAdd_On_Services,getOneAdd_On_Services, updateAdd_On_Services} from "../../repo/add_on_servicesRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Add_On_ServicesAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [add_on_services,setAdd_On_Services] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(add_on_services.name === "" || add_on_services.name === undefined)
{
   errorList = { ...errorList,name: "Required field!"}
}
if(add_on_services.price === "" || add_on_services.price === undefined)
{
   errorList = { ...errorList,price: "Required field!"}
}
if(add_on_services.unit === "" || add_on_services.unit === undefined)
{
   errorList = { ...errorList,unit: "Required field!"}
}
if(add_on_services.unit_decimal === "" || add_on_services.unit_decimal === undefined)
{
   errorList = { ...errorList,unit_decimal: "Required field!"}
}
if(add_on_services.remark === "" || add_on_services.remark === undefined)
{
   errorList = { ...errorList,remark: "Required field!"}
}
if(add_on_services.status === "" || add_on_services.status === undefined)
{
   errorList = { ...errorList,status: "Required field!"}
}
if(add_on_services.patient_type_code === "" || add_on_services.patient_type_code === undefined)
{
   errorList = { ...errorList,patient_type_code: "Required field!"}
}
if(add_on_services.no_of_patient === "" || add_on_services.no_of_patient === undefined)
{
   errorList = { ...errorList,no_of_patient: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneAdd_On_Services(props.match.params.id).then((res) => {
                setAdd_On_Services(res.data.document)
            })
        }else{
            setAdd_On_Services({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (add_on_services.add_on_code) {
               var updateResponse =  await updateAdd_On_Services(add_on_services);
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
                var addResponse = await addAdd_On_Services(add_on_services)
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
        <PageTemplate title="Add/Update Add_On_Services">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(add_on_services!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.name}
type ={"text"}
onChange={(e)=>{setAdd_On_Services({...add_on_services,name:e.target.value});checkErrors()}}
defaultValue ={add_on_services.name}
error ={(errorMessages.name)?true:false}
label ={"name"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.price}
type ={"number"}
onChange={(e)=>{setAdd_On_Services({...add_on_services,price:e.target.value});checkErrors()}}
defaultValue ={add_on_services.price}
error ={(errorMessages.price)?true:false}
label ={"price"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.unit}
type ={"text"}
onChange={(e)=>{setAdd_On_Services({...add_on_services,unit:e.target.value});checkErrors()}}
defaultValue ={add_on_services.unit}
error ={(errorMessages.unit)?true:false}
label ={"unit"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.unit_decimal}
type ={"number"}
onChange={(e)=>{setAdd_On_Services({...add_on_services,unit_decimal:e.target.value});checkErrors()}}
defaultValue ={add_on_services.unit_decimal}
error ={(errorMessages.unit_decimal)?true:false}
label ={"unit_decimal"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.remark}
type ={"text"}
onChange={(e)=>{setAdd_On_Services({...add_on_services,remark:e.target.value});checkErrors()}}
defaultValue ={add_on_services.remark}
error ={(errorMessages.remark)?true:false}
label ={"remark"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.status}
type ={"text"}
onChange={(e)=>{setAdd_On_Services({...add_on_services,status:e.target.value});checkErrors()}}
defaultValue ={add_on_services.status}
error ={(errorMessages.status)?true:false}
label ={"status"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.patient_type_code}
type ={"text"}
onChange={(e)=>{setAdd_On_Services({...add_on_services,patient_type_code:e.target.value});checkErrors()}}
defaultValue ={add_on_services.patient_type_code}
error ={(errorMessages.patient_type_code)?true:false}
label ={"patient_type_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.no_of_patient}
type ={"number"}
onChange={(e)=>{setAdd_On_Services({...add_on_services,no_of_patient:e.target.value});checkErrors()}}
defaultValue ={add_on_services.no_of_patient}
error ={(errorMessages.no_of_patient)?true:false}
label ={"no_of_patient"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"8"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/add_on_services')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(Add_On_ServicesAddUpdatePage)
