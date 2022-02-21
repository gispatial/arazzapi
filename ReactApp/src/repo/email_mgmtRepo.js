import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getEmail_Mgmt = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllEmail_Mgmt(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchEmail_Mgmt(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllEmail_Mgmt = (pageno,pagesize) => {
return api.get(`/email_mgmt/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchEmail_Mgmt = (key,pageno,pagesize) => {
return api.get(`/email_mgmt/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneEmail_Mgmt = (id) => {
return api.get(`/email_mgmt/read_one.php?id=${id}`)
}
const deleteEmail_Mgmt = (code) => {
return api.post(`/email_mgmt/delete.php?`,{code:code})
}
const addEmail_Mgmt = (data) => {
return api.post(`/email_mgmt/create.php?`,data)
}
const updateEmail_Mgmt = (data) => {
return api.post(`/email_mgmt/update.php?`,data)
}
const getAllEmail_Mgmt = (pageno,pagesize) => {
return api.get(`/email_mgmt/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchEmail_Mgmt = (key,pageno,pagesize) => {
return api.get(`/email_mgmt/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneEmail_Mgmt = (id) => {
return api.get(`/email_mgmt/read_one.php?id=${id}`)
}
const deleteEmail_Mgmt = (code) => {
return api.post(`/email_mgmt/delete.php?`,{code:code})
}
const addEmail_Mgmt = (data) => {
return api.post(`/email_mgmt/create.php?`,data)
}
const updateEmail_Mgmt = (data) => {
return api.post(`/email_mgmt/update.php?`,data)
}
export {getEmail_Mgmt,getAllEmail_Mgmt,searchEmail_Mgmt,getOneEmail_Mgmt,deleteEmail_Mgmt,addEmail_Mgmt,updateEmail_Mgmt,getAllEmail_Mgmt,searchEmail_Mgmt,getOneEmail_Mgmt,deleteEmail_Mgmt,addEmail_Mgmt,updateEmail_Mgmt}


