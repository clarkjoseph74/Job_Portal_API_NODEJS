const userModel = require("../models/userModel");

module.exports = async (req , res,next) =>{
   
    try {
         const {name , email , password , location} = req.body;
        if(!name){
           next("Please enter a name");
        }
         if(!email){
          next("Please enter an email");
        }
         if(!password){
              next("Please enter a password");
        }
        const alreadyRegistered = await userModel.findOne({email})
        if(alreadyRegistered){
             return res.status(200).send({message:"Already have an account, please login" , success : false })
        }
        const user = await userModel.create({name, email,password})
        const token = user.createJWT();
        res.status(200).send({
            success:true,
            message:"User Created Successfully",
            user,
            token,
        })
    } catch (error) {
       next(error);
    }
  
}

module.exports.loginController = async ( req, res , next ) => {
    const {email, password} = req.body; 
    if(!email || !password){
        next("Email or password must be provided")
    }
    try{
    const user = await userModel.findOne({email});
    console.log(user)
    if(!user ){
        next("Invalid Username or Password")
    }else{
          const isMatch = await user.checkPassword(password)
    if(!isMatch){
        next("Invalid Username or Password");
    }
    const token = user.createJWT();
    res.status(200).json({
        success : true,
        Message: "Login successfully",
        user,
        token
    })
    }
  }catch (error) {
        res.status(500).json({error: error.message})
    }

}