import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getPackage_Test_Groups = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPackage_Test_Groups(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchPackage_Test_Groups(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllPackage_Test_Groups = (pageno,pagesize) => {
return api.get(`/package_test_groups/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPackage_Test_Groups = (key,pageno,pagesize) => {
return api.get(`/package_test_groups/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePackage_Test_Groups = (id) => {
return api.get(`/package_test_groups/read_one.php?id=${id}`)
}
const deletePackage_Test_Groups = (package_code) => {
return api.post(`/package_test_groups/delete.php?`,{package_code:package_code})
}
const addPackage_Test_Groups = (data) => {
return api.post(`/package_test_groups/create.php?`,data)
}
const updatePackage_Test_Groups = (data) => {
return api.post(`/package_test_groups/update.php?`,data)
}
const getAllPackage_Test_Groups = (pageno,pagesize) => {
return api.get(`/package_test_groups/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPackage_Test_Groups = (key,pageno,pagesize) => {
return api.get(`/package_test_groups/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePackage_Test_Groups = (id) => {
return api.get(`/package_test_groups/read_one.php?id=${id}`)
}
const deletePackage_Test_Groups = (package_code) => {
return api.post(`/package_test_groups/delete.php?`,{package_code:package_code})
}
const addPackage_Test_Groups = (data) => {
return api.post(`/package_test_groups/create.php?`,data)
}
const updatePackage_Test_Groups = (data) => {
return api.post(`/package_test_groups/update.php?`,data)
}
export {getPackage_Test_Groups,getAllPackage_Test_Groups,searchPackage_Test_Groups,getOnePackage_Test_Groups,deletePackage_Test_Groups,addPackage_Test_Groups,updatePackage_Test_Groups,getAllPackage_Test_Groups,searchPackage_Test_Groups,getOnePackage_Test_Groups,deletePackage_Test_Groups,addPackage_Test_Groups,updatePackage_Test_Groups}


