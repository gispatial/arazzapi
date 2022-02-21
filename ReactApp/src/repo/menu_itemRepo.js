import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getMenu_Item = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllMenu_Item(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchMenu_Item(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllMenu_Item = (pageno,pagesize) => {
return api.get(`/menu_item/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchMenu_Item = (key,pageno,pagesize) => {
return api.get(`/menu_item/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneMenu_Item = (id) => {
return api.get(`/menu_item/read_one.php?id=${id}`)
}
const deleteMenu_Item = (item_id) => {
return api.post(`/menu_item/delete.php?`,{item_id:item_id})
}
const addMenu_Item = (data) => {
return api.post(`/menu_item/create.php?`,data)
}
const updateMenu_Item = (data) => {
return api.post(`/menu_item/update.php?`,data)
}
const getAllMenu_Item = (pageno,pagesize) => {
return api.get(`/menu_item/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchMenu_Item = (key,pageno,pagesize) => {
return api.get(`/menu_item/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneMenu_Item = (id) => {
return api.get(`/menu_item/read_one.php?id=${id}`)
}
const deleteMenu_Item = (item_id) => {
return api.post(`/menu_item/delete.php?`,{item_id:item_id})
}
const addMenu_Item = (data) => {
return api.post(`/menu_item/create.php?`,data)
}
const updateMenu_Item = (data) => {
return api.post(`/menu_item/update.php?`,data)
}
export {getMenu_Item,getAllMenu_Item,searchMenu_Item,getOneMenu_Item,deleteMenu_Item,addMenu_Item,updateMenu_Item,getAllMenu_Item,searchMenu_Item,getOneMenu_Item,deleteMenu_Item,addMenu_Item,updateMenu_Item}


