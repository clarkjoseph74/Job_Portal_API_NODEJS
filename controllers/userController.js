const userModel = require("../models/userModel");
const colors = require('colors');
const updateUserController = async (req, res , next) => {
    const {name , email , password , location} = req.body;
    const userId = req.user.userId;
    if(!name || !email || !password || !location){
        next("Please enter your new data")
    }

    console.log(name, email, password, location)
   

    try {
    const user = await userModel.findOne({_id: userId});
   
    user.name = name;
    user.email = email;
    user.locations = location;

    await user.save();
    const token = user.createJWT()
    res.status(200).send({
        user,
        token
    })
    } catch (error) {
        next(error.message);
    }
}
const getUsersController = async (req, res , next) => {
    const {id} = req.user.userId
    try {
        const users = await userModel.find({_id:id}).select('-password');
        res.status(200).send({users})
    } catch (error) {
        next("Error when Fetching users")
    }
}
module.exports = updateUserController;
module.exports = getUsersController;