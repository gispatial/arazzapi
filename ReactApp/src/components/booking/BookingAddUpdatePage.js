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
import {addBooking, getBooking,getOneBooking, updateBooking} from "../../repo/bookingRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const BookingAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [booking,setBooking] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(booking.patient_ic_no === "" || booking.patient_ic_no === undefined)
{
   errorList = { ...errorList,patient_ic_no: "Required field!"}
}
if(booking.reg_no === "" || booking.reg_no === undefined)
{
   errorList = { ...errorList,reg_no: "Required field!"}
}
if(booking.test_panel_code === "" || booking.test_panel_code === undefined)
{
   errorList = { ...errorList,test_panel_code: "Required field!"}
}
if(booking.status === "" || booking.status === undefined)
{
   errorList = { ...errorList,status: "Required field!"}
}
if(booking.booking_date === "" || booking.booking_date === undefined)
{
   errorList = { ...errorList,booking_date: "Required field!"}
}
if(booking.date_submitted === "" || booking.date_submitted === undefined)
{
   errorList = { ...errorList,date_submitted: "Required field!"}
}
if(booking.date_updated === "" || booking.date_updated === undefined)
{
   errorList = { ...errorList,date_updated: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneBooking(props.match.params.id).then((res) => {
                setBooking(res.data.document)
            })
        }else{
            setBooking({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (booking.booking_no) {
               var updateResponse =  await updateBooking(booking);
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
                var addResponse = await addBooking(booking)
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
        <PageTemplate title="Add/Update Booking">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(booking!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.patient_ic_no}
type ={"text"}
onChange={(e)=>{setBooking({...booking,patient_ic_no:e.target.value});checkErrors()}}
defaultValue ={booking.patient_ic_no}
error ={(errorMessages.patient_ic_no)?true:false}
label ={"patient_ic_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.reg_no}
type ={"text"}
onChange={(e)=>{setBooking({...booking,reg_no:e.target.value});checkErrors()}}
defaultValue ={booking.reg_no}
error ={(errorMessages.reg_no)?true:false}
label ={"reg_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_panel_code}
type ={"text"}
onChange={(e)=>{setBooking({...booking,test_panel_code:e.target.value});checkErrors()}}
defaultValue ={booking.test_panel_code}
error ={(errorMessages.test_panel_code)?true:false}
label ={"test_panel_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.status}
type ={"text"}
onChange={(e)=>{setBooking({...booking,status:e.target.value});checkErrors()}}
defaultValue ={booking.status}
error ={(errorMessages.status)?true:false}
label ={"status"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.booking_date}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setBooking({...booking,booking_date:e.target.value});checkErrors()}}
defaultValue ={booking.booking_date}
error ={(errorMessages.booking_date)?true:false}
label ={"booking_date"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_submitted}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setBooking({...booking,date_submitted:e.target.value});checkErrors()}}
defaultValue ={booking.date_submitted}
error ={(errorMessages.date_submitted)?true:false}
label ={"date_submitted"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_updated}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setBooking({...booking,date_updated:e.target.value});checkErrors()}}
defaultValue ={booking.date_updated}
error ={(errorMessages.date_updated)?true:false}
label ={"date_updated"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"7"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/booking')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"8"}>
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

export default withRouter(BookingAddUpdatePage)
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
import {addBooking, getBooking,getOneBooking, updateBooking} from "../../repo/bookingRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const BookingAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [booking,setBooking] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(booking.patient_ic_no === "" || booking.patient_ic_no === undefined)
{
   errorList = { ...errorList,patient_ic_no: "Required field!"}
}
if(booking.reg_no === "" || booking.reg_no === undefined)
{
   errorList = { ...errorList,reg_no: "Required field!"}
}
if(booking.test_panel_code === "" || booking.test_panel_code === undefined)
{
   errorList = { ...errorList,test_panel_code: "Required field!"}
}
if(booking.status === "" || booking.status === undefined)
{
   errorList = { ...errorList,status: "Required field!"}
}
if(booking.booking_date === "" || booking.booking_date === undefined)
{
   errorList = { ...errorList,booking_date: "Required field!"}
}
if(booking.date_submitted === "" || booking.date_submitted === undefined)
{
   errorList = { ...errorList,date_submitted: "Required field!"}
}
if(booking.date_updated === "" || booking.date_updated === undefined)
{
   errorList = { ...errorList,date_updated: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneBooking(props.match.params.id).then((res) => {
                setBooking(res.data.document)
            })
        }else{
            setBooking({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (booking.booking_no) {
               var updateResponse =  await updateBooking(booking);
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
                var addResponse = await addBooking(booking)
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
        <PageTemplate title="Add/Update Booking">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(booking!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.patient_ic_no}
type ={"text"}
onChange={(e)=>{setBooking({...booking,patient_ic_no:e.target.value});checkErrors()}}
defaultValue ={booking.patient_ic_no}
error ={(errorMessages.patient_ic_no)?true:false}
label ={"patient_ic_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.reg_no}
type ={"text"}
onChange={(e)=>{setBooking({...booking,reg_no:e.target.value});checkErrors()}}
defaultValue ={booking.reg_no}
error ={(errorMessages.reg_no)?true:false}
label ={"reg_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_panel_code}
type ={"text"}
onChange={(e)=>{setBooking({...booking,test_panel_code:e.target.value});checkErrors()}}
defaultValue ={booking.test_panel_code}
error ={(errorMessages.test_panel_code)?true:false}
label ={"test_panel_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.status}
type ={"text"}
onChange={(e)=>{setBooking({...booking,status:e.target.value});checkErrors()}}
defaultValue ={booking.status}
error ={(errorMessages.status)?true:false}
label ={"status"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.booking_date}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setBooking({...booking,booking_date:e.target.value});checkErrors()}}
defaultValue ={booking.booking_date}
error ={(errorMessages.booking_date)?true:false}
label ={"booking_date"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_submitted}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setBooking({...booking,date_submitted:e.target.value});checkErrors()}}
defaultValue ={booking.date_submitted}
error ={(errorMessages.date_submitted)?true:false}
label ={"date_submitted"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_updated}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setBooking({...booking,date_updated:e.target.value});checkErrors()}}
defaultValue ={booking.date_updated}
error ={(errorMessages.date_updated)?true:false}
label ={"date_updated"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"7"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/booking')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"8"}>
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

export default withRouter(BookingAddUpdatePage)
