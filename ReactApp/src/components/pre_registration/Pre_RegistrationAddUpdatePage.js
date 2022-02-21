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
import {addPre_Registration, getPre_Registration,getOnePre_Registration, updatePre_Registration} from "../../repo/pre_registrationRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Pre_RegistrationAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [pre_registration,setPre_Registration] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(pre_registration.reg_no === "" || pre_registration.reg_no === undefined)
{
   errorList = { ...errorList,reg_no: "Required field!"}
}
if(pre_registration.ic_no === "" || pre_registration.ic_no === undefined)
{
   errorList = { ...errorList,ic_no: "Required field!"}
}
if(pre_registration.name === "" || pre_registration.name === undefined)
{
   errorList = { ...errorList,name: "Required field!"}
}
if(pre_registration.mobile_no === "" || pre_registration.mobile_no === undefined)
{
   errorList = { ...errorList,mobile_no: "Required field!"}
}
if(pre_registration.email === "" || validateEmail(pre_registration.email) === false)
{
   errorList = { ...errorList,email: "Enter a valid email!"}
}
if(pre_registration.package_code === "" || pre_registration.package_code === undefined)
{
   errorList = { ...errorList,package_code: "Required field!"}
}
if(pre_registration.center_code === "" || pre_registration.center_code === undefined)
{
   errorList = { ...errorList,center_code: "Required field!"}
}
if(pre_registration.amount_paid === "" || pre_registration.amount_paid === undefined)
{
   errorList = { ...errorList,amount_paid: "Required field!"}
}
if(pre_registration.payment_no === "" || pre_registration.payment_no === undefined)
{
   errorList = { ...errorList,payment_no: "Required field!"}
}
if(pre_registration.payment_method === "" || pre_registration.payment_method === undefined)
{
   errorList = { ...errorList,payment_method: "Required field!"}
}
if(pre_registration.date_registered === "" || pre_registration.date_registered === undefined)
{
   errorList = { ...errorList,date_registered: "Required field!"}
}
if(pre_registration.date_expired === "" || pre_registration.date_expired === undefined)
{
   errorList = { ...errorList,date_expired: "Required field!"}
}
if(pre_registration.status === "" || pre_registration.status === undefined)
{
   errorList = { ...errorList,status: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOnePre_Registration(props.match.params.id).then((res) => {
                setPre_Registration(res.data.document)
            })
        }else{
            setPre_Registration({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (pre_registration.seq_reg_no) {
               var updateResponse =  await updatePre_Registration(pre_registration);
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
                var addResponse = await addPre_Registration(pre_registration)
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
        <PageTemplate title="Add/Update Pre_Registration">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(pre_registration!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.reg_no}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,reg_no:e.target.value});checkErrors()}}
defaultValue ={pre_registration.reg_no}
error ={(errorMessages.reg_no)?true:false}
label ={"reg_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.ic_no}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,ic_no:e.target.value});checkErrors()}}
defaultValue ={pre_registration.ic_no}
error ={(errorMessages.ic_no)?true:false}
label ={"ic_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.name}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,name:e.target.value});checkErrors()}}
defaultValue ={pre_registration.name}
error ={(errorMessages.name)?true:false}
label ={"name"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.mobile_no}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,mobile_no:e.target.value});checkErrors()}}
defaultValue ={pre_registration.mobile_no}
error ={(errorMessages.mobile_no)?true:false}
label ={"mobile_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.email}
type ={"email"}
onChange={(e)=>{setPre_Registration({...pre_registration,email:e.target.value});checkErrors()}}
defaultValue ={pre_registration.email}
error ={(errorMessages.email)?true:false}
label ={"email"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.package_code}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,package_code:e.target.value});checkErrors()}}
defaultValue ={pre_registration.package_code}
error ={(errorMessages.package_code)?true:false}
label ={"package_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.center_code}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,center_code:e.target.value});checkErrors()}}
defaultValue ={pre_registration.center_code}
error ={(errorMessages.center_code)?true:false}
label ={"center_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.amount_paid}
type ={"number"}
onChange={(e)=>{setPre_Registration({...pre_registration,amount_paid:e.target.value});checkErrors()}}
defaultValue ={pre_registration.amount_paid}
error ={(errorMessages.amount_paid)?true:false}
label ={"amount_paid"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.payment_no}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,payment_no:e.target.value});checkErrors()}}
defaultValue ={pre_registration.payment_no}
error ={(errorMessages.payment_no)?true:false}
label ={"payment_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.payment_date}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setPre_Registration({...pre_registration,payment_date:e.target.value});checkErrors()}}
defaultValue ={pre_registration.payment_date}
error ={(errorMessages.payment_date)?true:false}
label ={"payment_date"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.payment_method}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,payment_method:e.target.value});checkErrors()}}
defaultValue ={pre_registration.payment_method}
error ={(errorMessages.payment_method)?true:false}
label ={"payment_method"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_registered}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setPre_Registration({...pre_registration,date_registered:e.target.value});checkErrors()}}
defaultValue ={pre_registration.date_registered}
error ={(errorMessages.date_registered)?true:false}
label ={"date_registered"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_expired}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setPre_Registration({...pre_registration,date_expired:e.target.value});checkErrors()}}
defaultValue ={pre_registration.date_expired}
error ={(errorMessages.date_expired)?true:false}
label ={"date_expired"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.status}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,status:e.target.value});checkErrors()}}
defaultValue ={pre_registration.status}
error ={(errorMessages.status)?true:false}
label ={"status"}/>
</ Grid >
<Grid xs={12} md={6} key={"14"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.company_reg_no}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,company_reg_no:e.target.value});checkErrors()}}
defaultValue ={pre_registration.company_reg_no}
error ={(errorMessages.company_reg_no)?true:false}
label ={"company_reg_no"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"15"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/pre_registration')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"16"}>
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

export default withRouter(Pre_RegistrationAddUpdatePage)
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
import {addPre_Registration, getPre_Registration,getOnePre_Registration, updatePre_Registration} from "../../repo/pre_registrationRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Pre_RegistrationAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [pre_registration,setPre_Registration] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(pre_registration.reg_no === "" || pre_registration.reg_no === undefined)
{
   errorList = { ...errorList,reg_no: "Required field!"}
}
if(pre_registration.ic_no === "" || pre_registration.ic_no === undefined)
{
   errorList = { ...errorList,ic_no: "Required field!"}
}
if(pre_registration.name === "" || pre_registration.name === undefined)
{
   errorList = { ...errorList,name: "Required field!"}
}
if(pre_registration.mobile_no === "" || pre_registration.mobile_no === undefined)
{
   errorList = { ...errorList,mobile_no: "Required field!"}
}
if(pre_registration.email === "" || validateEmail(pre_registration.email) === false)
{
   errorList = { ...errorList,email: "Enter a valid email!"}
}
if(pre_registration.package_code === "" || pre_registration.package_code === undefined)
{
   errorList = { ...errorList,package_code: "Required field!"}
}
if(pre_registration.center_code === "" || pre_registration.center_code === undefined)
{
   errorList = { ...errorList,center_code: "Required field!"}
}
if(pre_registration.amount_paid === "" || pre_registration.amount_paid === undefined)
{
   errorList = { ...errorList,amount_paid: "Required field!"}
}
if(pre_registration.payment_no === "" || pre_registration.payment_no === undefined)
{
   errorList = { ...errorList,payment_no: "Required field!"}
}
if(pre_registration.payment_method === "" || pre_registration.payment_method === undefined)
{
   errorList = { ...errorList,payment_method: "Required field!"}
}
if(pre_registration.date_registered === "" || pre_registration.date_registered === undefined)
{
   errorList = { ...errorList,date_registered: "Required field!"}
}
if(pre_registration.date_expired === "" || pre_registration.date_expired === undefined)
{
   errorList = { ...errorList,date_expired: "Required field!"}
}
if(pre_registration.status === "" || pre_registration.status === undefined)
{
   errorList = { ...errorList,status: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOnePre_Registration(props.match.params.id).then((res) => {
                setPre_Registration(res.data.document)
            })
        }else{
            setPre_Registration({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (pre_registration.seq_reg_no) {
               var updateResponse =  await updatePre_Registration(pre_registration);
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
                var addResponse = await addPre_Registration(pre_registration)
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
        <PageTemplate title="Add/Update Pre_Registration">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(pre_registration!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.reg_no}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,reg_no:e.target.value});checkErrors()}}
defaultValue ={pre_registration.reg_no}
error ={(errorMessages.reg_no)?true:false}
label ={"reg_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.ic_no}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,ic_no:e.target.value});checkErrors()}}
defaultValue ={pre_registration.ic_no}
error ={(errorMessages.ic_no)?true:false}
label ={"ic_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.name}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,name:e.target.value});checkErrors()}}
defaultValue ={pre_registration.name}
error ={(errorMessages.name)?true:false}
label ={"name"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.mobile_no}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,mobile_no:e.target.value});checkErrors()}}
defaultValue ={pre_registration.mobile_no}
error ={(errorMessages.mobile_no)?true:false}
label ={"mobile_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.email}
type ={"email"}
onChange={(e)=>{setPre_Registration({...pre_registration,email:e.target.value});checkErrors()}}
defaultValue ={pre_registration.email}
error ={(errorMessages.email)?true:false}
label ={"email"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.package_code}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,package_code:e.target.value});checkErrors()}}
defaultValue ={pre_registration.package_code}
error ={(errorMessages.package_code)?true:false}
label ={"package_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.center_code}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,center_code:e.target.value});checkErrors()}}
defaultValue ={pre_registration.center_code}
error ={(errorMessages.center_code)?true:false}
label ={"center_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.amount_paid}
type ={"number"}
onChange={(e)=>{setPre_Registration({...pre_registration,amount_paid:e.target.value});checkErrors()}}
defaultValue ={pre_registration.amount_paid}
error ={(errorMessages.amount_paid)?true:false}
label ={"amount_paid"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.payment_no}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,payment_no:e.target.value});checkErrors()}}
defaultValue ={pre_registration.payment_no}
error ={(errorMessages.payment_no)?true:false}
label ={"payment_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.payment_date}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setPre_Registration({...pre_registration,payment_date:e.target.value});checkErrors()}}
defaultValue ={pre_registration.payment_date}
error ={(errorMessages.payment_date)?true:false}
label ={"payment_date"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.payment_method}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,payment_method:e.target.value});checkErrors()}}
defaultValue ={pre_registration.payment_method}
error ={(errorMessages.payment_method)?true:false}
label ={"payment_method"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_registered}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setPre_Registration({...pre_registration,date_registered:e.target.value});checkErrors()}}
defaultValue ={pre_registration.date_registered}
error ={(errorMessages.date_registered)?true:false}
label ={"date_registered"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_expired}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setPre_Registration({...pre_registration,date_expired:e.target.value});checkErrors()}}
defaultValue ={pre_registration.date_expired}
error ={(errorMessages.date_expired)?true:false}
label ={"date_expired"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.status}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,status:e.target.value});checkErrors()}}
defaultValue ={pre_registration.status}
error ={(errorMessages.status)?true:false}
label ={"status"}/>
</ Grid >
<Grid xs={12} md={6} key={"14"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.company_reg_no}
type ={"text"}
onChange={(e)=>{setPre_Registration({...pre_registration,company_reg_no:e.target.value});checkErrors()}}
defaultValue ={pre_registration.company_reg_no}
error ={(errorMessages.company_reg_no)?true:false}
label ={"company_reg_no"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"15"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/pre_registration')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"16"}>
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

export default withRouter(Pre_RegistrationAddUpdatePage)
