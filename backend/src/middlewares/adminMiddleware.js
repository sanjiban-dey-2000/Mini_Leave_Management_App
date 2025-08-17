const jwt=require('jsonwebtoken');
const Admin = require('../models/adminModel');

async function protectRoute(req,res,next){
    try{
        const token=req.cookies.jwt;

        if(!token){
            return res.status(401).json({
                message:"Unauthorized. No tokens provided",
            });
        }

        const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(!decoded){
            return res.status(401).json({
                message:"Unauthorized. invalid token",
            });
        }

        const admin=await Admin.findById(decoded.userId).select("-password");
        if(!admin){
            return res.status(401).json({
                message:"Unauthorized. Admin not found",
            });
        }

        req.user=admin;
        next();
    }catch(error){
        console.log(error.message);
        res.status(401).json({
            message:"Unauthorized. Invalid or expired token",
        });
    }
}

module.exports={
    protectRoute,
}