import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getRegistration = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllRegistration(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchRegistration(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllRegistration = (pageno,pagesize) => {
return api.get(`/registration/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchRegistration = (key,pageno,pagesize) => {
return api.get(`/registration/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneRegistration = (id) => {
return api.get(`/registration/read_one.php?id=${id}`)
}
const deleteRegistration = (ERROR_NOPRIMARYKEYFOUND) => {
return api.post(`/registration/delete.php?`,{ERROR_NOPRIMARYKEYFOUND:ERROR_NOPRIMARYKEYFOUND})
}
const addRegistration = (data) => {
return api.post(`/registration/create.php?`,data)
}
const updateRegistration = (data) => {
return api.post(`/registration/update.php?`,data)
}
const getAllRegistration = (pageno,pagesize) => {
return api.get(`/registration/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchRegistration = (key,pageno,pagesize) => {
return api.get(`/registration/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneRegistration = (id) => {
return api.get(`/registration/read_one.php?id=${id}`)
}
const deleteRegistration = (ERROR_NOPRIMARYKEYFOUND) => {
return api.post(`/registration/delete.php?`,{ERROR_NOPRIMARYKEYFOUND:ERROR_NOPRIMARYKEYFOUND})
}
const addRegistration = (data) => {
return api.post(`/registration/create.php?`,data)
}
const updateRegistration = (data) => {
return api.post(`/registration/update.php?`,data)
}
export {getRegistration,getAllRegistration,searchRegistration,getOneRegistration,deleteRegistration,addRegistration,updateRegistration,getAllRegistration,searchRegistration,getOneRegistration,deleteRegistration,addRegistration,updateRegistration}


