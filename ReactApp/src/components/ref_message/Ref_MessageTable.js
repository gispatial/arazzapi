import MaterialTable from 'material-table';
import React, {useEffect, useState} from 'react';
import tableIcons from '../templates/TableIcons';
import getColumns from './Ref_MessageColumns';
import Edit from "@material-ui/icons/Edit";
import {withRouter} from "react-router";
import {AddBox} from "@material-ui/icons";
import {deleteRef_Message, getRef_Message} from "../../repo/ref_messageRepo";
/*
Documentation on developing the Material-Table can be found at https://material-table.com/
You can use the async function passed to MaterialTable data prop to implement filters and sorting on server-side
Filters and sorting can't be implemented on client side due to server-side pagination.
*/

const Ref_MessageTable = (props) => {
    const history = props.history;
    const [columns, setColumns] = useState(getColumns({}));

    //Here we call delete
    const handleRowDelete = (oldData, resolve) => {
        deleteRef_Message(oldData.message_type_code)
            .then(res => {
                resolve()
            })
            .catch(error => {
                resolve()
            })
    }


    return (
    <div>
    <MaterialTable
        minRows={20}
        title="Ref_Message Data"
        columns={columns}
        data={async(query)=>
            {
                const res = await getRef_Message(query.page,query.pageSize,query.search);
                return ({
                    data: res.records,
                    page: query.page,
                    totalCount: parseInt(res.total_count)
                })
            }
        }
        options={{
            sorting:true,
            actionsColumnIndex: -1,
            pageSize: 20,
            toolbar: true,
            paging: true
        }}

        actions={[
            {
                icon: ()=> <Edit/>,
                tooltip: 'Edit',
                onClick: (event,rowData) =>{
                    history.push({
                        pathname:`/ref_message/update/${rowData.message_type_code}`,
                        user:rowData
                    })
                }
            },
            {
            icon: ()=><AddBox variant="contained" color="secondary"/>,
                tooltip: 'Add New',
                // This makes add button to appear in table toolbar instead for each row
                isFreeAction: true,
                onClick: (event, rowData) => {
                    history.push("/ref_message/add")
                }
            }
        ]}

        icons={tableIcons}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve)
            }),
        }}

      />
    </div>);
}
export default withRouter(Ref_MessageTable);
import MaterialTable from 'material-table';
import React, {useEffect, useState} from 'react';
import tableIcons from '../templates/TableIcons';
import getColumns from './Ref_MessageColumns';
import Edit from "@material-ui/icons/Edit";
import {withRouter} from "react-router";
import {AddBox} from "@material-ui/icons";
import {deleteRef_Message, getRef_Message} from "../../repo/ref_messageRepo";
/*
Documentation on developing the Material-Table can be found at https://material-table.com/
You can use the async function passed to MaterialTable data prop to implement filters and sorting on server-side
Filters and sorting can't be implemented on client side due to server-side pagination.
*/

const Ref_MessageTable = (props) => {
    const history = props.history;
    const [columns, setColumns] = useState(getColumns({}));

    //Here we call delete
    const handleRowDelete = (oldData, resolve) => {
        deleteRef_Message(oldData.message_type_code)
            .then(res => {
                resolve()
            })
            .catch(error => {
                resolve()
            })
    }


    return (
    <div>
    <MaterialTable
        minRows={20}
        title="Ref_Message Data"
        columns={columns}
        data={async(query)=>
            {
                const res = await getRef_Message(query.page,query.pageSize,query.search);
                return ({
                    data: res.records,
                    page: query.page,
                    totalCount: parseInt(res.total_count)
                })
            }
        }
        options={{
            sorting:true,
            actionsColumnIndex: -1,
            pageSize: 20,
            toolbar: true,
            paging: true
        }}

        actions={[
            {
                icon: ()=> <Edit/>,
                tooltip: 'Edit',
                onClick: (event,rowData) =>{
                    history.push({
                        pathname:`/ref_message/update/${rowData.message_type_code}`,
                        user:rowData
                    })
                }
            },
            {
            icon: ()=><AddBox variant="contained" color="secondary"/>,
                tooltip: 'Add New',
                // This makes add button to appear in table toolbar instead for each row
                isFreeAction: true,
                onClick: (event, rowData) => {
                    history.push("/ref_message/add")
                }
            }
        ]}

        icons={tableIcons}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve)
            }),
        }}

      />
    </div>);
}
export default withRouter(Ref_MessageTable);
