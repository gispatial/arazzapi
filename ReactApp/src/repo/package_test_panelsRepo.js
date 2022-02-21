import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getPackage_Test_Panels = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPackage_Test_Panels(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchPackage_Test_Panels(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllPackage_Test_Panels = (pageno,pagesize) => {
return api.get(`/package_test_panels/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPackage_Test_Panels = (key,pageno,pagesize) => {
return api.get(`/package_test_panels/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePackage_Test_Panels = (id) => {
return api.get(`/package_test_panels/read_one.php?id=${id}`)
}
const deletePackage_Test_Panels = (package_code) => {
return api.post(`/package_test_panels/delete.php?`,{package_code:package_code})
}
const addPackage_Test_Panels = (data) => {
return api.post(`/package_test_panels/create.php?`,data)
}
const updatePackage_Test_Panels = (data) => {
return api.post(`/package_test_panels/update.php?`,data)
}
const getAllPackage_Test_Panels = (pageno,pagesize) => {
return api.get(`/package_test_panels/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPackage_Test_Panels = (key,pageno,pagesize) => {
return api.get(`/package_test_panels/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePackage_Test_Panels = (id) => {
return api.get(`/package_test_panels/read_one.php?id=${id}`)
}
const deletePackage_Test_Panels = (package_code) => {
return api.post(`/package_test_panels/delete.php?`,{package_code:package_code})
}
const addPackage_Test_Panels = (data) => {
return api.post(`/package_test_panels/create.php?`,data)
}
const updatePackage_Test_Panels = (data) => {
return api.post(`/package_test_panels/update.php?`,data)
}
export {getPackage_Test_Panels,getAllPackage_Test_Panels,searchPackage_Test_Panels,getOnePackage_Test_Panels,deletePackage_Test_Panels,addPackage_Test_Panels,updatePackage_Test_Panels,getAllPackage_Test_Panels,searchPackage_Test_Panels,getOnePackage_Test_Panels,deletePackage_Test_Panels,addPackage_Test_Panels,updatePackage_Test_Panels}


