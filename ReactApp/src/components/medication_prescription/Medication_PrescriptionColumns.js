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
const GetMedication_PrescriptionColumns = (totalCount) => [
  {title: "ERROR_NOPRIMARYKEYFOUND", field: "ERROR_NOPRIMARYKEYFOUND",hidden:true},

  {title: "medication_id", field: "medication_id"},
{title: "doctor_id", field: "doctor_id"},
{title: "patient_id", field: "patient_id"},
{title: "no", field: "no"},
{title: "date", field: "date",type:"date"},

]
export default GetMedication_PrescriptionColumns;
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
const GetMedication_PrescriptionColumns = (totalCount) => [
  {title: "ERROR_NOPRIMARYKEYFOUND", field: "ERROR_NOPRIMARYKEYFOUND",hidden:true},

  {title: "medication_id", field: "medication_id"},
{title: "doctor_id", field: "doctor_id"},
{title: "patient_id", field: "patient_id"},
{title: "no", field: "no"},
{title: "date", field: "date",type:"date"},

]
export default GetMedication_PrescriptionColumns;
