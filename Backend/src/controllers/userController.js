const generateToken = require("../config/generateToken");
const User = require("../models/User");

const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");


const registerUser = asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        throw new ApiError(400, "name and email is required")
    }
    const existedUser = await User.findOne({ email })
    if (existedUser) {
        throw new ApiError(400, 'User with this email already exists')
    }
    const user = await User.create({ name, email })
    const token = generateToken(user._id)
    const newUser = await user.toObject();
    newUser.token = token;
    return res.status(201).json(new ApiResponse(200, newUser, "User registered successfully"));
})

const loginUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new ApiError(400, ' email is required')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(404, 'User with this email doesnot exist')
    }
    const token = generateToken(user._id);
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).cookie(options).json(
        new ApiResponse(200, {
            user, token
        }, "User logged In Successfully")
    )
})


module.exports = { registerUser, loginUser }