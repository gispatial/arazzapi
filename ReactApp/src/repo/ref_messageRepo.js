import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getRef_Message = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllRef_Message(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchRef_Message(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllRef_Message = (pageno,pagesize) => {
return api.get(`/ref_message/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchRef_Message = (key,pageno,pagesize) => {
return api.get(`/ref_message/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneRef_Message = (id) => {
return api.get(`/ref_message/read_one.php?id=${id}`)
}
const deleteRef_Message = (message_type_code) => {
return api.post(`/ref_message/delete.php?`,{message_type_code:message_type_code})
}
const addRef_Message = (data) => {
return api.post(`/ref_message/create.php?`,data)
}
const updateRef_Message = (data) => {
return api.post(`/ref_message/update.php?`,data)
}
const getAllRef_Message = (pageno,pagesize) => {
return api.get(`/ref_message/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchRef_Message = (key,pageno,pagesize) => {
return api.get(`/ref_message/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneRef_Message = (id) => {
return api.get(`/ref_message/read_one.php?id=${id}`)
}
const deleteRef_Message = (message_type_code) => {
return api.post(`/ref_message/delete.php?`,{message_type_code:message_type_code})
}
const addRef_Message = (data) => {
return api.post(`/ref_message/create.php?`,data)
}
const updateRef_Message = (data) => {
return api.post(`/ref_message/update.php?`,data)
}
export {getRef_Message,getAllRef_Message,searchRef_Message,getOneRef_Message,deleteRef_Message,addRef_Message,updateRef_Message,getAllRef_Message,searchRef_Message,getOneRef_Message,deleteRef_Message,addRef_Message,updateRef_Message}


