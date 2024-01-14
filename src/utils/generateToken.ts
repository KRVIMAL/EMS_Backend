import jwt from 'jsonwebtoken';
import {Response } from "express";
const secret:any=process.env.JWT_SECRET;
const generateToken=(res:Response,userId:any)=>{
  const token=jwt.sign({userId},secret,{
    expiresIn:'30d'
  })

res.cookie('jwt',token,{
  httpOnly:true,
  secure:process.env.NODE_ENV !== 'development',
  sameSite:'strict',
  maxAge:30*24*60*50*1000
})
}

export default generateToken