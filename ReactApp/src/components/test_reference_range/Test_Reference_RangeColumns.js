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
const GetTest_Reference_RangeColumns = (totalCount) => [
  {title: "test_marker_code", field: "test_marker_code",hidden:true},

  {title: "code", field: "code"},
{title: "min", field: "min"},
{title: "max", field: "max"},
{title: "summary", field: "summary"},

]
export default GetTest_Reference_RangeColumns;
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
const GetTest_Reference_RangeColumns = (totalCount) => [
  {title: "test_marker_code", field: "test_marker_code",hidden:true},

  {title: "code", field: "code"},
{title: "min", field: "min"},
{title: "max", field: "max"},
{title: "summary", field: "summary"},

]
export default GetTest_Reference_RangeColumns;
