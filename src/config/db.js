const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MOngoDB Connected: ${conn.connection.host}`)
    }catch(e){
        console.log(`Error: ${err.message}`)
        process.exit(1);
    }
}


module.exports = connectDB
