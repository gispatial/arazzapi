import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getPackage_Add_Ons = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPackage_Add_Ons(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchPackage_Add_Ons(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllPackage_Add_Ons = (pageno,pagesize) => {
return api.get(`/package_add_ons/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPackage_Add_Ons = (key,pageno,pagesize) => {
return api.get(`/package_add_ons/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePackage_Add_Ons = (id) => {
return api.get(`/package_add_ons/read_one.php?id=${id}`)
}
const deletePackage_Add_Ons = (package_code) => {
return api.post(`/package_add_ons/delete.php?`,{package_code:package_code})
}
const addPackage_Add_Ons = (data) => {
return api.post(`/package_add_ons/create.php?`,data)
}
const updatePackage_Add_Ons = (data) => {
return api.post(`/package_add_ons/update.php?`,data)
}
const getAllPackage_Add_Ons = (pageno,pagesize) => {
return api.get(`/package_add_ons/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPackage_Add_Ons = (key,pageno,pagesize) => {
return api.get(`/package_add_ons/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePackage_Add_Ons = (id) => {
return api.get(`/package_add_ons/read_one.php?id=${id}`)
}
const deletePackage_Add_Ons = (package_code) => {
return api.post(`/package_add_ons/delete.php?`,{package_code:package_code})
}
const addPackage_Add_Ons = (data) => {
return api.post(`/package_add_ons/create.php?`,data)
}
const updatePackage_Add_Ons = (data) => {
return api.post(`/package_add_ons/update.php?`,data)
}
export {getPackage_Add_Ons,getAllPackage_Add_Ons,searchPackage_Add_Ons,getOnePackage_Add_Ons,deletePackage_Add_Ons,addPackage_Add_Ons,updatePackage_Add_Ons,getAllPackage_Add_Ons,searchPackage_Add_Ons,getOnePackage_Add_Ons,deletePackage_Add_Ons,addPackage_Add_Ons,updatePackage_Add_Ons}


