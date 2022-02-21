import { Switch } from '@material-ui/core';
import React from 'react';
import Avatar from 'react-avatar';
import Input from "@material-ui/core/Input";

/*
In order to validate errors on the input field you can
override the editComponent of the Material Table to add a new material-ui Input fields
and use props for validation.
Information on material-ui Input element https://material-ui.com/api/input/
Information on material-table Props https://material-table.com/#/docs/all-props
You can also find an example of an overridden element bellow. Overriding the render method is not a must.
 */
const GetUser_AccountColumns = (totalCount) => [
  {title: "username", field: "username",hidden:true},

  {title: "reg_no", field: "reg_no"},
{title: "password", field: "password"},
{title: "name", field: "name"},
{title: "ic_no", field: "ic_no"},
{title: "email", field: "email"},
{title: "acc_type_code", field: "acc_type_code"},
{title: "menu_owner", field: "menu_owner"},
{title: "acc_status_code", field: "acc_status_code"},
{title: "date_created", field: "date_created",type:"date"},
{title: "date_updated", field: "date_updated",type:"datetime"},
{title: "last_login", field: "last_login",type:"date"},

]
export default GetUser_AccountColumns;
import { Switch } from '@material-ui/core';
import React from 'react';
import Avatar from 'react-avatar';
import Input from "@material-ui/core/Input";

/*
In order to validate errors on the input field you can
override the editComponent of the Material Table to add a new material-ui Input fields
and use props for validation.
Information on material-ui Input element https://material-ui.com/api/input/
Information on material-table Props https://material-table.com/#/docs/all-props
You can also find an example of an overridden element bellow. Overriding the render method is not a must.
 */
const GetUser_AccountColumns = (totalCount) => [
  {title: "username", field: "username",hidden:true},

  {title: "reg_no", field: "reg_no"},
{title: "password", field: "password"},
{title: "name", field: "name"},
{title: "ic_no", field: "ic_no"},
{title: "email", field: "email"},
{title: "acc_type_code", field: "acc_type_code"},
{title: "menu_owner", field: "menu_owner"},
{title: "acc_status_code", field: "acc_status_code"},
{title: "date_created", field: "date_created",type:"date"},
{title: "date_updated", field: "date_updated",type:"datetime"},
{title: "last_login", field: "last_login",type:"date"},

]
export default GetUser_AccountColumns;
