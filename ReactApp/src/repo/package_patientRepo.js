import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getPackage_Patient = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPackage_Patient(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchPackage_Patient(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllPackage_Patient = (pageno,pagesize) => {
return api.get(`/package_patient/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPackage_Patient = (key,pageno,pagesize) => {
return api.get(`/package_patient/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePackage_Patient = (id) => {
return api.get(`/package_patient/read_one.php?id=${id}`)
}
const deletePackage_Patient = (package_code) => {
return api.post(`/package_patient/delete.php?`,{package_code:package_code})
}
const addPackage_Patient = (data) => {
return api.post(`/package_patient/create.php?`,data)
}
const updatePackage_Patient = (data) => {
return api.post(`/package_patient/update.php?`,data)
}
const getAllPackage_Patient = (pageno,pagesize) => {
return api.get(`/package_patient/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPackage_Patient = (key,pageno,pagesize) => {
return api.get(`/package_patient/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePackage_Patient = (id) => {
return api.get(`/package_patient/read_one.php?id=${id}`)
}
const deletePackage_Patient = (package_code) => {
return api.post(`/package_patient/delete.php?`,{package_code:package_code})
}
const addPackage_Patient = (data) => {
return api.post(`/package_patient/create.php?`,data)
}
const updatePackage_Patient = (data) => {
return api.post(`/package_patient/update.php?`,data)
}
export {getPackage_Patient,getAllPackage_Patient,searchPackage_Patient,getOnePackage_Patient,deletePackage_Patient,addPackage_Patient,updatePackage_Patient,getAllPackage_Patient,searchPackage_Patient,getOnePackage_Patient,deletePackage_Patient,addPackage_Patient,updatePackage_Patient}


