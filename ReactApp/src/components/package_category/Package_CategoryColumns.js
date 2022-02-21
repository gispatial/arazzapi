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
const GetPackage_CategoryColumns = (totalCount) => [
  {title: "category_code", field: "category_code",hidden:true},

  {title: "description", field: "description"},
{title: "prefix", field: "prefix"},
{title: "picture_path",
field:"picture_path",
editComponent: (props) => <Input value={props.value} onChange={(e)=>{props.onChange(e.target.value)}} />,
render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.picture_path}/>,
},
{title: "show_display", field: "show_display"},

]
export default GetPackage_CategoryColumns;
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
const GetPackage_CategoryColumns = (totalCount) => [
  {title: "category_code", field: "category_code",hidden:true},

  {title: "description", field: "description"},
{title: "prefix", field: "prefix"},
{title: "picture_path",
field:"picture_path",
editComponent: (props) => <Input value={props.value} onChange={(e)=>{props.onChange(e.target.value)}} />,
render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.picture_path}/>,
},
{title: "show_display", field: "show_display"},

]
export default GetPackage_CategoryColumns;
