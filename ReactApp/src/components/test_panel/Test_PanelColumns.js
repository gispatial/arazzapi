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
const GetTest_PanelColumns = (totalCount) => [
  {title: "panel_id", field: "panel_id",hidden:true},

  {title: "test_panel_code", field: "test_panel_code"},
{title: "name", field: "name"},
{title: "description", field: "description"},
{title: "input_type", field: "input_type"},

]
export default GetTest_PanelColumns;
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
const GetTest_PanelColumns = (totalCount) => [
  {title: "panel_id", field: "panel_id",hidden:true},

  {title: "test_panel_code", field: "test_panel_code"},
{title: "name", field: "name"},
{title: "description", field: "description"},
{title: "input_type", field: "input_type"},

]
export default GetTest_PanelColumns;
