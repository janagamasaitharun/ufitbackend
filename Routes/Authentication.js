const express = require('express')
const router = express.Router()

const {register,login,logout,send} =require('../Controllers/Auth.Controllers')

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.post("/sendotp",send)
module.exports = router