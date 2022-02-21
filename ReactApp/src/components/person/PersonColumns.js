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
const GetPersonColumns = (totalCount) => [
  {title: "ic_no", field: "ic_no",hidden:true},

  {title: "reg_no", field: "reg_no"},
{title: "name", field: "name"},
{title: "age", field: "age"},
{title: "email", field: "email"},
{title: "mobile_no", field: "mobile_no"},
{title: "gender", field: "gender"},
{title: "patient_type_code", field: "patient_type_code"},
{title: "address", field: "address"},
{title: "town", field: "town"},
{title: "district", field: "district"},
{title: "postcode", field: "postcode"},
{title: "state", field: "state"},
{title: "photo_path", field: "photo_path"},
{title: "relationship", field: "relationship"},

]
export default GetPersonColumns;
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
const GetPersonColumns = (totalCount) => [
  {title: "ic_no", field: "ic_no",hidden:true},

  {title: "reg_no", field: "reg_no"},
{title: "name", field: "name"},
{title: "age", field: "age"},
{title: "email", field: "email"},
{title: "mobile_no", field: "mobile_no"},
{title: "gender", field: "gender"},
{title: "patient_type_code", field: "patient_type_code"},
{title: "address", field: "address"},
{title: "town", field: "town"},
{title: "district", field: "district"},
{title: "postcode", field: "postcode"},
{title: "state", field: "state"},
{title: "photo_path", field: "photo_path"},
{title: "relationship", field: "relationship"},

]
export default GetPersonColumns;
