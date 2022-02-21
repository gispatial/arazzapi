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
const GetTest_ResultColumns = (totalCount) => [
  {title: "patient_ic_no", field: "patient_ic_no",hidden:true},

  {title: "reg_no", field: "reg_no"},
{title: "booking_no", field: "booking_no"},
{title: "test_date", field: "test_date",type:"date"},
{title: "test_panel_code", field: "test_panel_code"},
{title: "test_marker_code", field: "test_marker_code"},
{title: "test_value", field: "test_value"},
{title: "source", field: "source"},
{title: "date_updated", field: "date_updated",type:"datetime"},

]
export default GetTest_ResultColumns;
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
const GetTest_ResultColumns = (totalCount) => [
  {title: "patient_ic_no", field: "patient_ic_no",hidden:true},

  {title: "reg_no", field: "reg_no"},
{title: "booking_no", field: "booking_no"},
{title: "test_date", field: "test_date",type:"date"},
{title: "test_panel_code", field: "test_panel_code"},
{title: "test_marker_code", field: "test_marker_code"},
{title: "test_value", field: "test_value"},
{title: "source", field: "source"},
{title: "date_updated", field: "date_updated",type:"datetime"},

]
export default GetTest_ResultColumns;
