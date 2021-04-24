const User = require('../Schema/User')
const jwt = require('jsonwebtoken');

exports.getUser = async (req,res) =>{
const Data =await User.find({})
res.status(200).json(Data)
}
