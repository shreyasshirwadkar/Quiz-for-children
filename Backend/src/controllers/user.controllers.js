import { User } from "../models/user.models.js";
import ApiError from "../utils/apiError.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";

// Generate access and refresh tokens
const generateTokens = async function(userId) {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshAccessToken = await user.generateRefreshAccessToken();
    user.refreshAccessToken = refreshAccessToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshAccessToken };
  } catch (error) {
    throw new ApiError(400, "Error in creating tokens", error);
  }
};

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  
  if (!userName) {
    throw new ApiError(400, "Username not found");
  }
  if (!password) {
    throw new ApiError(400, "Password not found");
  }

  const existedUser = await User.findOne({ userName });
  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  const newUser = await User.create({ userName, password });
  if (!newUser) {
    throw new ApiError(400, "Error in creating user");
  }

  const createdUser = await User.findById(newUser._id).select("-password");
  if (!createdUser) {
    throw new ApiError(400, "User not created");
  }

  return res.status(200).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

// Log in a user
const logInUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  if (!userName) {
    throw new ApiError(400, "Username not found");
  }
  if (!password) {
    throw new ApiError(400, "Password is missing");
  }

  const user = await User.findOne({ userName });
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const isPassCorrect = await user.isPasswordCorrect(password);
  if (!isPassCorrect) {
    throw new ApiError(400, "Password is not correct");
  }

  const { accessToken, refreshAccessToken } = await generateTokens(user._id);
  const loggedInUser = await User.findById(user._id).select("-password -refreshAccessToken");

  const Options = {
    httpOnly: true, // Use true for security reasons
    secure: true, // Ensure secure is true if using HTTPS
    sameSite: 'None', // Keep None for cross-site cookies
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, Options)
    .cookie("refreshAccessToken", refreshAccessToken, Options)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});

// Log out a user
const logOutUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );

  const Options = {
    httpOnly: true, // Match the same options used for setting the cookie
    secure: true,
    sameSite: 'None',
    path: '/', // Ensure the path is set correctly
  };

  return res
    .status(200)
    .clearCookie("accessToken", Options)
    .clearCookie("refreshAccessToken", Options)
    .json(new ApiResponse(200, "User logged out successfully!!"));
});

export { registerUser, logOutUser, logInUser };
