import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getAccount_Id = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllAccount_Id(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchAccount_Id(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllAccount_Id = (pageno,pagesize) => {
return api.get(`/account_id/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchAccount_Id = (key,pageno,pagesize) => {
return api.get(`/account_id/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneAccount_Id = (id) => {
return api.get(`/account_id/read_one.php?id=${id}`)
}
const deleteAccount_Id = (id) => {
return api.post(`/account_id/delete.php?`,{id:id})
}
const addAccount_Id = (data) => {
return api.post(`/account_id/create.php?`,data)
}
const updateAccount_Id = (data) => {
return api.post(`/account_id/update.php?`,data)
}
const getAllAccount_Id = (pageno,pagesize) => {
return api.get(`/account_id/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchAccount_Id = (key,pageno,pagesize) => {
return api.get(`/account_id/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneAccount_Id = (id) => {
return api.get(`/account_id/read_one.php?id=${id}`)
}
const deleteAccount_Id = (id) => {
return api.post(`/account_id/delete.php?`,{id:id})
}
const addAccount_Id = (data) => {
return api.post(`/account_id/create.php?`,data)
}
const updateAccount_Id = (data) => {
return api.post(`/account_id/update.php?`,data)
}
export {getAccount_Id,getAllAccount_Id,searchAccount_Id,getOneAccount_Id,deleteAccount_Id,addAccount_Id,updateAccount_Id,getAllAccount_Id,searchAccount_Id,getOneAccount_Id,deleteAccount_Id,addAccount_Id,updateAccount_Id}


