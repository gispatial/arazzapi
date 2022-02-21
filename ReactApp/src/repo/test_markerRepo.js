import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTest_Marker = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTest_Marker(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTest_Marker(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllTest_Marker = (pageno,pagesize) => {
return api.get(`/test_marker/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchTest_Marker = (key,pageno,pagesize) => {
return api.get(`/test_marker/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneTest_Marker = (id) => {
return api.get(`/test_marker/read_one.php?id=${id}`)
}
const deleteTest_Marker = (test_panel_code) => {
return api.post(`/test_marker/delete.php?`,{test_panel_code:test_panel_code})
}
const addTest_Marker = (data) => {
return api.post(`/test_marker/create.php?`,data)
}
const updateTest_Marker = (data) => {
return api.post(`/test_marker/update.php?`,data)
}
const getAllTest_Marker = (pageno,pagesize) => {
return api.get(`/test_marker/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchTest_Marker = (key,pageno,pagesize) => {
return api.get(`/test_marker/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneTest_Marker = (id) => {
return api.get(`/test_marker/read_one.php?id=${id}`)
}
const deleteTest_Marker = (test_panel_code) => {
return api.post(`/test_marker/delete.php?`,{test_panel_code:test_panel_code})
}
const addTest_Marker = (data) => {
return api.post(`/test_marker/create.php?`,data)
}
const updateTest_Marker = (data) => {
return api.post(`/test_marker/update.php?`,data)
}
export {getTest_Marker,getAllTest_Marker,searchTest_Marker,getOneTest_Marker,deleteTest_Marker,addTest_Marker,updateTest_Marker,getAllTest_Marker,searchTest_Marker,getOneTest_Marker,deleteTest_Marker,addTest_Marker,updateTest_Marker}


