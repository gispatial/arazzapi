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
import {addMenu_Main_Item, getMenu_Main_Item,getOneMenu_Main_Item, updateMenu_Main_Item} from "../../repo/menu_main_itemRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Menu_Main_ItemAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [menu_main_item,setMenu_Main_Item] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(menu_main_item.item_id === "" || menu_main_item.item_id === undefined)
{
   errorList = { ...errorList,item_id: "Required field!"}
}
if(menu_main_item.sort_id === "" || menu_main_item.sort_id === undefined)
{
   errorList = { ...errorList,sort_id: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneMenu_Main_Item(props.match.params.id).then((res) => {
                setMenu_Main_Item(res.data.document)
            })
        }else{
            setMenu_Main_Item({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (menu_main_item.main_id) {
               var updateResponse =  await updateMenu_Main_Item(menu_main_item);
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
                var addResponse = await addMenu_Main_Item(menu_main_item)
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
        <PageTemplate title="Add/Update Menu_Main_Item">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(menu_main_item!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.item_id}
type ={"number"}
onChange={(e)=>{setMenu_Main_Item({...menu_main_item,item_id:e.target.value});checkErrors()}}
defaultValue ={menu_main_item.item_id}
error ={(errorMessages.item_id)?true:false}
label ={"item_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.sort_id}
type ={"number"}
onChange={(e)=>{setMenu_Main_Item({...menu_main_item,sort_id:e.target.value});checkErrors()}}
defaultValue ={menu_main_item.sort_id}
error ={(errorMessages.sort_id)?true:false}
label ={"sort_id"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"2"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/menu_main_item')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"3"}>
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

export default withRouter(Menu_Main_ItemAddUpdatePage)
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
import {addMenu_Main_Item, getMenu_Main_Item,getOneMenu_Main_Item, updateMenu_Main_Item} from "../../repo/menu_main_itemRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Menu_Main_ItemAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [menu_main_item,setMenu_Main_Item] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(menu_main_item.item_id === "" || menu_main_item.item_id === undefined)
{
   errorList = { ...errorList,item_id: "Required field!"}
}
if(menu_main_item.sort_id === "" || menu_main_item.sort_id === undefined)
{
   errorList = { ...errorList,sort_id: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneMenu_Main_Item(props.match.params.id).then((res) => {
                setMenu_Main_Item(res.data.document)
            })
        }else{
            setMenu_Main_Item({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (menu_main_item.main_id) {
               var updateResponse =  await updateMenu_Main_Item(menu_main_item);
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
                var addResponse = await addMenu_Main_Item(menu_main_item)
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
        <PageTemplate title="Add/Update Menu_Main_Item">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(menu_main_item!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.item_id}
type ={"number"}
onChange={(e)=>{setMenu_Main_Item({...menu_main_item,item_id:e.target.value});checkErrors()}}
defaultValue ={menu_main_item.item_id}
error ={(errorMessages.item_id)?true:false}
label ={"item_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.sort_id}
type ={"number"}
onChange={(e)=>{setMenu_Main_Item({...menu_main_item,sort_id:e.target.value});checkErrors()}}
defaultValue ={menu_main_item.sort_id}
error ={(errorMessages.sort_id)?true:false}
label ={"sort_id"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"2"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/menu_main_item')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"3"}>
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

export default withRouter(Menu_Main_ItemAddUpdatePage)
