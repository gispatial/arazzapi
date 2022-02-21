import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getMessage_Box = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllMessage_Box(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchMessage_Box(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllMessage_Box = (pageno,pagesize) => {
return api.get(`/message_box/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchMessage_Box = (key,pageno,pagesize) => {
return api.get(`/message_box/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneMessage_Box = (id) => {
return api.get(`/message_box/read_one.php?id=${id}`)
}
const deleteMessage_Box = (message_id) => {
return api.post(`/message_box/delete.php?`,{message_id:message_id})
}
const addMessage_Box = (data) => {
return api.post(`/message_box/create.php?`,data)
}
const updateMessage_Box = (data) => {
return api.post(`/message_box/update.php?`,data)
}
const getAllMessage_Box = (pageno,pagesize) => {
return api.get(`/message_box/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchMessage_Box = (key,pageno,pagesize) => {
return api.get(`/message_box/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneMessage_Box = (id) => {
return api.get(`/message_box/read_one.php?id=${id}`)
}
const deleteMessage_Box = (message_id) => {
return api.post(`/message_box/delete.php?`,{message_id:message_id})
}
const addMessage_Box = (data) => {
return api.post(`/message_box/create.php?`,data)
}
const updateMessage_Box = (data) => {
return api.post(`/message_box/update.php?`,data)
}
export {getMessage_Box,getAllMessage_Box,searchMessage_Box,getOneMessage_Box,deleteMessage_Box,addMessage_Box,updateMessage_Box,getAllMessage_Box,searchMessage_Box,getOneMessage_Box,deleteMessage_Box,addMessage_Box,updateMessage_Box}


