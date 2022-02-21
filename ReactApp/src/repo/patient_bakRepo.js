import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getPatient_Bak = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPatient_Bak(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchPatient_Bak(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllPatient_Bak = (pageno,pagesize) => {
return api.get(`/patient_bak/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPatient_Bak = (key,pageno,pagesize) => {
return api.get(`/patient_bak/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePatient_Bak = (id) => {
return api.get(`/patient_bak/read_one.php?id=${id}`)
}
const deletePatient_Bak = (refno) => {
return api.post(`/patient_bak/delete.php?`,{refno:refno})
}
const addPatient_Bak = (data) => {
return api.post(`/patient_bak/create.php?`,data)
}
const updatePatient_Bak = (data) => {
return api.post(`/patient_bak/update.php?`,data)
}
const getAllPatient_Bak = (pageno,pagesize) => {
return api.get(`/patient_bak/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPatient_Bak = (key,pageno,pagesize) => {
return api.get(`/patient_bak/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePatient_Bak = (id) => {
return api.get(`/patient_bak/read_one.php?id=${id}`)
}
const deletePatient_Bak = (refno) => {
return api.post(`/patient_bak/delete.php?`,{refno:refno})
}
const addPatient_Bak = (data) => {
return api.post(`/patient_bak/create.php?`,data)
}
const updatePatient_Bak = (data) => {
return api.post(`/patient_bak/update.php?`,data)
}
export {getPatient_Bak,getAllPatient_Bak,searchPatient_Bak,getOnePatient_Bak,deletePatient_Bak,addPatient_Bak,updatePatient_Bak,getAllPatient_Bak,searchPatient_Bak,getOnePatient_Bak,deletePatient_Bak,addPatient_Bak,updatePatient_Bak}


