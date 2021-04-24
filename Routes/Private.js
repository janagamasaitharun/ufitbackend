const express = require('express')
const router = express.Router()

const {getUser} =require('../Controllers/PrivateController')

router.get("/allusers",getUser)
module.exports =router