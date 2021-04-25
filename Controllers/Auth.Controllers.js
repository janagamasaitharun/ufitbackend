const User = require('../Schema/User')
const jwt = require('jsonwebtoken');
var JwtSecret= process.env.JWT_SECRET

exports.register= async (req,res) =>{
const {email,password,name,mobilenumber}=req.body;
   if(!email || !password || !name || !mobilenumber || !password){
       return res.status(400).json({message:"Missing Information"})
   }
   try {
     const user= await User.findOne({email})
     if(user){
         return res.status(200).json({message:"Email id Exists"})
     }else {
        // const salt = await bcrypt.genSalt(10);
        // const password = await bcrypt.hash(password, salt);
          const user= new User({
            email,password,name,mobilenumber
         })
         const savedUser=await user.save();
         const Userdetails= {
             "userId":savedUser._id,
             "email":savedUser.email
         }
         res.status(201).json({ message: "user registetred sucessfully" ,Userdetails:Userdetails})
         
     }
   }catch(e){
      console.log("error",e)
   }
}

exports.login= async (req, res) =>{
    const {email,password} = req.body

    if(!email || !password){
        return res.status(400).json({message:"Missing Information"})
    }
    const login = await User.findOne({email})
    
    if(!login){
        return res.status(400).json({message:"Email Does Not Exist"})
    }
    login.comparePassword(password, (error, match) => {
        if(!match) {
            return res.status(400).json({ message: "The password is invalid" });
        }
    }); 
    if(login.loginstatus === true){
      return res.status(401).json({message:"User already logged in"})
    }
    const payload = await jwt.sign({
        id:login._id,
        status:login.loginstatus
      },JwtSecret)
    const updated={loginstatus:true,token: payload}
        await User.updateOne(login,updated,{
            returnNewDocument: true,
            upsert:true
          })
        res.status(200).json({ message:"sucessfully",token:payload,status:true})  
    
}
exports.logout = async (req,res) =>{
    const token = req.header("auth-token");
    var decoded = jwt.decode(token);
    var email=decoded.email
    const filtered =await User.findOne({email})
    const updated={loginstatus:false,token:null}
        try {
           await User.updateOne(filtered,updated,{
                returnNewDocument: true,
                upsert:true
              })
              res.status(200).json({ message:"sucefully logout",token:"null"})
        }catch(e){
            console.log(e)
        }
}
exports.send=async (req,res) => {
    const token = req.header("auth-token");
    var decoded = jwt.decode(token);
    var id=decoded._id;
    const user=User.findById({id})
    console.log(user)

}