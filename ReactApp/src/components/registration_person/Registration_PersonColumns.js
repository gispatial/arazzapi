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
const GetRegistration_PersonColumns = (totalCount) => [
  {title: "reg_no", field: "reg_no",hidden:true},

  {title: "ic_no", field: "ic_no"},
{title: "username", field: "username"},
{title: "person_type_code", field: "person_type_code"},
{title: "admin_type", field: "admin_type"},
{title: "patient_type_code", field: "patient_type_code"},

]
export default GetRegistration_PersonColumns;
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
const GetRegistration_PersonColumns = (totalCount) => [
  {title: "reg_no", field: "reg_no",hidden:true},

  {title: "ic_no", field: "ic_no"},
{title: "username", field: "username"},
{title: "person_type_code", field: "person_type_code"},
{title: "admin_type", field: "admin_type"},
{title: "patient_type_code", field: "patient_type_code"},

]
export default GetRegistration_PersonColumns;
