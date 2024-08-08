const router=require('express').Router()
const { signup, signin, logout, userProfile } = require('../controllers/authController')
const { isAuthenticated } = require('../middleware/auth')

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/logout',logout)
router.get('/me',isAuthenticated,userProfile)

module.exports=router