import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getPackage_Category = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPackage_Category(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchPackage_Category(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllPackage_Category = (pageno,pagesize) => {
return api.get(`/package_category/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPackage_Category = (key,pageno,pagesize) => {
return api.get(`/package_category/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePackage_Category = (id) => {
return api.get(`/package_category/read_one.php?id=${id}`)
}
const deletePackage_Category = (category_code) => {
return api.post(`/package_category/delete.php?`,{category_code:category_code})
}
const addPackage_Category = (data) => {
return api.post(`/package_category/create.php?`,data)
}
const updatePackage_Category = (data) => {
return api.post(`/package_category/update.php?`,data)
}
const getAllPackage_Category = (pageno,pagesize) => {
return api.get(`/package_category/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchPackage_Category = (key,pageno,pagesize) => {
return api.get(`/package_category/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOnePackage_Category = (id) => {
return api.get(`/package_category/read_one.php?id=${id}`)
}
const deletePackage_Category = (category_code) => {
return api.post(`/package_category/delete.php?`,{category_code:category_code})
}
const addPackage_Category = (data) => {
return api.post(`/package_category/create.php?`,data)
}
const updatePackage_Category = (data) => {
return api.post(`/package_category/update.php?`,data)
}
export {getPackage_Category,getAllPackage_Category,searchPackage_Category,getOnePackage_Category,deletePackage_Category,addPackage_Category,updatePackage_Category,getAllPackage_Category,searchPackage_Category,getOnePackage_Category,deletePackage_Category,addPackage_Category,updatePackage_Category}


