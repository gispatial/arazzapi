import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getContent_Mgmt = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllContent_Mgmt(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchContent_Mgmt(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllContent_Mgmt = (pageno,pagesize) => {
return api.get(`/content_mgmt/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchContent_Mgmt = (key,pageno,pagesize) => {
return api.get(`/content_mgmt/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneContent_Mgmt = (id) => {
return api.get(`/content_mgmt/read_one.php?id=${id}`)
}
const deleteContent_Mgmt = (id) => {
return api.post(`/content_mgmt/delete.php?`,{id:id})
}
const addContent_Mgmt = (data) => {
return api.post(`/content_mgmt/create.php?`,data)
}
const updateContent_Mgmt = (data) => {
return api.post(`/content_mgmt/update.php?`,data)
}
const getAllContent_Mgmt = (pageno,pagesize) => {
return api.get(`/content_mgmt/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchContent_Mgmt = (key,pageno,pagesize) => {
return api.get(`/content_mgmt/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneContent_Mgmt = (id) => {
return api.get(`/content_mgmt/read_one.php?id=${id}`)
}
const deleteContent_Mgmt = (id) => {
return api.post(`/content_mgmt/delete.php?`,{id:id})
}
const addContent_Mgmt = (data) => {
return api.post(`/content_mgmt/create.php?`,data)
}
const updateContent_Mgmt = (data) => {
return api.post(`/content_mgmt/update.php?`,data)
}
export {getContent_Mgmt,getAllContent_Mgmt,searchContent_Mgmt,getOneContent_Mgmt,deleteContent_Mgmt,addContent_Mgmt,updateContent_Mgmt,getAllContent_Mgmt,searchContent_Mgmt,getOneContent_Mgmt,deleteContent_Mgmt,addContent_Mgmt,updateContent_Mgmt}


