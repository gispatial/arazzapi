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
import {addPerson, getPerson,getOnePerson, updatePerson} from "../../repo/personRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const PersonAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [person,setPerson] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(person.name === "" || person.name === undefined)
{
   errorList = { ...errorList,name: "Required field!"}
}
if(person.age === "" || person.age === undefined)
{
   errorList = { ...errorList,age: "Required field!"}
}
if(person.email === "" || validateEmail(person.email) === false)
{
   errorList = { ...errorList,email: "Enter a valid email!"}
}
if(person.mobile_no === "" || person.mobile_no === undefined)
{
   errorList = { ...errorList,mobile_no: "Required field!"}
}
if(person.gender === "" || person.gender === undefined)
{
   errorList = { ...errorList,gender: "Required field!"}
}
if(person.patient_type_code === "" || person.patient_type_code === undefined)
{
   errorList = { ...errorList,patient_type_code: "Required field!"}
}
if(person.address === "" || person.address === undefined)
{
   errorList = { ...errorList,address: "Required field!"}
}
if(person.town === "" || person.town === undefined)
{
   errorList = { ...errorList,town: "Required field!"}
}
if(person.district === "" || person.district === undefined)
{
   errorList = { ...errorList,district: "Required field!"}
}
if(person.postcode === "" || person.postcode === undefined)
{
   errorList = { ...errorList,postcode: "Required field!"}
}
if(person.state === "" || person.state === undefined)
{
   errorList = { ...errorList,state: "Required field!"}
}
if(person.photo_path === "" || person.photo_path === undefined)
{
   errorList = { ...errorList,photo_path: "Required field!"}
}
if(person.relationship === "" || person.relationship === undefined)
{
   errorList = { ...errorList,relationship: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOnePerson(props.match.params.id).then((res) => {
                setPerson(res.data.document)
            })
        }else{
            setPerson({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (person.ic_no) {
               var updateResponse =  await updatePerson(person);
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
                var addResponse = await addPerson(person)
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
        <PageTemplate title="Add/Update Person">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(person!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.reg_no}
type ={"text"}
onChange={(e)=>{setPerson({...person,reg_no:e.target.value});checkErrors()}}
defaultValue ={person.reg_no}
error ={(errorMessages.reg_no)?true:false}
label ={"reg_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.name}
type ={"text"}
onChange={(e)=>{setPerson({...person,name:e.target.value});checkErrors()}}
defaultValue ={person.name}
error ={(errorMessages.name)?true:false}
label ={"name"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.age}
type ={"number"}
onChange={(e)=>{setPerson({...person,age:e.target.value});checkErrors()}}
defaultValue ={person.age}
error ={(errorMessages.age)?true:false}
label ={"age"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.email}
type ={"email"}
onChange={(e)=>{setPerson({...person,email:e.target.value});checkErrors()}}
defaultValue ={person.email}
error ={(errorMessages.email)?true:false}
label ={"email"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.mobile_no}
type ={"text"}
onChange={(e)=>{setPerson({...person,mobile_no:e.target.value});checkErrors()}}
defaultValue ={person.mobile_no}
error ={(errorMessages.mobile_no)?true:false}
label ={"mobile_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.gender}
type ={"text"}
onChange={(e)=>{setPerson({...person,gender:e.target.value});checkErrors()}}
defaultValue ={person.gender}
error ={(errorMessages.gender)?true:false}
label ={"gender"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.patient_type_code}
type ={"text"}
onChange={(e)=>{setPerson({...person,patient_type_code:e.target.value});checkErrors()}}
defaultValue ={person.patient_type_code}
error ={(errorMessages.patient_type_code)?true:false}
label ={"patient_type_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.address}
type ={"text"}
onChange={(e)=>{setPerson({...person,address:e.target.value});checkErrors()}}
defaultValue ={person.address}
error ={(errorMessages.address)?true:false}
label ={"address"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.town}
type ={"text"}
onChange={(e)=>{setPerson({...person,town:e.target.value});checkErrors()}}
defaultValue ={person.town}
error ={(errorMessages.town)?true:false}
label ={"town"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.district}
type ={"text"}
onChange={(e)=>{setPerson({...person,district:e.target.value});checkErrors()}}
defaultValue ={person.district}
error ={(errorMessages.district)?true:false}
label ={"district"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.postcode}
type ={"text"}
onChange={(e)=>{setPerson({...person,postcode:e.target.value});checkErrors()}}
defaultValue ={person.postcode}
error ={(errorMessages.postcode)?true:false}
label ={"postcode"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.state}
type ={"text"}
onChange={(e)=>{setPerson({...person,state:e.target.value});checkErrors()}}
defaultValue ={person.state}
error ={(errorMessages.state)?true:false}
label ={"state"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.photo_path}
type ={"text"}
onChange={(e)=>{setPerson({...person,photo_path:e.target.value});checkErrors()}}
defaultValue ={person.photo_path}
error ={(errorMessages.photo_path)?true:false}
label ={"photo_path"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.relationship}
type ={"text"}
onChange={(e)=>{setPerson({...person,relationship:e.target.value});checkErrors()}}
defaultValue ={person.relationship}
error ={(errorMessages.relationship)?true:false}
label ={"relationship"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"14"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/person')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"15"}>
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

export default withRouter(PersonAddUpdatePage)
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
import {addPerson, getPerson,getOnePerson, updatePerson} from "../../repo/personRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const PersonAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [person,setPerson] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(person.name === "" || person.name === undefined)
{
   errorList = { ...errorList,name: "Required field!"}
}
if(person.age === "" || person.age === undefined)
{
   errorList = { ...errorList,age: "Required field!"}
}
if(person.email === "" || validateEmail(person.email) === false)
{
   errorList = { ...errorList,email: "Enter a valid email!"}
}
if(person.mobile_no === "" || person.mobile_no === undefined)
{
   errorList = { ...errorList,mobile_no: "Required field!"}
}
if(person.gender === "" || person.gender === undefined)
{
   errorList = { ...errorList,gender: "Required field!"}
}
if(person.patient_type_code === "" || person.patient_type_code === undefined)
{
   errorList = { ...errorList,patient_type_code: "Required field!"}
}
if(person.address === "" || person.address === undefined)
{
   errorList = { ...errorList,address: "Required field!"}
}
if(person.town === "" || person.town === undefined)
{
   errorList = { ...errorList,town: "Required field!"}
}
if(person.district === "" || person.district === undefined)
{
   errorList = { ...errorList,district: "Required field!"}
}
if(person.postcode === "" || person.postcode === undefined)
{
   errorList = { ...errorList,postcode: "Required field!"}
}
if(person.state === "" || person.state === undefined)
{
   errorList = { ...errorList,state: "Required field!"}
}
if(person.photo_path === "" || person.photo_path === undefined)
{
   errorList = { ...errorList,photo_path: "Required field!"}
}
if(person.relationship === "" || person.relationship === undefined)
{
   errorList = { ...errorList,relationship: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOnePerson(props.match.params.id).then((res) => {
                setPerson(res.data.document)
            })
        }else{
            setPerson({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (person.ic_no) {
               var updateResponse =  await updatePerson(person);
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
                var addResponse = await addPerson(person)
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
        <PageTemplate title="Add/Update Person">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(person!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.reg_no}
type ={"text"}
onChange={(e)=>{setPerson({...person,reg_no:e.target.value});checkErrors()}}
defaultValue ={person.reg_no}
error ={(errorMessages.reg_no)?true:false}
label ={"reg_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.name}
type ={"text"}
onChange={(e)=>{setPerson({...person,name:e.target.value});checkErrors()}}
defaultValue ={person.name}
error ={(errorMessages.name)?true:false}
label ={"name"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.age}
type ={"number"}
onChange={(e)=>{setPerson({...person,age:e.target.value});checkErrors()}}
defaultValue ={person.age}
error ={(errorMessages.age)?true:false}
label ={"age"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.email}
type ={"email"}
onChange={(e)=>{setPerson({...person,email:e.target.value});checkErrors()}}
defaultValue ={person.email}
error ={(errorMessages.email)?true:false}
label ={"email"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.mobile_no}
type ={"text"}
onChange={(e)=>{setPerson({...person,mobile_no:e.target.value});checkErrors()}}
defaultValue ={person.mobile_no}
error ={(errorMessages.mobile_no)?true:false}
label ={"mobile_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.gender}
type ={"text"}
onChange={(e)=>{setPerson({...person,gender:e.target.value});checkErrors()}}
defaultValue ={person.gender}
error ={(errorMessages.gender)?true:false}
label ={"gender"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.patient_type_code}
type ={"text"}
onChange={(e)=>{setPerson({...person,patient_type_code:e.target.value});checkErrors()}}
defaultValue ={person.patient_type_code}
error ={(errorMessages.patient_type_code)?true:false}
label ={"patient_type_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.address}
type ={"text"}
onChange={(e)=>{setPerson({...person,address:e.target.value});checkErrors()}}
defaultValue ={person.address}
error ={(errorMessages.address)?true:false}
label ={"address"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.town}
type ={"text"}
onChange={(e)=>{setPerson({...person,town:e.target.value});checkErrors()}}
defaultValue ={person.town}
error ={(errorMessages.town)?true:false}
label ={"town"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.district}
type ={"text"}
onChange={(e)=>{setPerson({...person,district:e.target.value});checkErrors()}}
defaultValue ={person.district}
error ={(errorMessages.district)?true:false}
label ={"district"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.postcode}
type ={"text"}
onChange={(e)=>{setPerson({...person,postcode:e.target.value});checkErrors()}}
defaultValue ={person.postcode}
error ={(errorMessages.postcode)?true:false}
label ={"postcode"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.state}
type ={"text"}
onChange={(e)=>{setPerson({...person,state:e.target.value});checkErrors()}}
defaultValue ={person.state}
error ={(errorMessages.state)?true:false}
label ={"state"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.photo_path}
type ={"text"}
onChange={(e)=>{setPerson({...person,photo_path:e.target.value});checkErrors()}}
defaultValue ={person.photo_path}
error ={(errorMessages.photo_path)?true:false}
label ={"photo_path"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.relationship}
type ={"text"}
onChange={(e)=>{setPerson({...person,relationship:e.target.value});checkErrors()}}
defaultValue ={person.relationship}
error ={(errorMessages.relationship)?true:false}
label ={"relationship"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"14"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/person')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"15"}>
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

export default withRouter(PersonAddUpdatePage)
