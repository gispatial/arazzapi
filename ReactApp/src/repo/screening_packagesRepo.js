import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getScreening_Packages = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllScreening_Packages(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchScreening_Packages(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllScreening_Packages = (pageno,pagesize) => {
return api.get(`/screening_packages/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchScreening_Packages = (key,pageno,pagesize) => {
return api.get(`/screening_packages/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneScreening_Packages = (id) => {
return api.get(`/screening_packages/read_one.php?id=${id}`)
}
const deleteScreening_Packages = (package_code) => {
return api.post(`/screening_packages/delete.php?`,{package_code:package_code})
}
const addScreening_Packages = (data) => {
return api.post(`/screening_packages/create.php?`,data)
}
const updateScreening_Packages = (data) => {
return api.post(`/screening_packages/update.php?`,data)
}
const getAllScreening_Packages = (pageno,pagesize) => {
return api.get(`/screening_packages/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchScreening_Packages = (key,pageno,pagesize) => {
return api.get(`/screening_packages/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneScreening_Packages = (id) => {
return api.get(`/screening_packages/read_one.php?id=${id}`)
}
const deleteScreening_Packages = (package_code) => {
return api.post(`/screening_packages/delete.php?`,{package_code:package_code})
}
const addScreening_Packages = (data) => {
return api.post(`/screening_packages/create.php?`,data)
}
const updateScreening_Packages = (data) => {
return api.post(`/screening_packages/update.php?`,data)
}
export {getScreening_Packages,getAllScreening_Packages,searchScreening_Packages,getOneScreening_Packages,deleteScreening_Packages,addScreening_Packages,updateScreening_Packages,getAllScreening_Packages,searchScreening_Packages,getOneScreening_Packages,deleteScreening_Packages,addScreening_Packages,updateScreening_Packages}


