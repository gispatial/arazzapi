import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getAccount_Type = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllAccount_Type(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchAccount_Type(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllAccount_Type = (pageno,pagesize) => {
return api.get(`/account_type/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchAccount_Type = (key,pageno,pagesize) => {
return api.get(`/account_type/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneAccount_Type = (id) => {
return api.get(`/account_type/read_one.php?id=${id}`)
}
const deleteAccount_Type = (id) => {
return api.post(`/account_type/delete.php?`,{id:id})
}
const addAccount_Type = (data) => {
return api.post(`/account_type/create.php?`,data)
}
const updateAccount_Type = (data) => {
return api.post(`/account_type/update.php?`,data)
}
const getAllAccount_Type = (pageno,pagesize) => {
return api.get(`/account_type/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchAccount_Type = (key,pageno,pagesize) => {
return api.get(`/account_type/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneAccount_Type = (id) => {
return api.get(`/account_type/read_one.php?id=${id}`)
}
const deleteAccount_Type = (id) => {
return api.post(`/account_type/delete.php?`,{id:id})
}
const addAccount_Type = (data) => {
return api.post(`/account_type/create.php?`,data)
}
const updateAccount_Type = (data) => {
return api.post(`/account_type/update.php?`,data)
}
export {getAccount_Type,getAllAccount_Type,searchAccount_Type,getOneAccount_Type,deleteAccount_Type,addAccount_Type,updateAccount_Type,getAllAccount_Type,searchAccount_Type,getOneAccount_Type,deleteAccount_Type,addAccount_Type,updateAccount_Type}


