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
const GetPackage_Add_OnsColumns = (totalCount) => [
  {title: "package_code", field: "package_code",hidden:true},

  {title: "add_on_code", field: "add_on_code"},
{title: "add_on_name", field: "add_on_name"},
{title: "test_location_code", field: "test_location_code"},
{title: "test_location_name", field: "test_location_name"},
{title: "total_test_conducted", field: "total_test_conducted"},
{title: "patient_type_code", field: "patient_type_code"},

]
export default GetPackage_Add_OnsColumns;
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
const GetPackage_Add_OnsColumns = (totalCount) => [
  {title: "package_code", field: "package_code",hidden:true},

  {title: "add_on_code", field: "add_on_code"},
{title: "add_on_name", field: "add_on_name"},
{title: "test_location_code", field: "test_location_code"},
{title: "test_location_name", field: "test_location_name"},
{title: "total_test_conducted", field: "total_test_conducted"},
{title: "patient_type_code", field: "patient_type_code"},

]
export default GetPackage_Add_OnsColumns;
