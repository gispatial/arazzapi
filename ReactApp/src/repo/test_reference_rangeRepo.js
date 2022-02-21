import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTest_Reference_Range = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTest_Reference_Range(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTest_Reference_Range(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllTest_Reference_Range = (pageno,pagesize) => {
return api.get(`/test_reference_range/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchTest_Reference_Range = (key,pageno,pagesize) => {
return api.get(`/test_reference_range/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneTest_Reference_Range = (id) => {
return api.get(`/test_reference_range/read_one.php?id=${id}`)
}
const deleteTest_Reference_Range = (test_marker_code) => {
return api.post(`/test_reference_range/delete.php?`,{test_marker_code:test_marker_code})
}
const addTest_Reference_Range = (data) => {
return api.post(`/test_reference_range/create.php?`,data)
}
const updateTest_Reference_Range = (data) => {
return api.post(`/test_reference_range/update.php?`,data)
}
const getAllTest_Reference_Range = (pageno,pagesize) => {
return api.get(`/test_reference_range/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchTest_Reference_Range = (key,pageno,pagesize) => {
return api.get(`/test_reference_range/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneTest_Reference_Range = (id) => {
return api.get(`/test_reference_range/read_one.php?id=${id}`)
}
const deleteTest_Reference_Range = (test_marker_code) => {
return api.post(`/test_reference_range/delete.php?`,{test_marker_code:test_marker_code})
}
const addTest_Reference_Range = (data) => {
return api.post(`/test_reference_range/create.php?`,data)
}
const updateTest_Reference_Range = (data) => {
return api.post(`/test_reference_range/update.php?`,data)
}
export {getTest_Reference_Range,getAllTest_Reference_Range,searchTest_Reference_Range,getOneTest_Reference_Range,deleteTest_Reference_Range,addTest_Reference_Range,updateTest_Reference_Range,getAllTest_Reference_Range,searchTest_Reference_Range,getOneTest_Reference_Range,deleteTest_Reference_Range,addTest_Reference_Range,updateTest_Reference_Range}


