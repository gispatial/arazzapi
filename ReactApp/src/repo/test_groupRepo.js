import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTest_Group = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTest_Group(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTest_Group(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllTest_Group = (pageno,pagesize) => {
return api.get(`/test_group/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchTest_Group = (key,pageno,pagesize) => {
return api.get(`/test_group/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneTest_Group = (id) => {
return api.get(`/test_group/read_one.php?id=${id}`)
}
const deleteTest_Group = (test_group_code) => {
return api.post(`/test_group/delete.php?`,{test_group_code:test_group_code})
}
const addTest_Group = (data) => {
return api.post(`/test_group/create.php?`,data)
}
const updateTest_Group = (data) => {
return api.post(`/test_group/update.php?`,data)
}
const getAllTest_Group = (pageno,pagesize) => {
return api.get(`/test_group/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchTest_Group = (key,pageno,pagesize) => {
return api.get(`/test_group/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneTest_Group = (id) => {
return api.get(`/test_group/read_one.php?id=${id}`)
}
const deleteTest_Group = (test_group_code) => {
return api.post(`/test_group/delete.php?`,{test_group_code:test_group_code})
}
const addTest_Group = (data) => {
return api.post(`/test_group/create.php?`,data)
}
const updateTest_Group = (data) => {
return api.post(`/test_group/update.php?`,data)
}
export {getTest_Group,getAllTest_Group,searchTest_Group,getOneTest_Group,deleteTest_Group,addTest_Group,updateTest_Group,getAllTest_Group,searchTest_Group,getOneTest_Group,deleteTest_Group,addTest_Group,updateTest_Group}


