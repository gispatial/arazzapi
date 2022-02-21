import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getMedication = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllMedication(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchMedication(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllMedication = (pageno,pagesize) => {
return api.get(`/medication/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchMedication = (key,pageno,pagesize) => {
return api.get(`/medication/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneMedication = (id) => {
return api.get(`/medication/read_one.php?id=${id}`)
}
const deleteMedication = (id) => {
return api.post(`/medication/delete.php?`,{id:id})
}
const addMedication = (data) => {
return api.post(`/medication/create.php?`,data)
}
const updateMedication = (data) => {
return api.post(`/medication/update.php?`,data)
}
const getAllMedication = (pageno,pagesize) => {
return api.get(`/medication/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchMedication = (key,pageno,pagesize) => {
return api.get(`/medication/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneMedication = (id) => {
return api.get(`/medication/read_one.php?id=${id}`)
}
const deleteMedication = (id) => {
return api.post(`/medication/delete.php?`,{id:id})
}
const addMedication = (data) => {
return api.post(`/medication/create.php?`,data)
}
const updateMedication = (data) => {
return api.post(`/medication/update.php?`,data)
}
export {getMedication,getAllMedication,searchMedication,getOneMedication,deleteMedication,addMedication,updateMedication,getAllMedication,searchMedication,getOneMedication,deleteMedication,addMedication,updateMedication}


