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
const GetMessage_InboxColumns = (totalCount) => [
  {title: "message_inbox_code", field: "message_inbox_code",hidden:true},

  {title: "sender", field: "sender"},
{title: "receiver", field: "receiver"},
{title: "subject", field: "subject"},
{title: "message", field: "message"},
{title: "headers", field: "headers"},
{title: "date_sent", field: "date_sent",type:"datetime"},
{title: "message_type_code", field: "message_type_code"},
{title: "ic_no", field: "ic_no"},
{title: "status", field: "status"},
{title: "attachment", field: "attachment"},

]
export default GetMessage_InboxColumns;
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
const GetMessage_InboxColumns = (totalCount) => [
  {title: "message_inbox_code", field: "message_inbox_code",hidden:true},

  {title: "sender", field: "sender"},
{title: "receiver", field: "receiver"},
{title: "subject", field: "subject"},
{title: "message", field: "message"},
{title: "headers", field: "headers"},
{title: "date_sent", field: "date_sent",type:"datetime"},
{title: "message_type_code", field: "message_type_code"},
{title: "ic_no", field: "ic_no"},
{title: "status", field: "status"},
{title: "attachment", field: "attachment"},

]
export default GetMessage_InboxColumns;
