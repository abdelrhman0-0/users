const mongoose = require('mongoose');
const bcrypt = require("bcrypt");


const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    email: {
        type: String,
        required:true,
        validate: {
          validator: function (v) {
            return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              v
            );
          },
          message: (props) => `${props.value} is not a valid email!`,
        },
        required: [true, "User email is required"],
      },
    password:{
        type:String,
        required:true,
        validate:{
            validator:(v)=>{
                return /(?=.*\d)(?=.*[a-zA-z])(\w+){8,}/.test(v)
            },
            message:"Your password should be more than 8 characters with at least one number and one letter"
        }
    }
    
},
{
    timestamps:true
})

// //hooks
// userSchema.pre("save", async function (next) {
//     this.password = bcrypt.hash(this.password, process.env.HASH_ROUNDS);
//     next();
//   });

  module.exports = userSchema;