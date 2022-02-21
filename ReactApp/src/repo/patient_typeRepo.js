import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getPatient_Type = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPatient_Type(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchPatient_Type(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllPatient_Type = (pageno,pagesize) => {
return api.get(`/patient_type/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPatient_Type = (key,pageno,pagesize) => {
return api.get(`/patient_type/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePatient_Type = (id) => {
return api.get(`/patient_type/read_one.php?id=${id}`)
}
const deletePatient_Type = (patient_type_code) => {
return api.post(`/patient_type/delete.php?`,{patient_type_code:patient_type_code})
}
const addPatient_Type = (data) => {
return api.post(`/patient_type/create.php?`,data)
}
const updatePatient_Type = (data) => {
return api.post(`/patient_type/update.php?`,data)
}
const getAllPatient_Type = (pageno,pagesize) => {
return api.get(`/patient_type/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPatient_Type = (key,pageno,pagesize) => {
return api.get(`/patient_type/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePatient_Type = (id) => {
return api.get(`/patient_type/read_one.php?id=${id}`)
}
const deletePatient_Type = (patient_type_code) => {
return api.post(`/patient_type/delete.php?`,{patient_type_code:patient_type_code})
}
const addPatient_Type = (data) => {
return api.post(`/patient_type/create.php?`,data)
}
const updatePatient_Type = (data) => {
return api.post(`/patient_type/update.php?`,data)
}
export {getPatient_Type,getAllPatient_Type,searchPatient_Type,getOnePatient_Type,deletePatient_Type,addPatient_Type,updatePatient_Type,getAllPatient_Type,searchPatient_Type,getOnePatient_Type,deletePatient_Type,addPatient_Type,updatePatient_Type}


