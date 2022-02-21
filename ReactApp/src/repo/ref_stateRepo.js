import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getRef_State = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllRef_State(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchRef_State(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllRef_State = (pageno,pagesize) => {
return api.get(`/ref_state/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchRef_State = (key,pageno,pagesize) => {
return api.get(`/ref_state/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneRef_State = (id) => {
return api.get(`/ref_state/read_one.php?id=${id}`)
}
const deleteRef_State = (state_code) => {
return api.post(`/ref_state/delete.php?`,{state_code:state_code})
}
const addRef_State = (data) => {
return api.post(`/ref_state/create.php?`,data)
}
const updateRef_State = (data) => {
return api.post(`/ref_state/update.php?`,data)
}
const getAllRef_State = (pageno,pagesize) => {
return api.get(`/ref_state/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchRef_State = (key,pageno,pagesize) => {
return api.get(`/ref_state/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneRef_State = (id) => {
return api.get(`/ref_state/read_one.php?id=${id}`)
}
const deleteRef_State = (state_code) => {
return api.post(`/ref_state/delete.php?`,{state_code:state_code})
}
const addRef_State = (data) => {
return api.post(`/ref_state/create.php?`,data)
}
const updateRef_State = (data) => {
return api.post(`/ref_state/update.php?`,data)
}
export {getRef_State,getAllRef_State,searchRef_State,getOneRef_State,deleteRef_State,addRef_State,updateRef_State,getAllRef_State,searchRef_State,getOneRef_State,deleteRef_State,addRef_State,updateRef_State}


