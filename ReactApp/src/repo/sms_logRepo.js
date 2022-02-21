import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getSms_Log = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllSms_Log(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchSms_Log(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllSms_Log = (pageno,pagesize) => {
return api.get(`/sms_log/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchSms_Log = (key,pageno,pagesize) => {
return api.get(`/sms_log/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneSms_Log = (id) => {
return api.get(`/sms_log/read_one.php?id=${id}`)
}
const deleteSms_Log = (id) => {
return api.post(`/sms_log/delete.php?`,{id:id})
}
const addSms_Log = (data) => {
return api.post(`/sms_log/create.php?`,data)
}
const updateSms_Log = (data) => {
return api.post(`/sms_log/update.php?`,data)
}
const getAllSms_Log = (pageno,pagesize) => {
return api.get(`/sms_log/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchSms_Log = (key,pageno,pagesize) => {
return api.get(`/sms_log/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneSms_Log = (id) => {
return api.get(`/sms_log/read_one.php?id=${id}`)
}
const deleteSms_Log = (id) => {
return api.post(`/sms_log/delete.php?`,{id:id})
}
const addSms_Log = (data) => {
return api.post(`/sms_log/create.php?`,data)
}
const updateSms_Log = (data) => {
return api.post(`/sms_log/update.php?`,data)
}
export {getSms_Log,getAllSms_Log,searchSms_Log,getOneSms_Log,deleteSms_Log,addSms_Log,updateSms_Log,getAllSms_Log,searchSms_Log,getOneSms_Log,deleteSms_Log,addSms_Log,updateSms_Log}


