import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getPerson_Document = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPerson_Document(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchPerson_Document(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllPerson_Document = (pageno,pagesize) => {
return api.get(`/person_document/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPerson_Document = (key,pageno,pagesize) => {
return api.get(`/person_document/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePerson_Document = (id) => {
return api.get(`/person_document/read_one.php?id=${id}`)
}
const deletePerson_Document = (ic_no) => {
return api.post(`/person_document/delete.php?`,{ic_no:ic_no})
}
const addPerson_Document = (data) => {
return api.post(`/person_document/create.php?`,data)
}
const updatePerson_Document = (data) => {
return api.post(`/person_document/update.php?`,data)
}
const getAllPerson_Document = (pageno,pagesize) => {
return api.get(`/person_document/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPerson_Document = (key,pageno,pagesize) => {
return api.get(`/person_document/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePerson_Document = (id) => {
return api.get(`/person_document/read_one.php?id=${id}`)
}
const deletePerson_Document = (ic_no) => {
return api.post(`/person_document/delete.php?`,{ic_no:ic_no})
}
const addPerson_Document = (data) => {
return api.post(`/person_document/create.php?`,data)
}
const updatePerson_Document = (data) => {
return api.post(`/person_document/update.php?`,data)
}
export {getPerson_Document,getAllPerson_Document,searchPerson_Document,getOnePerson_Document,deletePerson_Document,addPerson_Document,updatePerson_Document,getAllPerson_Document,searchPerson_Document,getOnePerson_Document,deletePerson_Document,addPerson_Document,updatePerson_Document}


