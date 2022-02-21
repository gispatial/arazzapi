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
import {addMedication_Prescription, getMedication_Prescription,getOneMedication_Prescription, updateMedication_Prescription} from "../../repo/medication_prescriptionRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Medication_PrescriptionAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [medication_prescription,setMedication_Prescription] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(medication_prescription.medication_id === "" || medication_prescription.medication_id === undefined)
{
   errorList = { ...errorList,medication_id: "Required field!"}
}
if(medication_prescription.doctor_id === "" || medication_prescription.doctor_id === undefined)
{
   errorList = { ...errorList,doctor_id: "Required field!"}
}
if(medication_prescription.patient_id === "" || medication_prescription.patient_id === undefined)
{
   errorList = { ...errorList,patient_id: "Required field!"}
}
if(medication_prescription.no === "" || medication_prescription.no === undefined)
{
   errorList = { ...errorList,no: "Required field!"}
}
if(medication_prescription.date === "" || medication_prescription.date === undefined)
{
   errorList = { ...errorList,date: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneMedication_Prescription(props.match.params.id).then((res) => {
                setMedication_Prescription(res.data.document)
            })
        }else{
            setMedication_Prescription({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (medication_prescription.ERROR_NOPRIMARYKEYFOUND) {
               var updateResponse =  await updateMedication_Prescription(medication_prescription);
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
                var addResponse = await addMedication_Prescription(medication_prescription)
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
        <PageTemplate title="Add/Update Medication_Prescription">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(medication_prescription!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.medication_id}
type ={"number"}
onChange={(e)=>{setMedication_Prescription({...medication_prescription,medication_id:e.target.value});checkErrors()}}
defaultValue ={medication_prescription.medication_id}
error ={(errorMessages.medication_id)?true:false}
label ={"medication_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.doctor_id}
type ={"number"}
onChange={(e)=>{setMedication_Prescription({...medication_prescription,doctor_id:e.target.value});checkErrors()}}
defaultValue ={medication_prescription.doctor_id}
error ={(errorMessages.doctor_id)?true:false}
label ={"doctor_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.patient_id}
type ={"number"}
onChange={(e)=>{setMedication_Prescription({...medication_prescription,patient_id:e.target.value});checkErrors()}}
defaultValue ={medication_prescription.patient_id}
error ={(errorMessages.patient_id)?true:false}
label ={"patient_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.no}
type ={"text"}
onChange={(e)=>{setMedication_Prescription({...medication_prescription,no:e.target.value});checkErrors()}}
defaultValue ={medication_prescription.no}
error ={(errorMessages.no)?true:false}
label ={"no"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setMedication_Prescription({...medication_prescription,date:e.target.value});checkErrors()}}
defaultValue ={medication_prescription.date}
error ={(errorMessages.date)?true:false}
label ={"date"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"5"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/medication_prescription')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(Medication_PrescriptionAddUpdatePage)
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
import {addMedication_Prescription, getMedication_Prescription,getOneMedication_Prescription, updateMedication_Prescription} from "../../repo/medication_prescriptionRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Medication_PrescriptionAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [medication_prescription,setMedication_Prescription] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(medication_prescription.medication_id === "" || medication_prescription.medication_id === undefined)
{
   errorList = { ...errorList,medication_id: "Required field!"}
}
if(medication_prescription.doctor_id === "" || medication_prescription.doctor_id === undefined)
{
   errorList = { ...errorList,doctor_id: "Required field!"}
}
if(medication_prescription.patient_id === "" || medication_prescription.patient_id === undefined)
{
   errorList = { ...errorList,patient_id: "Required field!"}
}
if(medication_prescription.no === "" || medication_prescription.no === undefined)
{
   errorList = { ...errorList,no: "Required field!"}
}
if(medication_prescription.date === "" || medication_prescription.date === undefined)
{
   errorList = { ...errorList,date: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneMedication_Prescription(props.match.params.id).then((res) => {
                setMedication_Prescription(res.data.document)
            })
        }else{
            setMedication_Prescription({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (medication_prescription.ERROR_NOPRIMARYKEYFOUND) {
               var updateResponse =  await updateMedication_Prescription(medication_prescription);
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
                var addResponse = await addMedication_Prescription(medication_prescription)
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
        <PageTemplate title="Add/Update Medication_Prescription">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(medication_prescription!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.medication_id}
type ={"number"}
onChange={(e)=>{setMedication_Prescription({...medication_prescription,medication_id:e.target.value});checkErrors()}}
defaultValue ={medication_prescription.medication_id}
error ={(errorMessages.medication_id)?true:false}
label ={"medication_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.doctor_id}
type ={"number"}
onChange={(e)=>{setMedication_Prescription({...medication_prescription,doctor_id:e.target.value});checkErrors()}}
defaultValue ={medication_prescription.doctor_id}
error ={(errorMessages.doctor_id)?true:false}
label ={"doctor_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.patient_id}
type ={"number"}
onChange={(e)=>{setMedication_Prescription({...medication_prescription,patient_id:e.target.value});checkErrors()}}
defaultValue ={medication_prescription.patient_id}
error ={(errorMessages.patient_id)?true:false}
label ={"patient_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.no}
type ={"text"}
onChange={(e)=>{setMedication_Prescription({...medication_prescription,no:e.target.value});checkErrors()}}
defaultValue ={medication_prescription.no}
error ={(errorMessages.no)?true:false}
label ={"no"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setMedication_Prescription({...medication_prescription,date:e.target.value});checkErrors()}}
defaultValue ={medication_prescription.date}
error ={(errorMessages.date)?true:false}
label ={"date"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"5"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/medication_prescription')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(Medication_PrescriptionAddUpdatePage)
