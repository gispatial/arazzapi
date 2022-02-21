import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getMedication_Prescription = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllMedication_Prescription(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchMedication_Prescription(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllMedication_Prescription = (pageno,pagesize) => {
return api.get(`/medication_prescription/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchMedication_Prescription = (key,pageno,pagesize) => {
return api.get(`/medication_prescription/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneMedication_Prescription = (id) => {
return api.get(`/medication_prescription/read_one.php?id=${id}`)
}
const deleteMedication_Prescription = (ERROR_NOPRIMARYKEYFOUND) => {
return api.post(`/medication_prescription/delete.php?`,{ERROR_NOPRIMARYKEYFOUND:ERROR_NOPRIMARYKEYFOUND})
}
const addMedication_Prescription = (data) => {
return api.post(`/medication_prescription/create.php?`,data)
}
const updateMedication_Prescription = (data) => {
return api.post(`/medication_prescription/update.php?`,data)
}
const getAllMedication_Prescription = (pageno,pagesize) => {
return api.get(`/medication_prescription/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchMedication_Prescription = (key,pageno,pagesize) => {
return api.get(`/medication_prescription/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneMedication_Prescription = (id) => {
return api.get(`/medication_prescription/read_one.php?id=${id}`)
}
const deleteMedication_Prescription = (ERROR_NOPRIMARYKEYFOUND) => {
return api.post(`/medication_prescription/delete.php?`,{ERROR_NOPRIMARYKEYFOUND:ERROR_NOPRIMARYKEYFOUND})
}
const addMedication_Prescription = (data) => {
return api.post(`/medication_prescription/create.php?`,data)
}
const updateMedication_Prescription = (data) => {
return api.post(`/medication_prescription/update.php?`,data)
}
export {getMedication_Prescription,getAllMedication_Prescription,searchMedication_Prescription,getOneMedication_Prescription,deleteMedication_Prescription,addMedication_Prescription,updateMedication_Prescription,getAllMedication_Prescription,searchMedication_Prescription,getOneMedication_Prescription,deleteMedication_Prescription,addMedication_Prescription,updateMedication_Prescription}


