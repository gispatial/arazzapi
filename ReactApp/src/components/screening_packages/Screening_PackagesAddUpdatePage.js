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
import {addScreening_Packages, getScreening_Packages,getOneScreening_Packages, updateScreening_Packages} from "../../repo/screening_packagesRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Screening_PackagesAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [screening_packages,setScreening_Packages] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(screening_packages.single_package === "" || screening_packages.single_package === undefined)
{
   errorList = { ...errorList,single_package: "Required field!"}
}
if(screening_packages.category_code === "" || screening_packages.category_code === undefined)
{
   errorList = { ...errorList,category_code: "Required field!"}
}
if(screening_packages.picture_path === "" || screening_packages.picture_path === undefined)
{
   errorList = { ...errorList,picture_path: "Required field!"}
}
if(screening_packages.price === "" || screening_packages.price === undefined)
{
   errorList = { ...errorList,price: "Required field!"}
}
if(screening_packages.license_validity_year === "" || screening_packages.license_validity_year === undefined)
{
   errorList = { ...errorList,license_validity_year: "Required field!"}
}
if(screening_packages.test_included === "" || screening_packages.test_included === undefined)
{
   errorList = { ...errorList,test_included: "Required field!"}
}
if(screening_packages.note === "" || screening_packages.note === undefined)
{
   errorList = { ...errorList,note: "Required field!"}
}
if(screening_packages.commercial === "" || screening_packages.commercial === undefined)
{
   errorList = { ...errorList,commercial: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneScreening_Packages(props.match.params.id).then((res) => {
                setScreening_Packages(res.data.document)
            })
        }else{
            setScreening_Packages({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (screening_packages.package_code) {
               var updateResponse =  await updateScreening_Packages(screening_packages);
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
                var addResponse = await addScreening_Packages(screening_packages)
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
        <PageTemplate title="Add/Update Screening_Packages">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(screening_packages!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.single_package}
type ={"text"}
onChange={(e)=>{setScreening_Packages({...screening_packages,single_package:e.target.value});checkErrors()}}
defaultValue ={screening_packages.single_package}
error ={(errorMessages.single_package)?true:false}
label ={"single_package"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.category_code}
type ={"text"}
onChange={(e)=>{setScreening_Packages({...screening_packages,category_code:e.target.value});checkErrors()}}
defaultValue ={screening_packages.category_code}
error ={(errorMessages.category_code)?true:false}
label ={"category_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.picture_path}
type ={"text"}
onChange={(e)=>{setScreening_Packages({...screening_packages,picture_path:e.target.value});checkErrors()}}
defaultValue ={screening_packages.picture_path}
error ={(errorMessages.picture_path)?true:false}
label ={"picture_path"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.price}
type ={"number"}
onChange={(e)=>{setScreening_Packages({...screening_packages,price:e.target.value});checkErrors()}}
defaultValue ={screening_packages.price}
error ={(errorMessages.price)?true:false}
label ={"price"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.license_validity_year}
type ={"number"}
onChange={(e)=>{setScreening_Packages({...screening_packages,license_validity_year:e.target.value});checkErrors()}}
defaultValue ={screening_packages.license_validity_year}
error ={(errorMessages.license_validity_year)?true:false}
label ={"license_validity_year"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_included}
type ={"text"}
onChange={(e)=>{setScreening_Packages({...screening_packages,test_included:e.target.value});checkErrors()}}
defaultValue ={screening_packages.test_included}
error ={(errorMessages.test_included)?true:false}
label ={"test_included"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.note}
type ={"text"}
onChange={(e)=>{setScreening_Packages({...screening_packages,note:e.target.value});checkErrors()}}
defaultValue ={screening_packages.note}
error ={(errorMessages.note)?true:false}
label ={"note"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.commercial}
type ={"text"}
onChange={(e)=>{setScreening_Packages({...screening_packages,commercial:e.target.value});checkErrors()}}
defaultValue ={screening_packages.commercial}
error ={(errorMessages.commercial)?true:false}
label ={"commercial"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"8"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/screening_packages')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(Screening_PackagesAddUpdatePage)
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
import {addScreening_Packages, getScreening_Packages,getOneScreening_Packages, updateScreening_Packages} from "../../repo/screening_packagesRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Screening_PackagesAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [screening_packages,setScreening_Packages] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(screening_packages.single_package === "" || screening_packages.single_package === undefined)
{
   errorList = { ...errorList,single_package: "Required field!"}
}
if(screening_packages.category_code === "" || screening_packages.category_code === undefined)
{
   errorList = { ...errorList,category_code: "Required field!"}
}
if(screening_packages.picture_path === "" || screening_packages.picture_path === undefined)
{
   errorList = { ...errorList,picture_path: "Required field!"}
}
if(screening_packages.price === "" || screening_packages.price === undefined)
{
   errorList = { ...errorList,price: "Required field!"}
}
if(screening_packages.license_validity_year === "" || screening_packages.license_validity_year === undefined)
{
   errorList = { ...errorList,license_validity_year: "Required field!"}
}
if(screening_packages.test_included === "" || screening_packages.test_included === undefined)
{
   errorList = { ...errorList,test_included: "Required field!"}
}
if(screening_packages.note === "" || screening_packages.note === undefined)
{
   errorList = { ...errorList,note: "Required field!"}
}
if(screening_packages.commercial === "" || screening_packages.commercial === undefined)
{
   errorList = { ...errorList,commercial: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneScreening_Packages(props.match.params.id).then((res) => {
                setScreening_Packages(res.data.document)
            })
        }else{
            setScreening_Packages({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (screening_packages.package_code) {
               var updateResponse =  await updateScreening_Packages(screening_packages);
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
                var addResponse = await addScreening_Packages(screening_packages)
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
        <PageTemplate title="Add/Update Screening_Packages">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(screening_packages!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.single_package}
type ={"text"}
onChange={(e)=>{setScreening_Packages({...screening_packages,single_package:e.target.value});checkErrors()}}
defaultValue ={screening_packages.single_package}
error ={(errorMessages.single_package)?true:false}
label ={"single_package"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.category_code}
type ={"text"}
onChange={(e)=>{setScreening_Packages({...screening_packages,category_code:e.target.value});checkErrors()}}
defaultValue ={screening_packages.category_code}
error ={(errorMessages.category_code)?true:false}
label ={"category_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.picture_path}
type ={"text"}
onChange={(e)=>{setScreening_Packages({...screening_packages,picture_path:e.target.value});checkErrors()}}
defaultValue ={screening_packages.picture_path}
error ={(errorMessages.picture_path)?true:false}
label ={"picture_path"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.price}
type ={"number"}
onChange={(e)=>{setScreening_Packages({...screening_packages,price:e.target.value});checkErrors()}}
defaultValue ={screening_packages.price}
error ={(errorMessages.price)?true:false}
label ={"price"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.license_validity_year}
type ={"number"}
onChange={(e)=>{setScreening_Packages({...screening_packages,license_validity_year:e.target.value});checkErrors()}}
defaultValue ={screening_packages.license_validity_year}
error ={(errorMessages.license_validity_year)?true:false}
label ={"license_validity_year"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_included}
type ={"text"}
onChange={(e)=>{setScreening_Packages({...screening_packages,test_included:e.target.value});checkErrors()}}
defaultValue ={screening_packages.test_included}
error ={(errorMessages.test_included)?true:false}
label ={"test_included"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.note}
type ={"text"}
onChange={(e)=>{setScreening_Packages({...screening_packages,note:e.target.value});checkErrors()}}
defaultValue ={screening_packages.note}
error ={(errorMessages.note)?true:false}
label ={"note"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.commercial}
type ={"text"}
onChange={(e)=>{setScreening_Packages({...screening_packages,commercial:e.target.value});checkErrors()}}
defaultValue ={screening_packages.commercial}
error ={(errorMessages.commercial)?true:false}
label ={"commercial"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"8"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/screening_packages')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(Screening_PackagesAddUpdatePage)
