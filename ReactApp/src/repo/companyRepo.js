import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCompany = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCompany(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCompany(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllCompany = (pageno,pagesize) => {
return api.get(`/company/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchCompany = (key,pageno,pagesize) => {
return api.get(`/company/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneCompany = (id) => {
return api.get(`/company/read_one.php?id=${id}`)
}
const deleteCompany = (co_id) => {
return api.post(`/company/delete.php?`,{co_id:co_id})
}
const addCompany = (data) => {
return api.post(`/company/create.php?`,data)
}
const updateCompany = (data) => {
return api.post(`/company/update.php?`,data)
}
const getAllCompany = (pageno,pagesize) => {
return api.get(`/company/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchCompany = (key,pageno,pagesize) => {
return api.get(`/company/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneCompany = (id) => {
return api.get(`/company/read_one.php?id=${id}`)
}
const deleteCompany = (co_id) => {
return api.post(`/company/delete.php?`,{co_id:co_id})
}
const addCompany = (data) => {
return api.post(`/company/create.php?`,data)
}
const updateCompany = (data) => {
return api.post(`/company/update.php?`,data)
}
export {getCompany,getAllCompany,searchCompany,getOneCompany,deleteCompany,addCompany,updateCompany,getAllCompany,searchCompany,getOneCompany,deleteCompany,addCompany,updateCompany}


