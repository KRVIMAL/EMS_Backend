import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document{
  _id:string,
  name:string,
  email:string,
  photo:string,
  role:"admin"|"user",
  gender:"male"|"female",
  dob:Date;
  createdAt:Date;
  updateAt:Date;
  //virtual attribute
  age:number;
}

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please enter ID"],
    },
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
    photo: {
      type: String,
      required: [true, "Please enter Photo"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "femal"],
      required: [true, "Please enter Genter"],
    },
    dob: {
      type: Date,
      required: [true, "Please enter Date of Birth"],
    },
  },
  {
    timestamps: true,
  }
);
schema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;
  let age:number = today.getFullYear() - dob.getFullYear();
  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
});

export const User = mongoose.model("User", schema);
