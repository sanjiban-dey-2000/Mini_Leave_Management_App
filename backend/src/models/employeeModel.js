const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const employeeSchema=new mongoose.Schema({
    fullName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    gender:{
        type:String,
        enum:["Male","Female","Prefer not to say"],
        require:true,
    },
    password:{
        type:String,
    },
    department:{
        type:String,
        require:true,
    },
    joiningDate:{
        type:Date,
        require:true,
    },
    totalLeaves:{
        type:Number,
        default:52,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
        require:true,
    }
},{
    timestamps:true,
});

employeeSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    };
    try{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    }catch(error){
        next(error);
    }
});

const Employee=mongoose.model("Employee",employeeSchema);

module.exports=Employee;