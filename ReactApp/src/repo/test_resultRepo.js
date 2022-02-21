import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTest_Result = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTest_Result(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTest_Result(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllTest_Result = (pageno,pagesize) => {
return api.get(`/test_result/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchTest_Result = (key,pageno,pagesize) => {
return api.get(`/test_result/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneTest_Result = (id) => {
return api.get(`/test_result/read_one.php?id=${id}`)
}
const deleteTest_Result = (patient_ic_no) => {
return api.post(`/test_result/delete.php?`,{patient_ic_no:patient_ic_no})
}
const addTest_Result = (data) => {
return api.post(`/test_result/create.php?`,data)
}
const updateTest_Result = (data) => {
return api.post(`/test_result/update.php?`,data)
}
const getAllTest_Result = (pageno,pagesize) => {
return api.get(`/test_result/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchTest_Result = (key,pageno,pagesize) => {
return api.get(`/test_result/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneTest_Result = (id) => {
return api.get(`/test_result/read_one.php?id=${id}`)
}
const deleteTest_Result = (patient_ic_no) => {
return api.post(`/test_result/delete.php?`,{patient_ic_no:patient_ic_no})
}
const addTest_Result = (data) => {
return api.post(`/test_result/create.php?`,data)
}
const updateTest_Result = (data) => {
return api.post(`/test_result/update.php?`,data)
}
export {getTest_Result,getAllTest_Result,searchTest_Result,getOneTest_Result,deleteTest_Result,addTest_Result,updateTest_Result,getAllTest_Result,searchTest_Result,getOneTest_Result,deleteTest_Result,addTest_Result,updateTest_Result}


