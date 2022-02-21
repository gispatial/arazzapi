import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getUser_Account = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllUser_Account(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchUser_Account(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllUser_Account = (pageno,pagesize) => {
return api.get(`/user_account/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchUser_Account = (key,pageno,pagesize) => {
return api.get(`/user_account/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneUser_Account = (id) => {
return api.get(`/user_account/read_one.php?id=${id}`)
}
const deleteUser_Account = (username) => {
return api.post(`/user_account/delete.php?`,{username:username})
}
const addUser_Account = (data) => {
return api.post(`/user_account/create.php?`,data)
}
const updateUser_Account = (data) => {
return api.post(`/user_account/update.php?`,data)
}
const getAllUser_Account = (pageno,pagesize) => {
return api.get(`/user_account/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchUser_Account = (key,pageno,pagesize) => {
return api.get(`/user_account/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneUser_Account = (id) => {
return api.get(`/user_account/read_one.php?id=${id}`)
}
const deleteUser_Account = (username) => {
return api.post(`/user_account/delete.php?`,{username:username})
}
const addUser_Account = (data) => {
return api.post(`/user_account/create.php?`,data)
}
const updateUser_Account = (data) => {
return api.post(`/user_account/update.php?`,data)
}
export {getUser_Account,getAllUser_Account,searchUser_Account,getOneUser_Account,deleteUser_Account,addUser_Account,updateUser_Account,getAllUser_Account,searchUser_Account,getOneUser_Account,deleteUser_Account,addUser_Account,updateUser_Account}


