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
import {addPackage_Test_Panels, getPackage_Test_Panels,getOnePackage_Test_Panels, updatePackage_Test_Panels} from "../../repo/package_test_panelsRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Package_Test_PanelsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [package_test_panels,setPackage_Test_Panels] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(package_test_panels.test_panel_code === "" || package_test_panels.test_panel_code === undefined)
{
   errorList = { ...errorList,test_panel_code: "Required field!"}
}
if(package_test_panels.test_location === "" || package_test_panels.test_location === undefined)
{
   errorList = { ...errorList,test_location: "Required field!"}
}
if(package_test_panels.total_test_conducted === "" || package_test_panels.total_test_conducted === undefined)
{
   errorList = { ...errorList,total_test_conducted: "Required field!"}
}
if(package_test_panels.remark === "" || package_test_panels.remark === undefined)
{
   errorList = { ...errorList,remark: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOnePackage_Test_Panels(props.match.params.id).then((res) => {
                setPackage_Test_Panels(res.data.document)
            })
        }else{
            setPackage_Test_Panels({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (package_test_panels.package_code) {
               var updateResponse =  await updatePackage_Test_Panels(package_test_panels);
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
                var addResponse = await addPackage_Test_Panels(package_test_panels)
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
        <PageTemplate title="Add/Update Package_Test_Panels">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(package_test_panels!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_panel_code}
type ={"text"}
onChange={(e)=>{setPackage_Test_Panels({...package_test_panels,test_panel_code:e.target.value});checkErrors()}}
defaultValue ={package_test_panels.test_panel_code}
error ={(errorMessages.test_panel_code)?true:false}
label ={"test_panel_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_location}
type ={"text"}
onChange={(e)=>{setPackage_Test_Panels({...package_test_panels,test_location:e.target.value});checkErrors()}}
defaultValue ={package_test_panels.test_location}
error ={(errorMessages.test_location)?true:false}
label ={"test_location"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.total_test_conducted}
type ={"number"}
onChange={(e)=>{setPackage_Test_Panels({...package_test_panels,total_test_conducted:e.target.value});checkErrors()}}
defaultValue ={package_test_panels.total_test_conducted}
error ={(errorMessages.total_test_conducted)?true:false}
label ={"total_test_conducted"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.remark}
type ={"text"}
onChange={(e)=>{setPackage_Test_Panels({...package_test_panels,remark:e.target.value});checkErrors()}}
defaultValue ={package_test_panels.remark}
error ={(errorMessages.remark)?true:false}
label ={"remark"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"4"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/package_test_panels')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"5"}>
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

export default withRouter(Package_Test_PanelsAddUpdatePage)
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
import {addPackage_Test_Panels, getPackage_Test_Panels,getOnePackage_Test_Panels, updatePackage_Test_Panels} from "../../repo/package_test_panelsRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Package_Test_PanelsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [package_test_panels,setPackage_Test_Panels] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(package_test_panels.test_panel_code === "" || package_test_panels.test_panel_code === undefined)
{
   errorList = { ...errorList,test_panel_code: "Required field!"}
}
if(package_test_panels.test_location === "" || package_test_panels.test_location === undefined)
{
   errorList = { ...errorList,test_location: "Required field!"}
}
if(package_test_panels.total_test_conducted === "" || package_test_panels.total_test_conducted === undefined)
{
   errorList = { ...errorList,total_test_conducted: "Required field!"}
}
if(package_test_panels.remark === "" || package_test_panels.remark === undefined)
{
   errorList = { ...errorList,remark: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOnePackage_Test_Panels(props.match.params.id).then((res) => {
                setPackage_Test_Panels(res.data.document)
            })
        }else{
            setPackage_Test_Panels({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (package_test_panels.package_code) {
               var updateResponse =  await updatePackage_Test_Panels(package_test_panels);
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
                var addResponse = await addPackage_Test_Panels(package_test_panels)
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
        <PageTemplate title="Add/Update Package_Test_Panels">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(package_test_panels!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_panel_code}
type ={"text"}
onChange={(e)=>{setPackage_Test_Panels({...package_test_panels,test_panel_code:e.target.value});checkErrors()}}
defaultValue ={package_test_panels.test_panel_code}
error ={(errorMessages.test_panel_code)?true:false}
label ={"test_panel_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.test_location}
type ={"text"}
onChange={(e)=>{setPackage_Test_Panels({...package_test_panels,test_location:e.target.value});checkErrors()}}
defaultValue ={package_test_panels.test_location}
error ={(errorMessages.test_location)?true:false}
label ={"test_location"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.total_test_conducted}
type ={"number"}
onChange={(e)=>{setPackage_Test_Panels({...package_test_panels,total_test_conducted:e.target.value});checkErrors()}}
defaultValue ={package_test_panels.total_test_conducted}
error ={(errorMessages.total_test_conducted)?true:false}
label ={"total_test_conducted"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.remark}
type ={"text"}
onChange={(e)=>{setPackage_Test_Panels({...package_test_panels,remark:e.target.value});checkErrors()}}
defaultValue ={package_test_panels.remark}
error ={(errorMessages.remark)?true:false}
label ={"remark"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"4"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/package_test_panels')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"5"}>
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

export default withRouter(Package_Test_PanelsAddUpdatePage)
