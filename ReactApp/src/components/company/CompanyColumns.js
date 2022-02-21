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
const GetCompanyColumns = (totalCount) => [
  {title: "co_id", field: "co_id",hidden:true},

  {title: "co_reg_no", field: "co_reg_no"},
{title: "name", field: "name"},
{title: "address", field: "address"},
{title: "town", field: "town"},
{title: "district", field: "district"},
{title: "postcode", field: "postcode"},
{title: "state", field: "state"},
{title: "geocode", field: "geocode"},
{title: "pic_url",
field:"pic_url",
editComponent: (props) => <Input value={props.value} onChange={(e)=>{props.onChange(e.target.value)}} />,
render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.pic_url}/>,
},
{title: "contact_no", field: "contact_no"},
{title: "email", field: "email"},

]
export default GetCompanyColumns;
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
const GetCompanyColumns = (totalCount) => [
  {title: "co_id", field: "co_id",hidden:true},

  {title: "co_reg_no", field: "co_reg_no"},
{title: "name", field: "name"},
{title: "address", field: "address"},
{title: "town", field: "town"},
{title: "district", field: "district"},
{title: "postcode", field: "postcode"},
{title: "state", field: "state"},
{title: "geocode", field: "geocode"},
{title: "pic_url",
field:"pic_url",
editComponent: (props) => <Input value={props.value} onChange={(e)=>{props.onChange(e.target.value)}} />,
render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.pic_url}/>,
},
{title: "contact_no", field: "contact_no"},
{title: "email", field: "email"},

]
export default GetCompanyColumns;
