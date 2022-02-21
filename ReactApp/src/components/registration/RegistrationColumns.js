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
const GetRegistrationColumns = (totalCount) => [
  {title: "ERROR_NOPRIMARYKEYFOUND", field: "ERROR_NOPRIMARYKEYFOUND",hidden:true},

  {title: "package_code", field: "package_code"},
{title: "amount_fee", field: "amount_fee"},
{title: "main_account_id", field: "main_account_id"},
{title: "date_registered", field: "date_registered",type:"date"},
{title: "date_expired", field: "date_expired",type:"date"},

]
export default GetRegistrationColumns;
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
const GetRegistrationColumns = (totalCount) => [
  {title: "ERROR_NOPRIMARYKEYFOUND", field: "ERROR_NOPRIMARYKEYFOUND",hidden:true},

  {title: "package_code", field: "package_code"},
{title: "amount_fee", field: "amount_fee"},
{title: "main_account_id", field: "main_account_id"},
{title: "date_registered", field: "date_registered",type:"date"},
{title: "date_expired", field: "date_expired",type:"date"},

]
export default GetRegistrationColumns;
