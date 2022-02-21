import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getMessage_Document = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllMessage_Document(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchMessage_Document(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllMessage_Document = (pageno,pagesize) => {
return api.get(`/message_document/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchMessage_Document = (key,pageno,pagesize) => {
return api.get(`/message_document/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneMessage_Document = (id) => {
return api.get(`/message_document/read_one.php?id=${id}`)
}
const deleteMessage_Document = (message_id) => {
return api.post(`/message_document/delete.php?`,{message_id:message_id})
}
const addMessage_Document = (data) => {
return api.post(`/message_document/create.php?`,data)
}
const updateMessage_Document = (data) => {
return api.post(`/message_document/update.php?`,data)
}
const getAllMessage_Document = (pageno,pagesize) => {
return api.get(`/message_document/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchMessage_Document = (key,pageno,pagesize) => {
return api.get(`/message_document/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneMessage_Document = (id) => {
return api.get(`/message_document/read_one.php?id=${id}`)
}
const deleteMessage_Document = (message_id) => {
return api.post(`/message_document/delete.php?`,{message_id:message_id})
}
const addMessage_Document = (data) => {
return api.post(`/message_document/create.php?`,data)
}
const updateMessage_Document = (data) => {
return api.post(`/message_document/update.php?`,data)
}
export {getMessage_Document,getAllMessage_Document,searchMessage_Document,getOneMessage_Document,deleteMessage_Document,addMessage_Document,updateMessage_Document,getAllMessage_Document,searchMessage_Document,getOneMessage_Document,deleteMessage_Document,addMessage_Document,updateMessage_Document}


