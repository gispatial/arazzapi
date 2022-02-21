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
import {addPatient_Bak, getPatient_Bak,getOnePatient_Bak, updatePatient_Bak} from "../../repo/patient_bakRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Patient_BakAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [patient_bak,setPatient_Bak] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(patient_bak.name === "" || patient_bak.name === undefined)
{
   errorList = { ...errorList,name: "Required field!"}
}
if(patient_bak.age === "" || patient_bak.age === undefined)
{
   errorList = { ...errorList,age: "Required field!"}
}
if(patient_bak.gender === "" || patient_bak.gender === undefined)
{
   errorList = { ...errorList,gender: "Required field!"}
}
if(patient_bak.type === "" || patient_bak.type === undefined)
{
   errorList = { ...errorList,type: "Required field!"}
}
if(patient_bak.address === "" || patient_bak.address === undefined)
{
   errorList = { ...errorList,address: "Required field!"}
}
if(patient_bak.town === "" || patient_bak.town === undefined)
{
   errorList = { ...errorList,town: "Required field!"}
}
if(patient_bak.district === "" || patient_bak.district === undefined)
{
   errorList = { ...errorList,district: "Required field!"}
}
if(patient_bak.postcode === "" || patient_bak.postcode === undefined)
{
   errorList = { ...errorList,postcode: "Required field!"}
}
if(patient_bak.state === "" || patient_bak.state === undefined)
{
   errorList = { ...errorList,state: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOnePatient_Bak(props.match.params.id).then((res) => {
                setPatient_Bak(res.data.document)
            })
        }else{
            setPatient_Bak({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (patient_bak.refno) {
               var updateResponse =  await updatePatient_Bak(patient_bak);
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
                var addResponse = await addPatient_Bak(patient_bak)
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
        <PageTemplate title="Add/Update Patient_Bak">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(patient_bak!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.name}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,name:e.target.value});checkErrors()}}
defaultValue ={patient_bak.name}
error ={(errorMessages.name)?true:false}
label ={"name"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.age}
type ={"number"}
onChange={(e)=>{setPatient_Bak({...patient_bak,age:e.target.value});checkErrors()}}
defaultValue ={patient_bak.age}
error ={(errorMessages.age)?true:false}
label ={"age"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.ic_no}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,ic_no:e.target.value});checkErrors()}}
defaultValue ={patient_bak.ic_no}
error ={(errorMessages.ic_no)?true:false}
label ={"ic_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.email}
type ={"email"}
onChange={(e)=>{setPatient_Bak({...patient_bak,email:e.target.value});checkErrors()}}
defaultValue ={patient_bak.email}
error ={(errorMessages.email)?true:false}
label ={"email"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.mobile_no}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,mobile_no:e.target.value});checkErrors()}}
defaultValue ={patient_bak.mobile_no}
error ={(errorMessages.mobile_no)?true:false}
label ={"mobile_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.gender}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,gender:e.target.value});checkErrors()}}
defaultValue ={patient_bak.gender}
error ={(errorMessages.gender)?true:false}
label ={"gender"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.type}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,type:e.target.value});checkErrors()}}
defaultValue ={patient_bak.type}
error ={(errorMessages.type)?true:false}
label ={"type"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.address}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,address:e.target.value});checkErrors()}}
defaultValue ={patient_bak.address}
error ={(errorMessages.address)?true:false}
label ={"address"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.town}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,town:e.target.value});checkErrors()}}
defaultValue ={patient_bak.town}
error ={(errorMessages.town)?true:false}
label ={"town"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.district}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,district:e.target.value});checkErrors()}}
defaultValue ={patient_bak.district}
error ={(errorMessages.district)?true:false}
label ={"district"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.postcode}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,postcode:e.target.value});checkErrors()}}
defaultValue ={patient_bak.postcode}
error ={(errorMessages.postcode)?true:false}
label ={"postcode"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.state}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,state:e.target.value});checkErrors()}}
defaultValue ={patient_bak.state}
error ={(errorMessages.state)?true:false}
label ={"state"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"12"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/patient_bak')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"13"}>
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

export default withRouter(Patient_BakAddUpdatePage)
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
import {addPatient_Bak, getPatient_Bak,getOnePatient_Bak, updatePatient_Bak} from "../../repo/patient_bakRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Patient_BakAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [patient_bak,setPatient_Bak] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(patient_bak.name === "" || patient_bak.name === undefined)
{
   errorList = { ...errorList,name: "Required field!"}
}
if(patient_bak.age === "" || patient_bak.age === undefined)
{
   errorList = { ...errorList,age: "Required field!"}
}
if(patient_bak.gender === "" || patient_bak.gender === undefined)
{
   errorList = { ...errorList,gender: "Required field!"}
}
if(patient_bak.type === "" || patient_bak.type === undefined)
{
   errorList = { ...errorList,type: "Required field!"}
}
if(patient_bak.address === "" || patient_bak.address === undefined)
{
   errorList = { ...errorList,address: "Required field!"}
}
if(patient_bak.town === "" || patient_bak.town === undefined)
{
   errorList = { ...errorList,town: "Required field!"}
}
if(patient_bak.district === "" || patient_bak.district === undefined)
{
   errorList = { ...errorList,district: "Required field!"}
}
if(patient_bak.postcode === "" || patient_bak.postcode === undefined)
{
   errorList = { ...errorList,postcode: "Required field!"}
}
if(patient_bak.state === "" || patient_bak.state === undefined)
{
   errorList = { ...errorList,state: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOnePatient_Bak(props.match.params.id).then((res) => {
                setPatient_Bak(res.data.document)
            })
        }else{
            setPatient_Bak({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (patient_bak.refno) {
               var updateResponse =  await updatePatient_Bak(patient_bak);
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
                var addResponse = await addPatient_Bak(patient_bak)
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
        <PageTemplate title="Add/Update Patient_Bak">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(patient_bak!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.name}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,name:e.target.value});checkErrors()}}
defaultValue ={patient_bak.name}
error ={(errorMessages.name)?true:false}
label ={"name"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.age}
type ={"number"}
onChange={(e)=>{setPatient_Bak({...patient_bak,age:e.target.value});checkErrors()}}
defaultValue ={patient_bak.age}
error ={(errorMessages.age)?true:false}
label ={"age"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.ic_no}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,ic_no:e.target.value});checkErrors()}}
defaultValue ={patient_bak.ic_no}
error ={(errorMessages.ic_no)?true:false}
label ={"ic_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.email}
type ={"email"}
onChange={(e)=>{setPatient_Bak({...patient_bak,email:e.target.value});checkErrors()}}
defaultValue ={patient_bak.email}
error ={(errorMessages.email)?true:false}
label ={"email"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.mobile_no}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,mobile_no:e.target.value});checkErrors()}}
defaultValue ={patient_bak.mobile_no}
error ={(errorMessages.mobile_no)?true:false}
label ={"mobile_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.gender}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,gender:e.target.value});checkErrors()}}
defaultValue ={patient_bak.gender}
error ={(errorMessages.gender)?true:false}
label ={"gender"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.type}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,type:e.target.value});checkErrors()}}
defaultValue ={patient_bak.type}
error ={(errorMessages.type)?true:false}
label ={"type"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.address}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,address:e.target.value});checkErrors()}}
defaultValue ={patient_bak.address}
error ={(errorMessages.address)?true:false}
label ={"address"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.town}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,town:e.target.value});checkErrors()}}
defaultValue ={patient_bak.town}
error ={(errorMessages.town)?true:false}
label ={"town"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.district}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,district:e.target.value});checkErrors()}}
defaultValue ={patient_bak.district}
error ={(errorMessages.district)?true:false}
label ={"district"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.postcode}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,postcode:e.target.value});checkErrors()}}
defaultValue ={patient_bak.postcode}
error ={(errorMessages.postcode)?true:false}
label ={"postcode"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.state}
type ={"text"}
onChange={(e)=>{setPatient_Bak({...patient_bak,state:e.target.value});checkErrors()}}
defaultValue ={patient_bak.state}
error ={(errorMessages.state)?true:false}
label ={"state"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"12"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/patient_bak')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"13"}>
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

export default withRouter(Patient_BakAddUpdatePage)
