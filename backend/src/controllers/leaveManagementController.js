const Leave=require('../models/leaveModel');
const Employee=require('../models/employeeModel');

//leave application handler
async function handleLeaveApplication(req,res){
    try{
        const {leaveType,startDate,endDate,numberOfDays,reason}=req.body;

        //edge cases
        const existingEmployee=await Employee.findById(req.user._id);
        if(!existingEmployee){
            return res.status(404).json({
                message:"Employee not found",
            });
        }

        if(new Date(startDate)<new Date(existingEmployee.joiningDate)){
            return res.status(403).json({
                message:"You can not apply for leave before joining",
            });
        }
        if(existingEmployee.totalLeaves<numberOfDays){
            return res.status(400).json({
                message:"Insufficient leave balance",
            });
        }

        //creating leave application
        const leave=await Leave.create({
            employeeId:req.user._id,
            leaveType,
            startDate,
            endDate,
            numberOfDays,
            reason,
            leaveBalanceBefore:existingEmployee.totalLeaves,
            leaveBalanceAfter:existingEmployee.totalLeaves-numberOfDays,
        });

        //updating employee model
        existingEmployee.totalLeaves-=numberOfDays;
        await existingEmployee.save();

        res.status(200).json({
            message:"Leave applied successfully.Wait for furthe updates",
            leave,
        });
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error in leave application route",
        });
    }
}

//all leave application view controller (admin end)
async function handleViewLeaveApplications(req,res){
    try{
        const leaves=await Leave.find().populate('employeeId', 'fullName email department joiningDate').sort({createdAt:-1});

        res.status(200).json({
            message:"All leave requests fetched successfully",
            leaves,
        });
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error in viewing applications route",
        });
    }
}

module.exports={
    handleLeaveApplication,
    handleViewLeaveApplications,
}