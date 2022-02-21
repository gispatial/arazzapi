import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getPre_Registration = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPre_Registration(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchPre_Registration(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllPre_Registration = (pageno,pagesize) => {
return api.get(`/pre_registration/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPre_Registration = (key,pageno,pagesize) => {
return api.get(`/pre_registration/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePre_Registration = (id) => {
return api.get(`/pre_registration/read_one.php?id=${id}`)
}
const deletePre_Registration = (seq_reg_no) => {
return api.post(`/pre_registration/delete.php?`,{seq_reg_no:seq_reg_no})
}
const addPre_Registration = (data) => {
return api.post(`/pre_registration/create.php?`,data)
}
const updatePre_Registration = (data) => {
return api.post(`/pre_registration/update.php?`,data)
}
const getAllPre_Registration = (pageno,pagesize) => {
return api.get(`/pre_registration/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPre_Registration = (key,pageno,pagesize) => {
return api.get(`/pre_registration/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePre_Registration = (id) => {
return api.get(`/pre_registration/read_one.php?id=${id}`)
}
const deletePre_Registration = (seq_reg_no) => {
return api.post(`/pre_registration/delete.php?`,{seq_reg_no:seq_reg_no})
}
const addPre_Registration = (data) => {
return api.post(`/pre_registration/create.php?`,data)
}
const updatePre_Registration = (data) => {
return api.post(`/pre_registration/update.php?`,data)
}
export {getPre_Registration,getAllPre_Registration,searchPre_Registration,getOnePre_Registration,deletePre_Registration,addPre_Registration,updatePre_Registration,getAllPre_Registration,searchPre_Registration,getOnePre_Registration,deletePre_Registration,addPre_Registration,updatePre_Registration}


