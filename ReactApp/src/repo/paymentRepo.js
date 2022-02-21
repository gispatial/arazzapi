import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getPayment = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPayment(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchPayment(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllPayment = (pageno,pagesize) => {
return api.get(`/payment/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPayment = (key,pageno,pagesize) => {
return api.get(`/payment/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePayment = (id) => {
return api.get(`/payment/read_one.php?id=${id}`)
}
const deletePayment = (ref_no) => {
return api.post(`/payment/delete.php?`,{ref_no:ref_no})
}
const addPayment = (data) => {
return api.post(`/payment/create.php?`,data)
}
const updatePayment = (data) => {
return api.post(`/payment/update.php?`,data)
}
const getAllPayment = (pageno,pagesize) => {
return api.get(`/payment/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPayment = (key,pageno,pagesize) => {
return api.get(`/payment/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePayment = (id) => {
return api.get(`/payment/read_one.php?id=${id}`)
}
const deletePayment = (ref_no) => {
return api.post(`/payment/delete.php?`,{ref_no:ref_no})
}
const addPayment = (data) => {
return api.post(`/payment/create.php?`,data)
}
const updatePayment = (data) => {
return api.post(`/payment/update.php?`,data)
}
export {getPayment,getAllPayment,searchPayment,getOnePayment,deletePayment,addPayment,updatePayment,getAllPayment,searchPayment,getOnePayment,deletePayment,addPayment,updatePayment}


