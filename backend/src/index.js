const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cookieParser=require('cookie-parser');
const {connectDb}=require('./lib/connectDb');
const authRouter=require('./routes/authRoute');



const app=express();
const PORT=process.env.PORT||8001;
const MONGO_URI=process.env.MONGO_URI;

//database connection

connectDb(MONGO_URI).then(()=>{
    console.log("Database has successfully connected");
}).catch((err)=>{
    console.log(`Error in database connectivity due to ${err.message}`);
})

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));


//routes
app.use('/api/auth',authRouter);



app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})