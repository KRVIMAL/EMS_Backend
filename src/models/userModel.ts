import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: Date;
  createdAt: Date;
  updateAt: Date;
  //virtual attribute
  age: number;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    email: {
      type: String,
      unique: [true, "Email already Exist"],
      required: [true, "Please enter Email"],
      validate: {
        validator: validator.isEmail as any,
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    next();
  }
  const salt=await bcrypt.genSalt(10);
  this.password=await bcrypt.hash(this.password,salt);
})

userSchema.methods.matchPassword=async function (enterendPassword:string) {
  console.log({enterendPassword});

  return await bcrypt.compare(enterendPassword,this.password)
}
const User = mongoose.model("User", userSchema);
export default User;
