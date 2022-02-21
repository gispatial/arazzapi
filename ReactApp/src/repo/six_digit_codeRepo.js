import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getSix_Digit_Code = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllSix_Digit_Code(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchSix_Digit_Code(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllSix_Digit_Code = (pageno,pagesize) => {
return api.get(`/six_digit_code/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchSix_Digit_Code = (key,pageno,pagesize) => {
return api.get(`/six_digit_code/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneSix_Digit_Code = (id) => {
return api.get(`/six_digit_code/read_one.php?id=${id}`)
}
const deleteSix_Digit_Code = (mobile) => {
return api.post(`/six_digit_code/delete.php?`,{mobile:mobile})
}
const addSix_Digit_Code = (data) => {
return api.post(`/six_digit_code/create.php?`,data)
}
const updateSix_Digit_Code = (data) => {
return api.post(`/six_digit_code/update.php?`,data)
}
const getAllSix_Digit_Code = (pageno,pagesize) => {
return api.get(`/six_digit_code/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchSix_Digit_Code = (key,pageno,pagesize) => {
return api.get(`/six_digit_code/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneSix_Digit_Code = (id) => {
return api.get(`/six_digit_code/read_one.php?id=${id}`)
}
const deleteSix_Digit_Code = (mobile) => {
return api.post(`/six_digit_code/delete.php?`,{mobile:mobile})
}
const addSix_Digit_Code = (data) => {
return api.post(`/six_digit_code/create.php?`,data)
}
const updateSix_Digit_Code = (data) => {
return api.post(`/six_digit_code/update.php?`,data)
}
export {getSix_Digit_Code,getAllSix_Digit_Code,searchSix_Digit_Code,getOneSix_Digit_Code,deleteSix_Digit_Code,addSix_Digit_Code,updateSix_Digit_Code,getAllSix_Digit_Code,searchSix_Digit_Code,getOneSix_Digit_Code,deleteSix_Digit_Code,addSix_Digit_Code,updateSix_Digit_Code}


