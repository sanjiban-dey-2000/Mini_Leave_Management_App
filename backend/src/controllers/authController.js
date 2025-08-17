const Admin=require("../models/adminModel");


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

module.exports={
    handleAdminSignup,
};