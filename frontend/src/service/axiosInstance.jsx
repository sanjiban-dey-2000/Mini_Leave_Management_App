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

export const getLeave=async()=>{
    return await api.get('/leave/view_requests');
}

export const approveLeave = async (leaveId, status) => {
    return await api.post(`/leave/update_application/${leaveId}`, { status });
};

export const employeeSignup=async(data)=>{
    return await api.post('/employee/signup',data);
}

export const employeeLogin=async(data)=>{
    return await api.post('/employee/login',data);
}

export const applyLeave=async(data)=>{
    return await api.post('/leave/apply',data);
}

export const getEmployeeLeaves=async()=>{
    return await api.get('/leave/view_status');
}

export const checkBalance=async()=>{
    return await api.get('/leave/balance');
}