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
import {addRegistration_Person, getRegistration_Person,getOneRegistration_Person, updateRegistration_Person} from "../../repo/registration_personRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Registration_PersonAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [registration_person,setRegistration_Person] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(registration_person.ic_no === "" || registration_person.ic_no === undefined)
{
   errorList = { ...errorList,ic_no: "Required field!"}
}
if(registration_person.username === "" || registration_person.username === undefined)
{
   errorList = { ...errorList,username: "Required field!"}
}
if(registration_person.person_type_code === "" || registration_person.person_type_code === undefined)
{
   errorList = { ...errorList,person_type_code: "Required field!"}
}
if(registration_person.admin_type === "" || registration_person.admin_type === undefined)
{
   errorList = { ...errorList,admin_type: "Required field!"}
}
if(registration_person.patient_type_code === "" || registration_person.patient_type_code === undefined)
{
   errorList = { ...errorList,patient_type_code: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneRegistration_Person(props.match.params.id).then((res) => {
                setRegistration_Person(res.data.document)
            })
        }else{
            setRegistration_Person({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (registration_person.reg_no) {
               var updateResponse =  await updateRegistration_Person(registration_person);
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
                var addResponse = await addRegistration_Person(registration_person)
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
        <PageTemplate title="Add/Update Registration_Person">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(registration_person!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.ic_no}
type ={"text"}
onChange={(e)=>{setRegistration_Person({...registration_person,ic_no:e.target.value});checkErrors()}}
defaultValue ={registration_person.ic_no}
error ={(errorMessages.ic_no)?true:false}
label ={"ic_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.username}
type ={"text"}
onChange={(e)=>{setRegistration_Person({...registration_person,username:e.target.value});checkErrors()}}
defaultValue ={registration_person.username}
error ={(errorMessages.username)?true:false}
label ={"username"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.person_type_code}
type ={"text"}
onChange={(e)=>{setRegistration_Person({...registration_person,person_type_code:e.target.value});checkErrors()}}
defaultValue ={registration_person.person_type_code}
error ={(errorMessages.person_type_code)?true:false}
label ={"person_type_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.admin_type}
type ={"text"}
onChange={(e)=>{setRegistration_Person({...registration_person,admin_type:e.target.value});checkErrors()}}
defaultValue ={registration_person.admin_type}
error ={(errorMessages.admin_type)?true:false}
label ={"admin_type"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.patient_type_code}
type ={"text"}
onChange={(e)=>{setRegistration_Person({...registration_person,patient_type_code:e.target.value});checkErrors()}}
defaultValue ={registration_person.patient_type_code}
error ={(errorMessages.patient_type_code)?true:false}
label ={"patient_type_code"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"5"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/registration_person')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(Registration_PersonAddUpdatePage)
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
import {addRegistration_Person, getRegistration_Person,getOneRegistration_Person, updateRegistration_Person} from "../../repo/registration_personRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Registration_PersonAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [registration_person,setRegistration_Person] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(registration_person.ic_no === "" || registration_person.ic_no === undefined)
{
   errorList = { ...errorList,ic_no: "Required field!"}
}
if(registration_person.username === "" || registration_person.username === undefined)
{
   errorList = { ...errorList,username: "Required field!"}
}
if(registration_person.person_type_code === "" || registration_person.person_type_code === undefined)
{
   errorList = { ...errorList,person_type_code: "Required field!"}
}
if(registration_person.admin_type === "" || registration_person.admin_type === undefined)
{
   errorList = { ...errorList,admin_type: "Required field!"}
}
if(registration_person.patient_type_code === "" || registration_person.patient_type_code === undefined)
{
   errorList = { ...errorList,patient_type_code: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneRegistration_Person(props.match.params.id).then((res) => {
                setRegistration_Person(res.data.document)
            })
        }else{
            setRegistration_Person({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (registration_person.reg_no) {
               var updateResponse =  await updateRegistration_Person(registration_person);
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
                var addResponse = await addRegistration_Person(registration_person)
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
        <PageTemplate title="Add/Update Registration_Person">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(registration_person!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.ic_no}
type ={"text"}
onChange={(e)=>{setRegistration_Person({...registration_person,ic_no:e.target.value});checkErrors()}}
defaultValue ={registration_person.ic_no}
error ={(errorMessages.ic_no)?true:false}
label ={"ic_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.username}
type ={"text"}
onChange={(e)=>{setRegistration_Person({...registration_person,username:e.target.value});checkErrors()}}
defaultValue ={registration_person.username}
error ={(errorMessages.username)?true:false}
label ={"username"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.person_type_code}
type ={"text"}
onChange={(e)=>{setRegistration_Person({...registration_person,person_type_code:e.target.value});checkErrors()}}
defaultValue ={registration_person.person_type_code}
error ={(errorMessages.person_type_code)?true:false}
label ={"person_type_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.admin_type}
type ={"text"}
onChange={(e)=>{setRegistration_Person({...registration_person,admin_type:e.target.value});checkErrors()}}
defaultValue ={registration_person.admin_type}
error ={(errorMessages.admin_type)?true:false}
label ={"admin_type"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.patient_type_code}
type ={"text"}
onChange={(e)=>{setRegistration_Person({...registration_person,patient_type_code:e.target.value});checkErrors()}}
defaultValue ={registration_person.patient_type_code}
error ={(errorMessages.patient_type_code)?true:false}
label ={"patient_type_code"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"5"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/registration_person')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(Registration_PersonAddUpdatePage)
