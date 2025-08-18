const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const {connectDb}=require('./lib/connectDb');
const adminRouter=require('./routes/adminRoute');
const employeeManageRoute=require('./routes/employeeManagementRoute');
const leaveManagementRoute=require('./routes/leaveManagementRoute');

const app=express();
const PORT=process.env.PORT||8001;
const MONGO_URI=process.env.MONGO_URI;

//database connection

connectDb(MONGO_URI).then(()=>{
    console.log("Database has successfully connected");
}).catch((err)=>{
    console.log(`Error in database connectivity due to ${err.message}`);
})

//frontend and backend connectivity
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));


//routes
app.use('/api/auth',adminRouter);

app.use('/api/employee',employeeManageRoute);

app.use('/api/leave',leaveManagementRoute);

//verification route
app.get('/api/user/verify',(req,res)=>{
    res.status(200).json({
        user:req.user,
    });
});

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})