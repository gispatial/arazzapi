import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCompany_Document = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCompany_Document(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCompany_Document(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllCompany_Document = (pageno,pagesize) => {
return api.get(`/company_document/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchCompany_Document = (key,pageno,pagesize) => {
return api.get(`/company_document/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneCompany_Document = (id) => {
return api.get(`/company_document/read_one.php?id=${id}`)
}
const deleteCompany_Document = (co_reg_no) => {
return api.post(`/company_document/delete.php?`,{co_reg_no:co_reg_no})
}
const addCompany_Document = (data) => {
return api.post(`/company_document/create.php?`,data)
}
const updateCompany_Document = (data) => {
return api.post(`/company_document/update.php?`,data)
}
const getAllCompany_Document = (pageno,pagesize) => {
return api.get(`/company_document/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchCompany_Document = (key,pageno,pagesize) => {
return api.get(`/company_document/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneCompany_Document = (id) => {
return api.get(`/company_document/read_one.php?id=${id}`)
}
const deleteCompany_Document = (co_reg_no) => {
return api.post(`/company_document/delete.php?`,{co_reg_no:co_reg_no})
}
const addCompany_Document = (data) => {
return api.post(`/company_document/create.php?`,data)
}
const updateCompany_Document = (data) => {
return api.post(`/company_document/update.php?`,data)
}
export {getCompany_Document,getAllCompany_Document,searchCompany_Document,getOneCompany_Document,deleteCompany_Document,addCompany_Document,updateCompany_Document,getAllCompany_Document,searchCompany_Document,getOneCompany_Document,deleteCompany_Document,addCompany_Document,updateCompany_Document}


