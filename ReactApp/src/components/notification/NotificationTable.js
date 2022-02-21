import MaterialTable from 'material-table';
import React, {useEffect, useState} from 'react';
import tableIcons from '../templates/TableIcons';
import getColumns from './NotificationColumns';
import Edit from "@material-ui/icons/Edit";
import {withRouter} from "react-router";
import {AddBox} from "@material-ui/icons";
import {deleteNotification, getNotification} from "../../repo/notificationRepo";
/*
Documentation on developing the Material-Table can be found at https://material-table.com/
You can use the async function passed to MaterialTable data prop to implement filters and sorting on server-side
Filters and sorting can't be implemented on client side due to server-side pagination.
*/

const NotificationTable = (props) => {
    const history = props.history;
    const [columns, setColumns] = useState(getColumns({}));

    //Here we call delete
    const handleRowDelete = (oldData, resolve) => {
        deleteNotification(oldData.id)
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
        title="Notification Data"
        columns={columns}
        data={async(query)=>
            {
                const res = await getNotification(query.page,query.pageSize,query.search);
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
                        pathname:`/notification/update/${rowData.id}`,
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
                    history.push("/notification/add")
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
export default withRouter(NotificationTable);
import MaterialTable from 'material-table';
import React, {useEffect, useState} from 'react';
import tableIcons from '../templates/TableIcons';
import getColumns from './NotificationColumns';
import Edit from "@material-ui/icons/Edit";
import {withRouter} from "react-router";
import {AddBox} from "@material-ui/icons";
import {deleteNotification, getNotification} from "../../repo/notificationRepo";
/*
Documentation on developing the Material-Table can be found at https://material-table.com/
You can use the async function passed to MaterialTable data prop to implement filters and sorting on server-side
Filters and sorting can't be implemented on client side due to server-side pagination.
*/

const NotificationTable = (props) => {
    const history = props.history;
    const [columns, setColumns] = useState(getColumns({}));

    //Here we call delete
    const handleRowDelete = (oldData, resolve) => {
        deleteNotification(oldData.id)
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
        title="Notification Data"
        columns={columns}
        data={async(query)=>
            {
                const res = await getNotification(query.page,query.pageSize,query.search);
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
                        pathname:`/notification/update/${rowData.id}`,
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
                    history.push("/notification/add")
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
export default withRouter(NotificationTable);
