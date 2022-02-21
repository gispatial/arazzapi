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
import {addUser_Account, getUser_Account,getOneUser_Account, updateUser_Account} from "../../repo/user_accountRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const User_AccountAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [user_account,setUser_Account] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(user_account.reg_no === "" || user_account.reg_no === undefined)
{
   errorList = { ...errorList,reg_no: "Required field!"}
}
if(user_account.password === "" || user_account.password === undefined)
{
   errorList = { ...errorList,password: "Required field!"}
}
if(user_account.name === "" || user_account.name === undefined)
{
   errorList = { ...errorList,name: "Required field!"}
}
if(user_account.ic_no === "" || user_account.ic_no === undefined)
{
   errorList = { ...errorList,ic_no: "Required field!"}
}
if(user_account.email === "" || validateEmail(user_account.email) === false)
{
   errorList = { ...errorList,email: "Enter a valid email!"}
}
if(user_account.acc_type_code === "" || user_account.acc_type_code === undefined)
{
   errorList = { ...errorList,acc_type_code: "Required field!"}
}
if(user_account.menu_owner === "" || user_account.menu_owner === undefined)
{
   errorList = { ...errorList,menu_owner: "Required field!"}
}
if(user_account.acc_status_code === "" || user_account.acc_status_code === undefined)
{
   errorList = { ...errorList,acc_status_code: "Required field!"}
}
if(user_account.date_created === "" || user_account.date_created === undefined)
{
   errorList = { ...errorList,date_created: "Required field!"}
}
if(user_account.date_updated === "" || user_account.date_updated === undefined)
{
   errorList = { ...errorList,date_updated: "Required field!"}
}
if(user_account.last_login === "" || user_account.last_login === undefined)
{
   errorList = { ...errorList,last_login: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneUser_Account(props.match.params.id).then((res) => {
                setUser_Account(res.data.document)
            })
        }else{
            setUser_Account({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (user_account.username) {
               var updateResponse =  await updateUser_Account(user_account);
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
                var addResponse = await addUser_Account(user_account)
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
        <PageTemplate title="Add/Update User_Account">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(user_account!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.reg_no}
type ={"text"}
onChange={(e)=>{setUser_Account({...user_account,reg_no:e.target.value});checkErrors()}}
defaultValue ={user_account.reg_no}
error ={(errorMessages.reg_no)?true:false}
label ={"reg_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.password}
type ={"password"}
onChange={(e)=>{setUser_Account({...user_account,password:e.target.value});checkErrors()}}
defaultValue ={user_account.password}
error ={(errorMessages.password)?true:false}
label ={"password"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.name}
type ={"text"}
onChange={(e)=>{setUser_Account({...user_account,name:e.target.value});checkErrors()}}
defaultValue ={user_account.name}
error ={(errorMessages.name)?true:false}
label ={"name"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.ic_no}
type ={"text"}
onChange={(e)=>{setUser_Account({...user_account,ic_no:e.target.value});checkErrors()}}
defaultValue ={user_account.ic_no}
error ={(errorMessages.ic_no)?true:false}
label ={"ic_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.email}
type ={"email"}
onChange={(e)=>{setUser_Account({...user_account,email:e.target.value});checkErrors()}}
defaultValue ={user_account.email}
error ={(errorMessages.email)?true:false}
label ={"email"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.acc_type_code}
type ={"text"}
onChange={(e)=>{setUser_Account({...user_account,acc_type_code:e.target.value});checkErrors()}}
defaultValue ={user_account.acc_type_code}
error ={(errorMessages.acc_type_code)?true:false}
label ={"acc_type_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.menu_owner}
type ={"text"}
onChange={(e)=>{setUser_Account({...user_account,menu_owner:e.target.value});checkErrors()}}
defaultValue ={user_account.menu_owner}
error ={(errorMessages.menu_owner)?true:false}
label ={"menu_owner"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.acc_status_code}
type ={"text"}
onChange={(e)=>{setUser_Account({...user_account,acc_status_code:e.target.value});checkErrors()}}
defaultValue ={user_account.acc_status_code}
error ={(errorMessages.acc_status_code)?true:false}
label ={"acc_status_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_created}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setUser_Account({...user_account,date_created:e.target.value});checkErrors()}}
defaultValue ={user_account.date_created}
error ={(errorMessages.date_created)?true:false}
label ={"date_created"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_updated}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setUser_Account({...user_account,date_updated:e.target.value});checkErrors()}}
defaultValue ={user_account.date_updated}
error ={(errorMessages.date_updated)?true:false}
label ={"date_updated"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.last_login}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setUser_Account({...user_account,last_login:e.target.value});checkErrors()}}
defaultValue ={user_account.last_login}
error ={(errorMessages.last_login)?true:false}
label ={"last_login"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"11"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/user_account')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"12"}>
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

export default withRouter(User_AccountAddUpdatePage)
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
import {addUser_Account, getUser_Account,getOneUser_Account, updateUser_Account} from "../../repo/user_accountRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const User_AccountAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [user_account,setUser_Account] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(user_account.reg_no === "" || user_account.reg_no === undefined)
{
   errorList = { ...errorList,reg_no: "Required field!"}
}
if(user_account.password === "" || user_account.password === undefined)
{
   errorList = { ...errorList,password: "Required field!"}
}
if(user_account.name === "" || user_account.name === undefined)
{
   errorList = { ...errorList,name: "Required field!"}
}
if(user_account.ic_no === "" || user_account.ic_no === undefined)
{
   errorList = { ...errorList,ic_no: "Required field!"}
}
if(user_account.email === "" || validateEmail(user_account.email) === false)
{
   errorList = { ...errorList,email: "Enter a valid email!"}
}
if(user_account.acc_type_code === "" || user_account.acc_type_code === undefined)
{
   errorList = { ...errorList,acc_type_code: "Required field!"}
}
if(user_account.menu_owner === "" || user_account.menu_owner === undefined)
{
   errorList = { ...errorList,menu_owner: "Required field!"}
}
if(user_account.acc_status_code === "" || user_account.acc_status_code === undefined)
{
   errorList = { ...errorList,acc_status_code: "Required field!"}
}
if(user_account.date_created === "" || user_account.date_created === undefined)
{
   errorList = { ...errorList,date_created: "Required field!"}
}
if(user_account.date_updated === "" || user_account.date_updated === undefined)
{
   errorList = { ...errorList,date_updated: "Required field!"}
}
if(user_account.last_login === "" || user_account.last_login === undefined)
{
   errorList = { ...errorList,last_login: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneUser_Account(props.match.params.id).then((res) => {
                setUser_Account(res.data.document)
            })
        }else{
            setUser_Account({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (user_account.username) {
               var updateResponse =  await updateUser_Account(user_account);
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
                var addResponse = await addUser_Account(user_account)
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
        <PageTemplate title="Add/Update User_Account">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(user_account!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.reg_no}
type ={"text"}
onChange={(e)=>{setUser_Account({...user_account,reg_no:e.target.value});checkErrors()}}
defaultValue ={user_account.reg_no}
error ={(errorMessages.reg_no)?true:false}
label ={"reg_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.password}
type ={"password"}
onChange={(e)=>{setUser_Account({...user_account,password:e.target.value});checkErrors()}}
defaultValue ={user_account.password}
error ={(errorMessages.password)?true:false}
label ={"password"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.name}
type ={"text"}
onChange={(e)=>{setUser_Account({...user_account,name:e.target.value});checkErrors()}}
defaultValue ={user_account.name}
error ={(errorMessages.name)?true:false}
label ={"name"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.ic_no}
type ={"text"}
onChange={(e)=>{setUser_Account({...user_account,ic_no:e.target.value});checkErrors()}}
defaultValue ={user_account.ic_no}
error ={(errorMessages.ic_no)?true:false}
label ={"ic_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.email}
type ={"email"}
onChange={(e)=>{setUser_Account({...user_account,email:e.target.value});checkErrors()}}
defaultValue ={user_account.email}
error ={(errorMessages.email)?true:false}
label ={"email"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.acc_type_code}
type ={"text"}
onChange={(e)=>{setUser_Account({...user_account,acc_type_code:e.target.value});checkErrors()}}
defaultValue ={user_account.acc_type_code}
error ={(errorMessages.acc_type_code)?true:false}
label ={"acc_type_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.menu_owner}
type ={"text"}
onChange={(e)=>{setUser_Account({...user_account,menu_owner:e.target.value});checkErrors()}}
defaultValue ={user_account.menu_owner}
error ={(errorMessages.menu_owner)?true:false}
label ={"menu_owner"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.acc_status_code}
type ={"text"}
onChange={(e)=>{setUser_Account({...user_account,acc_status_code:e.target.value});checkErrors()}}
defaultValue ={user_account.acc_status_code}
error ={(errorMessages.acc_status_code)?true:false}
label ={"acc_status_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_created}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setUser_Account({...user_account,date_created:e.target.value});checkErrors()}}
defaultValue ={user_account.date_created}
error ={(errorMessages.date_created)?true:false}
label ={"date_created"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_updated}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setUser_Account({...user_account,date_updated:e.target.value});checkErrors()}}
defaultValue ={user_account.date_updated}
error ={(errorMessages.date_updated)?true:false}
label ={"date_updated"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.last_login}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setUser_Account({...user_account,last_login:e.target.value});checkErrors()}}
defaultValue ={user_account.last_login}
error ={(errorMessages.last_login)?true:false}
label ={"last_login"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"11"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/user_account')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"12"}>
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

export default withRouter(User_AccountAddUpdatePage)
