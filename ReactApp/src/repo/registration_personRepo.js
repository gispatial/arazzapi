import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getRegistration_Person = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllRegistration_Person(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchRegistration_Person(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllRegistration_Person = (pageno,pagesize) => {
return api.get(`/registration_person/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchRegistration_Person = (key,pageno,pagesize) => {
return api.get(`/registration_person/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneRegistration_Person = (id) => {
return api.get(`/registration_person/read_one.php?id=${id}`)
}
const deleteRegistration_Person = (reg_no) => {
return api.post(`/registration_person/delete.php?`,{reg_no:reg_no})
}
const addRegistration_Person = (data) => {
return api.post(`/registration_person/create.php?`,data)
}
const updateRegistration_Person = (data) => {
return api.post(`/registration_person/update.php?`,data)
}
const getAllRegistration_Person = (pageno,pagesize) => {
return api.get(`/registration_person/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchRegistration_Person = (key,pageno,pagesize) => {
return api.get(`/registration_person/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneRegistration_Person = (id) => {
return api.get(`/registration_person/read_one.php?id=${id}`)
}
const deleteRegistration_Person = (reg_no) => {
return api.post(`/registration_person/delete.php?`,{reg_no:reg_no})
}
const addRegistration_Person = (data) => {
return api.post(`/registration_person/create.php?`,data)
}
const updateRegistration_Person = (data) => {
return api.post(`/registration_person/update.php?`,data)
}
export {getRegistration_Person,getAllRegistration_Person,searchRegistration_Person,getOneRegistration_Person,deleteRegistration_Person,addRegistration_Person,updateRegistration_Person,getAllRegistration_Person,searchRegistration_Person,getOneRegistration_Person,deleteRegistration_Person,addRegistration_Person,updateRegistration_Person}


