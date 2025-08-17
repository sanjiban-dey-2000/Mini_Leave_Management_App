const Admin=require("../models/adminModel");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

//admin signup handler
async function handleAdminSignup(req,res){
    try{
        const {fullName,email,password,department}=req.body;

        if(!fullName||!email||!password||!department){
            return res.status(400).json({
                message:"Please provide all the fields!!",
            });
        }
        const existingUser=await Admin.findOne({email});

        if(existingUser){
            return res.status(403).json({
                message:"User already exists with same email id."
            });
        }

        const newAdmin=await Admin.create({
            fullName,
            email,
            password,
            department,
        });

        const token=await jwt.sign({userId:newAdmin._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d",
        });

        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
        })
        
        res.status(201).json({
            message:"Admin account created successfully",
            newAdmin,
        });

    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message:"Error in admin signup route",
            error,
        });
    }
}

//admin login handler
async function handleAdminLogin(req,res){
    try{
        const {email,password}=req.body;

        if(!email||!password){
            return res.status(400).json({
                message:"Please provide all the fields",
            });
        }

        const admin=await Admin.findOne({email});
        if(!admin){
            return res.status(404).json({
                message:"Wrong email id entered",
            });
        }
        const matchingPassword=await bcrypt.compare(password,admin.password);
        if(!matchingPassword){
            return res.status(403).json({
                message:"Wrong password entered",
            });
        }

        const token=await jwt.sign({userId:admin._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d",
        });

        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
        });

        res.status(200).json({
            message:"Logged in successfully",
            admin,
        });

    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message:"Error in admin login route",
            error,
        });
    }
}

module.exports={
    handleAdminSignup,
    handleAdminLogin,
};