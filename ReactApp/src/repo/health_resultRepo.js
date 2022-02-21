import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getHealth_Result = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllHealth_Result(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchHealth_Result(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllHealth_Result = (pageno,pagesize) => {
return api.get(`/health_result/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchHealth_Result = (key,pageno,pagesize) => {
return api.get(`/health_result/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneHealth_Result = (id) => {
return api.get(`/health_result/read_one.php?id=${id}`)
}
const deleteHealth_Result = (refno) => {
return api.post(`/health_result/delete.php?`,{refno:refno})
}
const addHealth_Result = (data) => {
return api.post(`/health_result/create.php?`,data)
}
const updateHealth_Result = (data) => {
return api.post(`/health_result/update.php?`,data)
}
const getAllHealth_Result = (pageno,pagesize) => {
return api.get(`/health_result/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchHealth_Result = (key,pageno,pagesize) => {
return api.get(`/health_result/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneHealth_Result = (id) => {
return api.get(`/health_result/read_one.php?id=${id}`)
}
const deleteHealth_Result = (refno) => {
return api.post(`/health_result/delete.php?`,{refno:refno})
}
const addHealth_Result = (data) => {
return api.post(`/health_result/create.php?`,data)
}
const updateHealth_Result = (data) => {
return api.post(`/health_result/update.php?`,data)
}
export {getHealth_Result,getAllHealth_Result,searchHealth_Result,getOneHealth_Result,deleteHealth_Result,addHealth_Result,updateHealth_Result,getAllHealth_Result,searchHealth_Result,getOneHealth_Result,deleteHealth_Result,addHealth_Result,updateHealth_Result}


