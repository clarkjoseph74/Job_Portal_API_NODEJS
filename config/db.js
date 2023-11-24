const mongoose = require('mongoose')
const colors = require('colors')
const connect_database = async () =>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Mongoose connected successfully ${mongoose.connection.host}` .bgMagenta.white)
    } catch (error) {
        console.log(`Mongoose connection error: ${error.message || error}` .bgRed.white)
    }
}

module.exports.connectDB = connect_database