import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getMenu_Main = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllMenu_Main(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchMenu_Main(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllMenu_Main = (pageno,pagesize) => {
return api.get(`/menu_main/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchMenu_Main = (key,pageno,pagesize) => {
return api.get(`/menu_main/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneMenu_Main = (id) => {
return api.get(`/menu_main/read_one.php?id=${id}`)
}
const deleteMenu_Main = (main_id) => {
return api.post(`/menu_main/delete.php?`,{main_id:main_id})
}
const addMenu_Main = (data) => {
return api.post(`/menu_main/create.php?`,data)
}
const updateMenu_Main = (data) => {
return api.post(`/menu_main/update.php?`,data)
}
const getAllMenu_Main = (pageno,pagesize) => {
return api.get(`/menu_main/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchMenu_Main = (key,pageno,pagesize) => {
return api.get(`/menu_main/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneMenu_Main = (id) => {
return api.get(`/menu_main/read_one.php?id=${id}`)
}
const deleteMenu_Main = (main_id) => {
return api.post(`/menu_main/delete.php?`,{main_id:main_id})
}
const addMenu_Main = (data) => {
return api.post(`/menu_main/create.php?`,data)
}
const updateMenu_Main = (data) => {
return api.post(`/menu_main/update.php?`,data)
}
export {getMenu_Main,getAllMenu_Main,searchMenu_Main,getOneMenu_Main,deleteMenu_Main,addMenu_Main,updateMenu_Main,getAllMenu_Main,searchMenu_Main,getOneMenu_Main,deleteMenu_Main,addMenu_Main,updateMenu_Main}


