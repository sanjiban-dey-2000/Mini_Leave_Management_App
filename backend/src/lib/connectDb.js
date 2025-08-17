const mongoose=require('mongoose');

async function connectDb(URI){
    return await mongoose.connect(URI);
}

module.exports={
    connectDb
};