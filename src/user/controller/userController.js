const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");


// const getAllUsers = async (req, res) => {
//   let { limit, page } = req.query;

//   const skip = (page - 1) * limit;
//   if (!page) {
//     page = 1;
//   }
//   if (!limit) {
//     limit = 10;
//   }
//   limit = parseInt(limit);
//   try {
//     const users = await User.find({}).select("-password").limit(limit).skip(skip);
//     const total = await User.count();
//     const totalPages = Math.ceil(total / limit);
//     res
//       .status(StatusCodes.OK)
//       .json({ message: "success", total, totalPages, data: users });
//   } catch (error) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
//   }
// };

// const getUserById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.find({ _id: id });
//     if (user) {
//       res.status(StatusCodes.OK).json({ message: "Success", data: user });
//     } else {
//       res
//         .status(StatusCodes.OK)
//         .json({ message: "There is no user With this ID" });
//     }
//   } catch (error) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
//   }
// };

const addNewUser = async (req, res) => {
  try {
    const existedUser = await User.findOne({ email: req.body.email });
    if (existedUser) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "This email is already exist" });
    } else {
        const salt = parseInt(process.env.HASH_ROUNDS)
        req.body.password = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
      });

      const data = await newUser.save();

      res.status(StatusCodes.OK).json({ message: "User Created", data });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error",error });
  }
};

const signIn = async (req,res)=>{

    try {
        const {email,password} = req.body;
        const user = await User.findOne({email:email})
        if(!user){
            res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid email"})
        }else{
            const result = await bcrypt.compare(password,user.password);
            if(result){
                let token =  jwt.sign({ _id: user.id }, process.env.SECRET_KEY, {
                    expiresIn: process.env.TOKEN_EXPIRATION,
                });
                const data = await User.findOne({email:email}).select("-password")
                res.status(StatusCodes.OK).json({ message: "login success",token, data });
            }else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"Wrong password"})
            }
        }
        

        

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error",error:error });

    }
}

deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await User.deleteOne({ _id: id });
      if (data.deletedCount) {
        res.json({ message: "deleted success", data });
      } else {
        res.json({ message: "id is not exist", data });
      }
    } catch (error) {
      res.json({ message: "Error", error });
    }
  };
  
  updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName } = req.body;
    try {
      const data = await User.updateOne({ _id: id }, { firstName });
      res.json({ message: "updated success", data });
    } catch (error) {
      res.json({ message: "Error", error });
    }
  };
module.exports = {
  getAllUsers,
  getUserById,
  addNewUser,
  signIn,
  deleteUser,
  updateUser
};
