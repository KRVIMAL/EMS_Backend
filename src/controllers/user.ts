import { NextFunction,Request,Response } from "express";
import {User} from "../models/user.js"
import { NewUserRequestBody } from "../types/types.js";

export const newUser=async(req:Request<{},{},NewUserRequestBody>,res:Response,next:NextFunction)=>{
  try {
    console.log("name");
    const {name,email,photo,gender,_id,dob}=req.body;
    console.log({name,email,photo,gender,_id,dob});
    const user=await User.create({name,email,photo,gender,_id,dob});
    console.log({user});
    return res.status(200).json({
      success:true,
      message:`Welcome, ${user.name}`
    });
  } catch (error) {
    return res.status(401).json({
      success:false,
      message:error,
    })
  }
}