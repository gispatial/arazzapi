import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTest_Panel = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTest_Panel(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTest_Panel(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllTest_Panel = (pageno,pagesize) => {
return api.get(`/test_panel/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchTest_Panel = (key,pageno,pagesize) => {
return api.get(`/test_panel/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneTest_Panel = (id) => {
return api.get(`/test_panel/read_one.php?id=${id}`)
}
const deleteTest_Panel = (panel_id) => {
return api.post(`/test_panel/delete.php?`,{panel_id:panel_id})
}
const addTest_Panel = (data) => {
return api.post(`/test_panel/create.php?`,data)
}
const updateTest_Panel = (data) => {
return api.post(`/test_panel/update.php?`,data)
}
const getAllTest_Panel = (pageno,pagesize) => {
return api.get(`/test_panel/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchTest_Panel = (key,pageno,pagesize) => {
return api.get(`/test_panel/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneTest_Panel = (id) => {
return api.get(`/test_panel/read_one.php?id=${id}`)
}
const deleteTest_Panel = (panel_id) => {
return api.post(`/test_panel/delete.php?`,{panel_id:panel_id})
}
const addTest_Panel = (data) => {
return api.post(`/test_panel/create.php?`,data)
}
const updateTest_Panel = (data) => {
return api.post(`/test_panel/update.php?`,data)
}
export {getTest_Panel,getAllTest_Panel,searchTest_Panel,getOneTest_Panel,deleteTest_Panel,addTest_Panel,updateTest_Panel,getAllTest_Panel,searchTest_Panel,getOneTest_Panel,deleteTest_Panel,addTest_Panel,updateTest_Panel}


