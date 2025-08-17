const Employee=require('../models/employeeModel');

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

module.exports={
    handleAddingEmployees,
};