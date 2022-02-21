import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getAccount_Status = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllAccount_Status(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchAccount_Status(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllAccount_Status = (pageno,pagesize) => {
return api.get(`/account_status/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchAccount_Status = (key,pageno,pagesize) => {
return api.get(`/account_status/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneAccount_Status = (id) => {
return api.get(`/account_status/read_one.php?id=${id}`)
}
const deleteAccount_Status = (acc_status_code) => {
return api.post(`/account_status/delete.php?`,{acc_status_code:acc_status_code})
}
const addAccount_Status = (data) => {
return api.post(`/account_status/create.php?`,data)
}
const updateAccount_Status = (data) => {
return api.post(`/account_status/update.php?`,data)
}
const getAllAccount_Status = (pageno,pagesize) => {
return api.get(`/account_status/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchAccount_Status = (key,pageno,pagesize) => {
return api.get(`/account_status/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneAccount_Status = (id) => {
return api.get(`/account_status/read_one.php?id=${id}`)
}
const deleteAccount_Status = (acc_status_code) => {
return api.post(`/account_status/delete.php?`,{acc_status_code:acc_status_code})
}
const addAccount_Status = (data) => {
return api.post(`/account_status/create.php?`,data)
}
const updateAccount_Status = (data) => {
return api.post(`/account_status/update.php?`,data)
}
export {getAccount_Status,getAllAccount_Status,searchAccount_Status,getOneAccount_Status,deleteAccount_Status,addAccount_Status,updateAccount_Status,getAllAccount_Status,searchAccount_Status,getOneAccount_Status,deleteAccount_Status,addAccount_Status,updateAccount_Status}


