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
const GetPackage_Test_PanelsColumns = (totalCount) => [
  {title: "package_code", field: "package_code",hidden:true},

  {title: "test_panel_code", field: "test_panel_code"},
{title: "test_location", field: "test_location"},
{title: "total_test_conducted", field: "total_test_conducted"},
{title: "remark", field: "remark"},

]
export default GetPackage_Test_PanelsColumns;
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
const GetPackage_Test_PanelsColumns = (totalCount) => [
  {title: "package_code", field: "package_code",hidden:true},

  {title: "test_panel_code", field: "test_panel_code"},
{title: "test_location", field: "test_location"},
{title: "total_test_conducted", field: "total_test_conducted"},
{title: "remark", field: "remark"},

]
export default GetPackage_Test_PanelsColumns;
