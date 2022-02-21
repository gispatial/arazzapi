import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getBooking = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllBooking(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchBooking(search,pageNo+1,pageSize);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    return res.data.document;
}


const getAllBooking = (pageno,pagesize) => {
return api.get(`/booking/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchBooking = (key,pageno,pagesize) => {
return api.get(`/booking/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneBooking = (id) => {
return api.get(`/booking/read_one.php?id=${id}`)
}
const deleteBooking = (booking_no) => {
return api.post(`/booking/delete.php?`,{booking_no:booking_no})
}
const addBooking = (data) => {
return api.post(`/booking/create.php?`,data)
}
const updateBooking = (data) => {
return api.post(`/booking/update.php?`,data)
}
const getAllBooking = (pageno,pagesize) => {
return api.get(`/booking/read.php?pageno=${pageno}&pagesize=${pagesize}`)
}
const searchBooking = (key,pageno,pagesize) => {
return api.get(`/booking/search.php?key=${key}&pageno=${pageno}&pagesize=${pagesize}`)
}
const getOneBooking = (id) => {
return api.get(`/booking/read_one.php?id=${id}`)
}
const deleteBooking = (booking_no) => {
return api.post(`/booking/delete.php?`,{booking_no:booking_no})
}
const addBooking = (data) => {
return api.post(`/booking/create.php?`,data)
}
const updateBooking = (data) => {
return api.post(`/booking/update.php?`,data)
}
export {getBooking,getAllBooking,searchBooking,getOneBooking,deleteBooking,addBooking,updateBooking,getAllBooking,searchBooking,getOneBooking,deleteBooking,addBooking,updateBooking}


