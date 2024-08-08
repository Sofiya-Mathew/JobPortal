const User = require('../models/userModel'); // Ensure the correct path
const ErrorResponse = require('../utils/errorResponse');

exports.signup = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Check if the user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(new ErrorResponse('Email already exists', 400));
    }

    // Create new user
    const user = await User.create(req.body);

    // Send response
    res.status(201).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  
    try {
     const { email,password } = req.body;
     //validation
      if (!email) {
        return next(new ErrorResponse('Please add an email', 403));
      }
      if (!password) {
        return next(new ErrorResponse('Please add password', 403));
      }

      const user = await User.findOne({ email });
       if(!user){
        return next(new ErrorResponse('Invalid Credentials', 404));
       }

       const isMatched=user.comparePassword(password)
       if(!isMatched){
        return next(new ErrorResponse('Invalid Credentials', 404));
       }

       sendTokenResponse(user,200,res)
      
    } catch (error) {
      next(error);
    }
  };

  const sendTokenResponse = (user, codeStatus, res) => {
    const token = user.getJwtToken();
  
    res.status(codeStatus)
      .json({ success: true, token, user });
  };
  


  //Logout
  exports.logout=(req,res,next)=>{
    res.clearCookie('token');
    res.status(200).json({
        success:true,
        message:'logged out'
    })
  }

  //Authentication
  exports.userProfile=async (req,res,next)=>{
    const user=await User.findById(req.user.id).select('-password')
    res.status(200).json({
        success:true,
        user
    })
  }
