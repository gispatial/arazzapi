import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getAdd_On_Services = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllAdd_On_Services(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchAdd_On_Services(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllAdd_On_Services = (pageno,pagesize) => {
return api.get(`/add_on_services/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchAdd_On_Services = (key,pageno,pagesize) => {
return api.get(`/add_on_services/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneAdd_On_Services = (id) => {
return api.get(`/add_on_services/read_one.php?id=${id}`)
}
const deleteAdd_On_Services = (add_on_code) => {
return api.post(`/add_on_services/delete.php?`,{add_on_code:add_on_code})
}
const addAdd_On_Services = (data) => {
return api.post(`/add_on_services/create.php?`,data)
}
const updateAdd_On_Services = (data) => {
return api.post(`/add_on_services/update.php?`,data)
}
const getAllAdd_On_Services = (pageno,pagesize) => {
return api.get(`/add_on_services/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchAdd_On_Services = (key,pageno,pagesize) => {
return api.get(`/add_on_services/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneAdd_On_Services = (id) => {
return api.get(`/add_on_services/read_one.php?id=${id}`)
}
const deleteAdd_On_Services = (add_on_code) => {
return api.post(`/add_on_services/delete.php?`,{add_on_code:add_on_code})
}
const addAdd_On_Services = (data) => {
return api.post(`/add_on_services/create.php?`,data)
}
const updateAdd_On_Services = (data) => {
return api.post(`/add_on_services/update.php?`,data)
}
export {getAdd_On_Services,getAllAdd_On_Services,searchAdd_On_Services,getOneAdd_On_Services,deleteAdd_On_Services,addAdd_On_Services,updateAdd_On_Services,getAllAdd_On_Services,searchAdd_On_Services,getOneAdd_On_Services,deleteAdd_On_Services,addAdd_On_Services,updateAdd_On_Services}


