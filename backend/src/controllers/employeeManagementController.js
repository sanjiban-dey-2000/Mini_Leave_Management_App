const Employee=require('../models/employeeModel');
const sendEmail = require('../utils/sendEmail');

//new employee adding handler
async function handleAddingEmployees(req,res){
    try{
        const {fullName,email,gender,department,joiningDate}=req.body;

        if(!fullName||!email||!gender||!department||!joiningDate){
            return res.status(400).json({
                message:"Please provide all the fields",
            });
        }
        const existingEmployee=await Employee.findOne({email});
        if(existingEmployee){
            return res.status(400).json({
                message:"Employee email id already exists",
            });
        }
        const newEmployee=await Employee.create({
            fullName,
            email,
            gender,
            department,
            joiningDate,
            createdBy:req.user._id,
        });

        const subject="Welcome to Leave Management System";
        const text=`Hi ${fullName},\n\nYour account has been created.\n Email${email}.\nPlease create your password in order to login and apply for leaves.`;
        const html=`
            <h2>Welcome ${fullName}</h2>
            <p>Your account has been created in the <b>Leave Management System</b>.</p>
            <p><b>Email:</b>${email}</p>
            <p>Use this email in order to create your password to login.</p>
            <p>please <a href="#">Sign Up</a> to create password</p>
        `;

        await sendEmail(email,subject,text,html);

        res.status(201).json({
            message:"Employee added successfully",
            newEmployee,
        });

    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error in adding employee route",
        });
    }
}

//employee signup handler
async function handleEmployeeSingup(req,res){
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                message:"Please provide all the fields",
            });
        }
        const existingEmployee=await Employee.findOne({email});
        if(!existingEmployee){
            return res.status(404).json({
                message:"Your email id is not added in the system.Please contact your HR"
            });
        }

        existingEmployee.password=password;
        existingEmployee.save();

        res.status(201).json({
            message:"Your account password is created.Now you can login",
            existingEmployee,
        });
        
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error in employee signup route",
        });
    }
}

module.exports={
    handleAddingEmployees,
    handleEmployeeSingup,
};