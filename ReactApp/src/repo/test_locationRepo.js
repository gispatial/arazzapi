import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTest_Location = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTest_Location(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTest_Location(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllTest_Location = (pageno,pagesize) => {
return api.get(`/test_location/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchTest_Location = (key,pageno,pagesize) => {
return api.get(`/test_location/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneTest_Location = (id) => {
return api.get(`/test_location/read_one.php?id=${id}`)
}
const deleteTest_Location = (code) => {
return api.post(`/test_location/delete.php?`,{code:code})
}
const addTest_Location = (data) => {
return api.post(`/test_location/create.php?`,data)
}
const updateTest_Location = (data) => {
return api.post(`/test_location/update.php?`,data)
}
const getAllTest_Location = (pageno,pagesize) => {
return api.get(`/test_location/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchTest_Location = (key,pageno,pagesize) => {
return api.get(`/test_location/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneTest_Location = (id) => {
return api.get(`/test_location/read_one.php?id=${id}`)
}
const deleteTest_Location = (code) => {
return api.post(`/test_location/delete.php?`,{code:code})
}
const addTest_Location = (data) => {
return api.post(`/test_location/create.php?`,data)
}
const updateTest_Location = (data) => {
return api.post(`/test_location/update.php?`,data)
}
export {getTest_Location,getAllTest_Location,searchTest_Location,getOneTest_Location,deleteTest_Location,addTest_Location,updateTest_Location,getAllTest_Location,searchTest_Location,getOneTest_Location,deleteTest_Location,addTest_Location,updateTest_Location}


