import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getNotification = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllNotification(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchNotification(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllNotification = (pageno,pagesize) => {
return api.get(`/notification/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchNotification = (key,pageno,pagesize) => {
return api.get(`/notification/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneNotification = (id) => {
return api.get(`/notification/read_one.php?id=${id}`)
}
const deleteNotification = (id) => {
return api.post(`/notification/delete.php?`,{id:id})
}
const addNotification = (data) => {
return api.post(`/notification/create.php?`,data)
}
const updateNotification = (data) => {
return api.post(`/notification/update.php?`,data)
}
const getAllNotification = (pageno,pagesize) => {
return api.get(`/notification/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchNotification = (key,pageno,pagesize) => {
return api.get(`/notification/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneNotification = (id) => {
return api.get(`/notification/read_one.php?id=${id}`)
}
const deleteNotification = (id) => {
return api.post(`/notification/delete.php?`,{id:id})
}
const addNotification = (data) => {
return api.post(`/notification/create.php?`,data)
}
const updateNotification = (data) => {
return api.post(`/notification/update.php?`,data)
}
export {getNotification,getAllNotification,searchNotification,getOneNotification,deleteNotification,addNotification,updateNotification,getAllNotification,searchNotification,getOneNotification,deleteNotification,addNotification,updateNotification}


