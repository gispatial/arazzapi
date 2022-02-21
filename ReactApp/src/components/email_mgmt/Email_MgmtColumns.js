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
const GetEmail_MgmtColumns = (totalCount) => [
  {title: "code", field: "code",hidden:true},

  {title: "title", field: "title"},
{title: "content", field: "content"},
{title: "sender", field: "sender"},
{title: "active", field: "active"},

]
export default GetEmail_MgmtColumns;
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
const GetEmail_MgmtColumns = (totalCount) => [
  {title: "code", field: "code",hidden:true},

  {title: "title", field: "title"},
{title: "content", field: "content"},
{title: "sender", field: "sender"},
{title: "active", field: "active"},

]
export default GetEmail_MgmtColumns;
