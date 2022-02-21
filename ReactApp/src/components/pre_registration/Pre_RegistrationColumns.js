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
const GetPre_RegistrationColumns = (totalCount) => [
  {title: "seq_reg_no", field: "seq_reg_no",hidden:true},

  {title: "reg_no", field: "reg_no"},
{title: "ic_no", field: "ic_no"},
{title: "name", field: "name"},
{title: "mobile_no", field: "mobile_no"},
{title: "email", field: "email"},
{title: "package_code", field: "package_code"},
{title: "center_code", field: "center_code"},
{title: "amount_paid", field: "amount_paid"},
{title: "payment_no", field: "payment_no"},
{title: "payment_date", field: "payment_date",type:"date"},
{title: "payment_method", field: "payment_method"},
{title: "date_registered", field: "date_registered",type:"datetime"},
{title: "date_expired", field: "date_expired",type:"date"},
{title: "status", field: "status"},
{title: "company_reg_no", field: "company_reg_no"},

]
export default GetPre_RegistrationColumns;
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
const GetPre_RegistrationColumns = (totalCount) => [
  {title: "seq_reg_no", field: "seq_reg_no",hidden:true},

  {title: "reg_no", field: "reg_no"},
{title: "ic_no", field: "ic_no"},
{title: "name", field: "name"},
{title: "mobile_no", field: "mobile_no"},
{title: "email", field: "email"},
{title: "package_code", field: "package_code"},
{title: "center_code", field: "center_code"},
{title: "amount_paid", field: "amount_paid"},
{title: "payment_no", field: "payment_no"},
{title: "payment_date", field: "payment_date",type:"date"},
{title: "payment_method", field: "payment_method"},
{title: "date_registered", field: "date_registered",type:"datetime"},
{title: "date_expired", field: "date_expired",type:"date"},
{title: "status", field: "status"},
{title: "company_reg_no", field: "company_reg_no"},

]
export default GetPre_RegistrationColumns;
