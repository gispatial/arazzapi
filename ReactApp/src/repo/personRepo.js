import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getPerson = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPerson(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchPerson(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllPerson = (pageno,pagesize) => {
return api.get(`/person/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPerson = (key,pageno,pagesize) => {
return api.get(`/person/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePerson = (id) => {
return api.get(`/person/read_one.php?id=${id}`)
}
const deletePerson = (ic_no) => {
return api.post(`/person/delete.php?`,{ic_no:ic_no})
}
const addPerson = (data) => {
return api.post(`/person/create.php?`,data)
}
const updatePerson = (data) => {
return api.post(`/person/update.php?`,data)
}
const getAllPerson = (pageno,pagesize) => {
return api.get(`/person/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPerson = (key,pageno,pagesize) => {
return api.get(`/person/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePerson = (id) => {
return api.get(`/person/read_one.php?id=${id}`)
}
const deletePerson = (ic_no) => {
return api.post(`/person/delete.php?`,{ic_no:ic_no})
}
const addPerson = (data) => {
return api.post(`/person/create.php?`,data)
}
const updatePerson = (data) => {
return api.post(`/person/update.php?`,data)
}
export {getPerson,getAllPerson,searchPerson,getOnePerson,deletePerson,addPerson,updatePerson,getAllPerson,searchPerson,getOnePerson,deletePerson,addPerson,updatePerson}


