import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getNotification_Log = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllNotification_Log(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchNotification_Log(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllNotification_Log = (pageno,pagesize) => {
return api.get(`/notification_log/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchNotification_Log = (key,pageno,pagesize) => {
return api.get(`/notification_log/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneNotification_Log = (id) => {
return api.get(`/notification_log/read_one.php?id=${id}`)
}
const deleteNotification_Log = (ERROR_NOPRIMARYKEYFOUND) => {
return api.post(`/notification_log/delete.php?`,{ERROR_NOPRIMARYKEYFOUND:ERROR_NOPRIMARYKEYFOUND})
}
const addNotification_Log = (data) => {
return api.post(`/notification_log/create.php?`,data)
}
const updateNotification_Log = (data) => {
return api.post(`/notification_log/update.php?`,data)
}
const getAllNotification_Log = (pageno,pagesize) => {
return api.get(`/notification_log/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchNotification_Log = (key,pageno,pagesize) => {
return api.get(`/notification_log/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneNotification_Log = (id) => {
return api.get(`/notification_log/read_one.php?id=${id}`)
}
const deleteNotification_Log = (ERROR_NOPRIMARYKEYFOUND) => {
return api.post(`/notification_log/delete.php?`,{ERROR_NOPRIMARYKEYFOUND:ERROR_NOPRIMARYKEYFOUND})
}
const addNotification_Log = (data) => {
return api.post(`/notification_log/create.php?`,data)
}
const updateNotification_Log = (data) => {
return api.post(`/notification_log/update.php?`,data)
}
export {getNotification_Log,getAllNotification_Log,searchNotification_Log,getOneNotification_Log,deleteNotification_Log,addNotification_Log,updateNotification_Log,getAllNotification_Log,searchNotification_Log,getOneNotification_Log,deleteNotification_Log,addNotification_Log,updateNotification_Log}


