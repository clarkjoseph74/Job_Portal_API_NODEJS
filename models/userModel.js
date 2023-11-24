const  mongoose  = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

//schema 
const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [true , "Name is required"],
    },
     email: {
        type : String,
        required : [true , "Email is required"],
        unique : true,
        validate : validator.isEmail,
    },
    password: {
        type : String,
        required : [true , "Password is required"],
        minlength: [6,"Password must be at least 6 characters"],
        select:true
    },
    locations: {
        type: String,
        default : "Egypt",

    }
},{timestamps : true})

//middleware
userSchema.pre('save', async function (){
    if(!this.isModified) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
//password check
userSchema.methods.checkPassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword , this.password);
    return isMatch;
}
//JWT
userSchema.methods.createJWT = function (){
    return JWT.sign({userId: this._id} , process.env.JWT_SECRET, {expiresIn:'1d'})
}
module.exports = mongoose.model('User', userSchema)