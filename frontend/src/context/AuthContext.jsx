import {Children, createContext,useContext,useState} from "react";
import toast from "react-hot-toast";
//import { postLogout } from "../services/axiosInstance";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);

    const login=(userData)=>setUser(userData);
    /*const logout=async()=>{
        try{
            const res=await postLogout();
            console.log(res.data);
            setUser(null);
            toast.success("Logged out successfully");
        }catch(error){
            console.log(error.message);
            toast.error("Logout failed");
        }
    }*/

    return (
        <AuthContext.Provider value={{user,login}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth=()=>useContext(AuthContext);