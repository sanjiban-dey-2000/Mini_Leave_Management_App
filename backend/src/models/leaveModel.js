const mongoose=require('mongoose');

const leaveSchema=new mongoose.Schema({
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        require:true,
    },
    leaveType:{
        type:String,
        enum:["Sick Leave","Casual Leave","Paid Leave","Unpaid Leave"],
        require:true,
    },
    startDate:{
        type:Date,
        require:true,
    },
    endDate:{
        type:Date,
        require:true,
    },
    numberOfDays:{
        type:String,
        require:true,
    },
    reason:{
        type:String,
        require:true,
    },
    status:{
        type:String,
        enum:["Pending","Approved","Rejected","Cancelled"],
        default:"Pending",
    },
    appliedOn:{
        type:Date,
        default:Date.now,
    },
    approvedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
    },
    leaveBalanceBefore:{
        type:Number,
    },
    leaveBalanceAfter:{
        type:Number,
    },
},{
    timestamps:true,
});

const Leave=mongoose.model("Leaves",leaveSchema);

module.exports=Leave;