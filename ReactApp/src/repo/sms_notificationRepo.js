import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getSms_Notification = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllSms_Notification(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchSms_Notification(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllSms_Notification = (pageno,pagesize) => {
return api.get(`/sms_notification/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchSms_Notification = (key,pageno,pagesize) => {
return api.get(`/sms_notification/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneSms_Notification = (id) => {
return api.get(`/sms_notification/read_one.php?id=${id}`)
}
const deleteSms_Notification = (code) => {
return api.post(`/sms_notification/delete.php?`,{code:code})
}
const addSms_Notification = (data) => {
return api.post(`/sms_notification/create.php?`,data)
}
const updateSms_Notification = (data) => {
return api.post(`/sms_notification/update.php?`,data)
}
const getAllSms_Notification = (pageno,pagesize) => {
return api.get(`/sms_notification/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchSms_Notification = (key,pageno,pagesize) => {
return api.get(`/sms_notification/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneSms_Notification = (id) => {
return api.get(`/sms_notification/read_one.php?id=${id}`)
}
const deleteSms_Notification = (code) => {
return api.post(`/sms_notification/delete.php?`,{code:code})
}
const addSms_Notification = (data) => {
return api.post(`/sms_notification/create.php?`,data)
}
const updateSms_Notification = (data) => {
return api.post(`/sms_notification/update.php?`,data)
}
export {getSms_Notification,getAllSms_Notification,searchSms_Notification,getOneSms_Notification,deleteSms_Notification,addSms_Notification,updateSms_Notification,getAllSms_Notification,searchSms_Notification,getOneSms_Notification,deleteSms_Notification,addSms_Notification,updateSms_Notification}


