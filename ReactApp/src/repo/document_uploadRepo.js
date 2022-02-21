import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getDocument_Upload = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllDocument_Upload(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchDocument_Upload(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllDocument_Upload = (pageno,pagesize) => {
return api.get(`/document_upload/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchDocument_Upload = (key,pageno,pagesize) => {
return api.get(`/document_upload/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneDocument_Upload = (id) => {
return api.get(`/document_upload/read_one.php?id=${id}`)
}
const deleteDocument_Upload = (package_category) => {
return api.post(`/document_upload/delete.php?`,{package_category:package_category})
}
const addDocument_Upload = (data) => {
return api.post(`/document_upload/create.php?`,data)
}
const updateDocument_Upload = (data) => {
return api.post(`/document_upload/update.php?`,data)
}
const getAllDocument_Upload = (pageno,pagesize) => {
return api.get(`/document_upload/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchDocument_Upload = (key,pageno,pagesize) => {
return api.get(`/document_upload/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneDocument_Upload = (id) => {
return api.get(`/document_upload/read_one.php?id=${id}`)
}
const deleteDocument_Upload = (package_category) => {
return api.post(`/document_upload/delete.php?`,{package_category:package_category})
}
const addDocument_Upload = (data) => {
return api.post(`/document_upload/create.php?`,data)
}
const updateDocument_Upload = (data) => {
return api.post(`/document_upload/update.php?`,data)
}
export {getDocument_Upload,getAllDocument_Upload,searchDocument_Upload,getOneDocument_Upload,deleteDocument_Upload,addDocument_Upload,updateDocument_Upload,getAllDocument_Upload,searchDocument_Upload,getOneDocument_Upload,deleteDocument_Upload,addDocument_Upload,updateDocument_Upload}


