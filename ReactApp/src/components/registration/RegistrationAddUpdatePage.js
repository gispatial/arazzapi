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
import {addRegistration, getRegistration,getOneRegistration, updateRegistration} from "../../repo/registrationRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const RegistrationAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [registration,setRegistration] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(registration.package_code === "" || registration.package_code === undefined)
{
   errorList = { ...errorList,package_code: "Required field!"}
}
if(registration.amount_fee === "" || registration.amount_fee === undefined)
{
   errorList = { ...errorList,amount_fee: "Required field!"}
}
if(registration.main_account_id === "" || registration.main_account_id === undefined)
{
   errorList = { ...errorList,main_account_id: "Required field!"}
}
if(registration.date_registered === "" || registration.date_registered === undefined)
{
   errorList = { ...errorList,date_registered: "Required field!"}
}
if(registration.date_expired === "" || registration.date_expired === undefined)
{
   errorList = { ...errorList,date_expired: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneRegistration(props.match.params.id).then((res) => {
                setRegistration(res.data.document)
            })
        }else{
            setRegistration({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (registration.ERROR_NOPRIMARYKEYFOUND) {
               var updateResponse =  await updateRegistration(registration);
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
                var addResponse = await addRegistration(registration)
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
        <PageTemplate title="Add/Update Registration">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(registration!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.package_code}
type ={"text"}
onChange={(e)=>{setRegistration({...registration,package_code:e.target.value});checkErrors()}}
defaultValue ={registration.package_code}
error ={(errorMessages.package_code)?true:false}
label ={"package_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.amount_fee}
type ={"number"}
onChange={(e)=>{setRegistration({...registration,amount_fee:e.target.value});checkErrors()}}
defaultValue ={registration.amount_fee}
error ={(errorMessages.amount_fee)?true:false}
label ={"amount_fee"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.main_account_id}
type ={"number"}
onChange={(e)=>{setRegistration({...registration,main_account_id:e.target.value});checkErrors()}}
defaultValue ={registration.main_account_id}
error ={(errorMessages.main_account_id)?true:false}
label ={"main_account_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_registered}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setRegistration({...registration,date_registered:e.target.value});checkErrors()}}
defaultValue ={registration.date_registered}
error ={(errorMessages.date_registered)?true:false}
label ={"date_registered"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_expired}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setRegistration({...registration,date_expired:e.target.value});checkErrors()}}
defaultValue ={registration.date_expired}
error ={(errorMessages.date_expired)?true:false}
label ={"date_expired"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"5"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/registration')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(RegistrationAddUpdatePage)
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
import {addRegistration, getRegistration,getOneRegistration, updateRegistration} from "../../repo/registrationRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const RegistrationAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [registration,setRegistration] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(registration.package_code === "" || registration.package_code === undefined)
{
   errorList = { ...errorList,package_code: "Required field!"}
}
if(registration.amount_fee === "" || registration.amount_fee === undefined)
{
   errorList = { ...errorList,amount_fee: "Required field!"}
}
if(registration.main_account_id === "" || registration.main_account_id === undefined)
{
   errorList = { ...errorList,main_account_id: "Required field!"}
}
if(registration.date_registered === "" || registration.date_registered === undefined)
{
   errorList = { ...errorList,date_registered: "Required field!"}
}
if(registration.date_expired === "" || registration.date_expired === undefined)
{
   errorList = { ...errorList,date_expired: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneRegistration(props.match.params.id).then((res) => {
                setRegistration(res.data.document)
            })
        }else{
            setRegistration({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (registration.ERROR_NOPRIMARYKEYFOUND) {
               var updateResponse =  await updateRegistration(registration);
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
                var addResponse = await addRegistration(registration)
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
        <PageTemplate title="Add/Update Registration">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(registration!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.package_code}
type ={"text"}
onChange={(e)=>{setRegistration({...registration,package_code:e.target.value});checkErrors()}}
defaultValue ={registration.package_code}
error ={(errorMessages.package_code)?true:false}
label ={"package_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.amount_fee}
type ={"number"}
onChange={(e)=>{setRegistration({...registration,amount_fee:e.target.value});checkErrors()}}
defaultValue ={registration.amount_fee}
error ={(errorMessages.amount_fee)?true:false}
label ={"amount_fee"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.main_account_id}
type ={"number"}
onChange={(e)=>{setRegistration({...registration,main_account_id:e.target.value});checkErrors()}}
defaultValue ={registration.main_account_id}
error ={(errorMessages.main_account_id)?true:false}
label ={"main_account_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_registered}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setRegistration({...registration,date_registered:e.target.value});checkErrors()}}
defaultValue ={registration.date_registered}
error ={(errorMessages.date_registered)?true:false}
label ={"date_registered"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_expired}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setRegistration({...registration,date_expired:e.target.value});checkErrors()}}
defaultValue ={registration.date_expired}
error ={(errorMessages.date_expired)?true:false}
label ={"date_expired"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"5"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/registration')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(RegistrationAddUpdatePage)
