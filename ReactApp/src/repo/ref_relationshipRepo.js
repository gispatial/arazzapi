import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getRef_Relationship = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllRef_Relationship(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchRef_Relationship(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllRef_Relationship = (pageno,pagesize) => {
return api.get(`/ref_relationship/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchRef_Relationship = (key,pageno,pagesize) => {
return api.get(`/ref_relationship/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneRef_Relationship = (id) => {
return api.get(`/ref_relationship/read_one.php?id=${id}`)
}
const deleteRef_Relationship = (code) => {
return api.post(`/ref_relationship/delete.php?`,{code:code})
}
const addRef_Relationship = (data) => {
return api.post(`/ref_relationship/create.php?`,data)
}
const updateRef_Relationship = (data) => {
return api.post(`/ref_relationship/update.php?`,data)
}
const getAllRef_Relationship = (pageno,pagesize) => {
return api.get(`/ref_relationship/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchRef_Relationship = (key,pageno,pagesize) => {
return api.get(`/ref_relationship/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneRef_Relationship = (id) => {
return api.get(`/ref_relationship/read_one.php?id=${id}`)
}
const deleteRef_Relationship = (code) => {
return api.post(`/ref_relationship/delete.php?`,{code:code})
}
const addRef_Relationship = (data) => {
return api.post(`/ref_relationship/create.php?`,data)
}
const updateRef_Relationship = (data) => {
return api.post(`/ref_relationship/update.php?`,data)
}
export {getRef_Relationship,getAllRef_Relationship,searchRef_Relationship,getOneRef_Relationship,deleteRef_Relationship,addRef_Relationship,updateRef_Relationship,getAllRef_Relationship,searchRef_Relationship,getOneRef_Relationship,deleteRef_Relationship,addRef_Relationship,updateRef_Relationship}


