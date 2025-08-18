import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:8001/api",
    withCredentials:true,
});

export const adminSingup=async(data)=>{
    return await api.post('/auth/admin_signup',data);
}

export const adminLogin=async(data)=>{
    return await api.post('/auth/admin_login',data);
}

export const addEmployee=async(data)=>{
    return await api.post('/employee/add_employee',data);
}