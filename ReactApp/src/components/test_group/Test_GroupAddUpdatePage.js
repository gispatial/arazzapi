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
import {addTest_Group, getTest_Group,getOneTest_Group, updateTest_Group} from "../../repo/test_groupRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Test_GroupAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [test_group,setTest_Group] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(test_group.group_name === "" || test_group.group_name === undefined)
{
   errorList = { ...errorList,group_name: "Required field!"}
}
if(test_group.patient_type === "" || test_group.patient_type === undefined)
{
   errorList = { ...errorList,patient_type: "Required field!"}
}
if(test_group.package_category === "" || test_group.package_category === undefined)
{
   errorList = { ...errorList,package_category: "Required field!"}
}
if(test_group.price === "" || test_group.price === undefined)
{
   errorList = { ...errorList,price: "Required field!"}
}
if(test_group.enabled === "" || test_group.enabled === undefined)
{
   errorList = { ...errorList,enabled: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneTest_Group(props.match.params.id).then((res) => {
                setTest_Group(res.data.document)
            })
        }else{
            setTest_Group({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (test_group.test_group_code) {
               var updateResponse =  await updateTest_Group(test_group);
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
                var addResponse = await addTest_Group(test_group)
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
        <PageTemplate title="Add/Update Test_Group">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(test_group!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.group_name}
type ={"text"}
onChange={(e)=>{setTest_Group({...test_group,group_name:e.target.value});checkErrors()}}
defaultValue ={test_group.group_name}
error ={(errorMessages.group_name)?true:false}
label ={"group_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.patient_type}
type ={"text"}
onChange={(e)=>{setTest_Group({...test_group,patient_type:e.target.value});checkErrors()}}
defaultValue ={test_group.patient_type}
error ={(errorMessages.patient_type)?true:false}
label ={"patient_type"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.package_category}
type ={"text"}
onChange={(e)=>{setTest_Group({...test_group,package_category:e.target.value});checkErrors()}}
defaultValue ={test_group.package_category}
error ={(errorMessages.package_category)?true:false}
label ={"package_category"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.price}
type ={"number"}
onChange={(e)=>{setTest_Group({...test_group,price:e.target.value});checkErrors()}}
defaultValue ={test_group.price}
error ={(errorMessages.price)?true:false}
label ={"price"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.enabled}
type ={"text"}
onChange={(e)=>{setTest_Group({...test_group,enabled:e.target.value});checkErrors()}}
defaultValue ={test_group.enabled}
error ={(errorMessages.enabled)?true:false}
label ={"enabled"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"5"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/test_group')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(Test_GroupAddUpdatePage)
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
import {addTest_Group, getTest_Group,getOneTest_Group, updateTest_Group} from "../../repo/test_groupRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Test_GroupAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [test_group,setTest_Group] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(test_group.group_name === "" || test_group.group_name === undefined)
{
   errorList = { ...errorList,group_name: "Required field!"}
}
if(test_group.patient_type === "" || test_group.patient_type === undefined)
{
   errorList = { ...errorList,patient_type: "Required field!"}
}
if(test_group.package_category === "" || test_group.package_category === undefined)
{
   errorList = { ...errorList,package_category: "Required field!"}
}
if(test_group.price === "" || test_group.price === undefined)
{
   errorList = { ...errorList,price: "Required field!"}
}
if(test_group.enabled === "" || test_group.enabled === undefined)
{
   errorList = { ...errorList,enabled: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneTest_Group(props.match.params.id).then((res) => {
                setTest_Group(res.data.document)
            })
        }else{
            setTest_Group({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (test_group.test_group_code) {
               var updateResponse =  await updateTest_Group(test_group);
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
                var addResponse = await addTest_Group(test_group)
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
        <PageTemplate title="Add/Update Test_Group">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(test_group!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.group_name}
type ={"text"}
onChange={(e)=>{setTest_Group({...test_group,group_name:e.target.value});checkErrors()}}
defaultValue ={test_group.group_name}
error ={(errorMessages.group_name)?true:false}
label ={"group_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.patient_type}
type ={"text"}
onChange={(e)=>{setTest_Group({...test_group,patient_type:e.target.value});checkErrors()}}
defaultValue ={test_group.patient_type}
error ={(errorMessages.patient_type)?true:false}
label ={"patient_type"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.package_category}
type ={"text"}
onChange={(e)=>{setTest_Group({...test_group,package_category:e.target.value});checkErrors()}}
defaultValue ={test_group.package_category}
error ={(errorMessages.package_category)?true:false}
label ={"package_category"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.price}
type ={"number"}
onChange={(e)=>{setTest_Group({...test_group,price:e.target.value});checkErrors()}}
defaultValue ={test_group.price}
error ={(errorMessages.price)?true:false}
label ={"price"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.enabled}
type ={"text"}
onChange={(e)=>{setTest_Group({...test_group,enabled:e.target.value});checkErrors()}}
defaultValue ={test_group.enabled}
error ={(errorMessages.enabled)?true:false}
label ={"enabled"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"5"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/test_group')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(Test_GroupAddUpdatePage)
