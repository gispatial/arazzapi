import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getMessage_Inbox = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllMessage_Inbox(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchMessage_Inbox(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllMessage_Inbox = (pageno,pagesize) => {
return api.get(`/message_inbox/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchMessage_Inbox = (key,pageno,pagesize) => {
return api.get(`/message_inbox/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneMessage_Inbox = (id) => {
return api.get(`/message_inbox/read_one.php?id=${id}`)
}
const deleteMessage_Inbox = (message_inbox_code) => {
return api.post(`/message_inbox/delete.php?`,{message_inbox_code:message_inbox_code})
}
const addMessage_Inbox = (data) => {
return api.post(`/message_inbox/create.php?`,data)
}
const updateMessage_Inbox = (data) => {
return api.post(`/message_inbox/update.php?`,data)
}
const getAllMessage_Inbox = (pageno,pagesize) => {
return api.get(`/message_inbox/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchMessage_Inbox = (key,pageno,pagesize) => {
return api.get(`/message_inbox/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneMessage_Inbox = (id) => {
return api.get(`/message_inbox/read_one.php?id=${id}`)
}
const deleteMessage_Inbox = (message_inbox_code) => {
return api.post(`/message_inbox/delete.php?`,{message_inbox_code:message_inbox_code})
}
const addMessage_Inbox = (data) => {
return api.post(`/message_inbox/create.php?`,data)
}
const updateMessage_Inbox = (data) => {
return api.post(`/message_inbox/update.php?`,data)
}
export {getMessage_Inbox,getAllMessage_Inbox,searchMessage_Inbox,getOneMessage_Inbox,deleteMessage_Inbox,addMessage_Inbox,updateMessage_Inbox,getAllMessage_Inbox,searchMessage_Inbox,getOneMessage_Inbox,deleteMessage_Inbox,addMessage_Inbox,updateMessage_Inbox}


