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
import {addCompany, getCompany,getOneCompany, updateCompany} from "../../repo/companyRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const CompanyAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [company,setCompany] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(company.co_reg_no === "" || company.co_reg_no === undefined)
{
   errorList = { ...errorList,co_reg_no: "Required field!"}
}
if(company.name === "" || company.name === undefined)
{
   errorList = { ...errorList,name: "Required field!"}
}
if(company.address === "" || company.address === undefined)
{
   errorList = { ...errorList,address: "Required field!"}
}
if(company.town === "" || company.town === undefined)
{
   errorList = { ...errorList,town: "Required field!"}
}
if(company.district === "" || company.district === undefined)
{
   errorList = { ...errorList,district: "Required field!"}
}
if(company.postcode === "" || company.postcode === undefined)
{
   errorList = { ...errorList,postcode: "Required field!"}
}
if(company.state === "" || company.state === undefined)
{
   errorList = { ...errorList,state: "Required field!"}
}
if(company.geocode === "" || company.geocode === undefined)
{
   errorList = { ...errorList,geocode: "Required field!"}
}
if(company.pic_url === "" || company.pic_url === undefined)
{
   errorList = { ...errorList,pic_url: "Required field!"}
}
if(company.contact_no === "" || company.contact_no === undefined)
{
   errorList = { ...errorList,contact_no: "Required field!"}
}
if(company.email === "" || validateEmail(company.email) === false)
{
   errorList = { ...errorList,email: "Enter a valid email!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneCompany(props.match.params.id).then((res) => {
                setCompany(res.data.document)
            })
        }else{
            setCompany({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (company.co_id) {
               var updateResponse =  await updateCompany(company);
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
                var addResponse = await addCompany(company)
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
        <PageTemplate title="Add/Update Company">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(company!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.co_reg_no}
type ={"text"}
onChange={(e)=>{setCompany({...company,co_reg_no:e.target.value});checkErrors()}}
defaultValue ={company.co_reg_no}
error ={(errorMessages.co_reg_no)?true:false}
label ={"co_reg_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.name}
type ={"text"}
onChange={(e)=>{setCompany({...company,name:e.target.value});checkErrors()}}
defaultValue ={company.name}
error ={(errorMessages.name)?true:false}
label ={"name"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.address}
type ={"text"}
onChange={(e)=>{setCompany({...company,address:e.target.value});checkErrors()}}
defaultValue ={company.address}
error ={(errorMessages.address)?true:false}
label ={"address"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.town}
type ={"text"}
onChange={(e)=>{setCompany({...company,town:e.target.value});checkErrors()}}
defaultValue ={company.town}
error ={(errorMessages.town)?true:false}
label ={"town"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.district}
type ={"text"}
onChange={(e)=>{setCompany({...company,district:e.target.value});checkErrors()}}
defaultValue ={company.district}
error ={(errorMessages.district)?true:false}
label ={"district"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.postcode}
type ={"text"}
onChange={(e)=>{setCompany({...company,postcode:e.target.value});checkErrors()}}
defaultValue ={company.postcode}
error ={(errorMessages.postcode)?true:false}
label ={"postcode"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.state}
type ={"text"}
onChange={(e)=>{setCompany({...company,state:e.target.value});checkErrors()}}
defaultValue ={company.state}
error ={(errorMessages.state)?true:false}
label ={"state"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.geocode}
type ={"text"}
onChange={(e)=>{setCompany({...company,geocode:e.target.value});checkErrors()}}
defaultValue ={company.geocode}
error ={(errorMessages.geocode)?true:false}
label ={"geocode"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.pic_url}
type ={"text"}
onChange={(e)=>{setCompany({...company,pic_url:e.target.value});checkErrors()}}
defaultValue ={company.pic_url}
error ={(errorMessages.pic_url)?true:false}
label ={"pic_url"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.contact_no}
type ={"text"}
onChange={(e)=>{setCompany({...company,contact_no:e.target.value});checkErrors()}}
defaultValue ={company.contact_no}
error ={(errorMessages.contact_no)?true:false}
label ={"contact_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.email}
type ={"email"}
onChange={(e)=>{setCompany({...company,email:e.target.value});checkErrors()}}
defaultValue ={company.email}
error ={(errorMessages.email)?true:false}
label ={"email"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"11"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/company')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(CompanyAddUpdatePage)
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
import {addCompany, getCompany,getOneCompany, updateCompany} from "../../repo/companyRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const CompanyAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [company,setCompany] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(company.co_reg_no === "" || company.co_reg_no === undefined)
{
   errorList = { ...errorList,co_reg_no: "Required field!"}
}
if(company.name === "" || company.name === undefined)
{
   errorList = { ...errorList,name: "Required field!"}
}
if(company.address === "" || company.address === undefined)
{
   errorList = { ...errorList,address: "Required field!"}
}
if(company.town === "" || company.town === undefined)
{
   errorList = { ...errorList,town: "Required field!"}
}
if(company.district === "" || company.district === undefined)
{
   errorList = { ...errorList,district: "Required field!"}
}
if(company.postcode === "" || company.postcode === undefined)
{
   errorList = { ...errorList,postcode: "Required field!"}
}
if(company.state === "" || company.state === undefined)
{
   errorList = { ...errorList,state: "Required field!"}
}
if(company.geocode === "" || company.geocode === undefined)
{
   errorList = { ...errorList,geocode: "Required field!"}
}
if(company.pic_url === "" || company.pic_url === undefined)
{
   errorList = { ...errorList,pic_url: "Required field!"}
}
if(company.contact_no === "" || company.contact_no === undefined)
{
   errorList = { ...errorList,contact_no: "Required field!"}
}
if(company.email === "" || validateEmail(company.email) === false)
{
   errorList = { ...errorList,email: "Enter a valid email!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneCompany(props.match.params.id).then((res) => {
                setCompany(res.data.document)
            })
        }else{
            setCompany({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (company.co_id) {
               var updateResponse =  await updateCompany(company);
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
                var addResponse = await addCompany(company)
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
        <PageTemplate title="Add/Update Company">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(company!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.co_reg_no}
type ={"text"}
onChange={(e)=>{setCompany({...company,co_reg_no:e.target.value});checkErrors()}}
defaultValue ={company.co_reg_no}
error ={(errorMessages.co_reg_no)?true:false}
label ={"co_reg_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.name}
type ={"text"}
onChange={(e)=>{setCompany({...company,name:e.target.value});checkErrors()}}
defaultValue ={company.name}
error ={(errorMessages.name)?true:false}
label ={"name"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.address}
type ={"text"}
onChange={(e)=>{setCompany({...company,address:e.target.value});checkErrors()}}
defaultValue ={company.address}
error ={(errorMessages.address)?true:false}
label ={"address"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.town}
type ={"text"}
onChange={(e)=>{setCompany({...company,town:e.target.value});checkErrors()}}
defaultValue ={company.town}
error ={(errorMessages.town)?true:false}
label ={"town"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.district}
type ={"text"}
onChange={(e)=>{setCompany({...company,district:e.target.value});checkErrors()}}
defaultValue ={company.district}
error ={(errorMessages.district)?true:false}
label ={"district"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.postcode}
type ={"text"}
onChange={(e)=>{setCompany({...company,postcode:e.target.value});checkErrors()}}
defaultValue ={company.postcode}
error ={(errorMessages.postcode)?true:false}
label ={"postcode"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.state}
type ={"text"}
onChange={(e)=>{setCompany({...company,state:e.target.value});checkErrors()}}
defaultValue ={company.state}
error ={(errorMessages.state)?true:false}
label ={"state"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.geocode}
type ={"text"}
onChange={(e)=>{setCompany({...company,geocode:e.target.value});checkErrors()}}
defaultValue ={company.geocode}
error ={(errorMessages.geocode)?true:false}
label ={"geocode"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.pic_url}
type ={"text"}
onChange={(e)=>{setCompany({...company,pic_url:e.target.value});checkErrors()}}
defaultValue ={company.pic_url}
error ={(errorMessages.pic_url)?true:false}
label ={"pic_url"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.contact_no}
type ={"text"}
onChange={(e)=>{setCompany({...company,contact_no:e.target.value});checkErrors()}}
defaultValue ={company.contact_no}
error ={(errorMessages.contact_no)?true:false}
label ={"contact_no"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.email}
type ={"email"}
onChange={(e)=>{setCompany({...company,email:e.target.value});checkErrors()}}
defaultValue ={company.email}
error ={(errorMessages.email)?true:false}
label ={"email"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"11"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/company')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(CompanyAddUpdatePage)
