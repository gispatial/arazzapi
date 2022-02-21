import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getRef_Payment_Method = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllRef_Payment_Method(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchRef_Payment_Method(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllRef_Payment_Method = (pageno,pagesize) => {
return api.get(`/ref_payment_method/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchRef_Payment_Method = (key,pageno,pagesize) => {
return api.get(`/ref_payment_method/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneRef_Payment_Method = (id) => {
return api.get(`/ref_payment_method/read_one.php?id=${id}`)
}
const deleteRef_Payment_Method = (code) => {
return api.post(`/ref_payment_method/delete.php?`,{code:code})
}
const addRef_Payment_Method = (data) => {
return api.post(`/ref_payment_method/create.php?`,data)
}
const updateRef_Payment_Method = (data) => {
return api.post(`/ref_payment_method/update.php?`,data)
}
const getAllRef_Payment_Method = (pageno,pagesize) => {
return api.get(`/ref_payment_method/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchRef_Payment_Method = (key,pageno,pagesize) => {
return api.get(`/ref_payment_method/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneRef_Payment_Method = (id) => {
return api.get(`/ref_payment_method/read_one.php?id=${id}`)
}
const deleteRef_Payment_Method = (code) => {
return api.post(`/ref_payment_method/delete.php?`,{code:code})
}
const addRef_Payment_Method = (data) => {
return api.post(`/ref_payment_method/create.php?`,data)
}
const updateRef_Payment_Method = (data) => {
return api.post(`/ref_payment_method/update.php?`,data)
}
export {getRef_Payment_Method,getAllRef_Payment_Method,searchRef_Payment_Method,getOneRef_Payment_Method,deleteRef_Payment_Method,addRef_Payment_Method,updateRef_Payment_Method,getAllRef_Payment_Method,searchRef_Payment_Method,getOneRef_Payment_Method,deleteRef_Payment_Method,addRef_Payment_Method,updateRef_Payment_Method}


