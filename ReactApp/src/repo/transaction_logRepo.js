import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTransaction_Log = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTransaction_Log(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTransaction_Log(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllTransaction_Log = (pageno,pagesize) => {
return api.get(`/transaction_log/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchTransaction_Log = (key,pageno,pagesize) => {
return api.get(`/transaction_log/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneTransaction_Log = (id) => {
return api.get(`/transaction_log/read_one.php?id=${id}`)
}
const deleteTransaction_Log = (id) => {
return api.post(`/transaction_log/delete.php?`,{id:id})
}
const addTransaction_Log = (data) => {
return api.post(`/transaction_log/create.php?`,data)
}
const updateTransaction_Log = (data) => {
return api.post(`/transaction_log/update.php?`,data)
}
const getAllTransaction_Log = (pageno,pagesize) => {
return api.get(`/transaction_log/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchTransaction_Log = (key,pageno,pagesize) => {
return api.get(`/transaction_log/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneTransaction_Log = (id) => {
return api.get(`/transaction_log/read_one.php?id=${id}`)
}
const deleteTransaction_Log = (id) => {
return api.post(`/transaction_log/delete.php?`,{id:id})
}
const addTransaction_Log = (data) => {
return api.post(`/transaction_log/create.php?`,data)
}
const updateTransaction_Log = (data) => {
return api.post(`/transaction_log/update.php?`,data)
}
export {getTransaction_Log,getAllTransaction_Log,searchTransaction_Log,getOneTransaction_Log,deleteTransaction_Log,addTransaction_Log,updateTransaction_Log,getAllTransaction_Log,searchTransaction_Log,getOneTransaction_Log,deleteTransaction_Log,addTransaction_Log,updateTransaction_Log}


