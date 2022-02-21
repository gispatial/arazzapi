import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getAccount_Type_2 = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllAccount_Type_2(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchAccount_Type_2(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllAccount_Type_2 = (pageno,pagesize) => {
return api.get(`/account_type_2/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchAccount_Type_2 = (key,pageno,pagesize) => {
return api.get(`/account_type_2/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneAccount_Type_2 = (id) => {
return api.get(`/account_type_2/read_one.php?id=${id}`)
}
const deleteAccount_Type_2 = (id) => {
return api.post(`/account_type_2/delete.php?`,{id:id})
}
const addAccount_Type_2 = (data) => {
return api.post(`/account_type_2/create.php?`,data)
}
const updateAccount_Type_2 = (data) => {
return api.post(`/account_type_2/update.php?`,data)
}
const getAllAccount_Type_2 = (pageno,pagesize) => {
return api.get(`/account_type_2/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchAccount_Type_2 = (key,pageno,pagesize) => {
return api.get(`/account_type_2/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneAccount_Type_2 = (id) => {
return api.get(`/account_type_2/read_one.php?id=${id}`)
}
const deleteAccount_Type_2 = (id) => {
return api.post(`/account_type_2/delete.php?`,{id:id})
}
const addAccount_Type_2 = (data) => {
return api.post(`/account_type_2/create.php?`,data)
}
const updateAccount_Type_2 = (data) => {
return api.post(`/account_type_2/update.php?`,data)
}
export {getAccount_Type_2,getAllAccount_Type_2,searchAccount_Type_2,getOneAccount_Type_2,deleteAccount_Type_2,addAccount_Type_2,updateAccount_Type_2,getAllAccount_Type_2,searchAccount_Type_2,getOneAccount_Type_2,deleteAccount_Type_2,addAccount_Type_2,updateAccount_Type_2}


