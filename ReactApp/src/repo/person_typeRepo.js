import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getPerson_Type = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPerson_Type(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchPerson_Type(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllPerson_Type = (pageno,pagesize) => {
return api.get(`/person_type/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPerson_Type = (key,pageno,pagesize) => {
return api.get(`/person_type/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePerson_Type = (id) => {
return api.get(`/person_type/read_one.php?id=${id}`)
}
const deletePerson_Type = (id) => {
return api.post(`/person_type/delete.php?`,{id:id})
}
const addPerson_Type = (data) => {
return api.post(`/person_type/create.php?`,data)
}
const updatePerson_Type = (data) => {
return api.post(`/person_type/update.php?`,data)
}
const getAllPerson_Type = (pageno,pagesize) => {
return api.get(`/person_type/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPerson_Type = (key,pageno,pagesize) => {
return api.get(`/person_type/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePerson_Type = (id) => {
return api.get(`/person_type/read_one.php?id=${id}`)
}
const deletePerson_Type = (id) => {
return api.post(`/person_type/delete.php?`,{id:id})
}
const addPerson_Type = (data) => {
return api.post(`/person_type/create.php?`,data)
}
const updatePerson_Type = (data) => {
return api.post(`/person_type/update.php?`,data)
}
export {getPerson_Type,getAllPerson_Type,searchPerson_Type,getOnePerson_Type,deletePerson_Type,addPerson_Type,updatePerson_Type,getAllPerson_Type,searchPerson_Type,getOnePerson_Type,deletePerson_Type,addPerson_Type,updatePerson_Type}


