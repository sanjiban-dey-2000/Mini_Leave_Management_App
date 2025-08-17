const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const adminSchema=new mongoose.Schema({
    fullName: {
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        require:true,
    },
    department:{
        type:String,
        require:true,
    },
    
},{
    timestamps:true,
});

adminSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    try{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    }catch(error){
        next(error);
    }
});

const Admin=mongoose.model("Admin",adminSchema);

module.exports=Admin;