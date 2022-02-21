import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getMenu_Main_Item = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllMenu_Main_Item(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchMenu_Main_Item(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllMenu_Main_Item = (pageno,pagesize) => {
return api.get(`/menu_main_item/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchMenu_Main_Item = (key,pageno,pagesize) => {
return api.get(`/menu_main_item/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneMenu_Main_Item = (id) => {
return api.get(`/menu_main_item/read_one.php?id=${id}`)
}
const deleteMenu_Main_Item = (main_id) => {
return api.post(`/menu_main_item/delete.php?`,{main_id:main_id})
}
const addMenu_Main_Item = (data) => {
return api.post(`/menu_main_item/create.php?`,data)
}
const updateMenu_Main_Item = (data) => {
return api.post(`/menu_main_item/update.php?`,data)
}
const getAllMenu_Main_Item = (pageno,pagesize) => {
return api.get(`/menu_main_item/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchMenu_Main_Item = (key,pageno,pagesize) => {
return api.get(`/menu_main_item/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneMenu_Main_Item = (id) => {
return api.get(`/menu_main_item/read_one.php?id=${id}`)
}
const deleteMenu_Main_Item = (main_id) => {
return api.post(`/menu_main_item/delete.php?`,{main_id:main_id})
}
const addMenu_Main_Item = (data) => {
return api.post(`/menu_main_item/create.php?`,data)
}
const updateMenu_Main_Item = (data) => {
return api.post(`/menu_main_item/update.php?`,data)
}
export {getMenu_Main_Item,getAllMenu_Main_Item,searchMenu_Main_Item,getOneMenu_Main_Item,deleteMenu_Main_Item,addMenu_Main_Item,updateMenu_Main_Item,getAllMenu_Main_Item,searchMenu_Main_Item,getOneMenu_Main_Item,deleteMenu_Main_Item,addMenu_Main_Item,updateMenu_Main_Item}


