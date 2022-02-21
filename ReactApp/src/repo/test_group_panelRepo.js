import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTest_Group_Panel = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTest_Group_Panel(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTest_Group_Panel(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllTest_Group_Panel = (pageno,pagesize) => {
return api.get(`/test_group_panel/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchTest_Group_Panel = (key,pageno,pagesize) => {
return api.get(`/test_group_panel/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneTest_Group_Panel = (id) => {
return api.get(`/test_group_panel/read_one.php?id=${id}`)
}
const deleteTest_Group_Panel = (test_group_code) => {
return api.post(`/test_group_panel/delete.php?`,{test_group_code:test_group_code})
}
const addTest_Group_Panel = (data) => {
return api.post(`/test_group_panel/create.php?`,data)
}
const updateTest_Group_Panel = (data) => {
return api.post(`/test_group_panel/update.php?`,data)
}
const getAllTest_Group_Panel = (pageno,pagesize) => {
return api.get(`/test_group_panel/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchTest_Group_Panel = (key,pageno,pagesize) => {
return api.get(`/test_group_panel/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneTest_Group_Panel = (id) => {
return api.get(`/test_group_panel/read_one.php?id=${id}`)
}
const deleteTest_Group_Panel = (test_group_code) => {
return api.post(`/test_group_panel/delete.php?`,{test_group_code:test_group_code})
}
const addTest_Group_Panel = (data) => {
return api.post(`/test_group_panel/create.php?`,data)
}
const updateTest_Group_Panel = (data) => {
return api.post(`/test_group_panel/update.php?`,data)
}
export {getTest_Group_Panel,getAllTest_Group_Panel,searchTest_Group_Panel,getOneTest_Group_Panel,deleteTest_Group_Panel,addTest_Group_Panel,updateTest_Group_Panel,getAllTest_Group_Panel,searchTest_Group_Panel,getOneTest_Group_Panel,deleteTest_Group_Panel,addTest_Group_Panel,updateTest_Group_Panel}


