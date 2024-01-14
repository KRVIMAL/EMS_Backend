import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedJwtPayload extends JwtPayload {
  userId?: string;
}


declare module 'express' {
  interface Request {
    user?: Document;
  }
}

const protect = asyncHandler(
  async (req:any, res: Response, next: NextFunction) => {
    let token;
    const secret: any = process.env.JWT_SECRET;
    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, secret) as DecodedJwtPayload;
        if (decoded.userId) {
          req.user = await User.findById(decoded.userId).select("-password");
          next();
        } else {
          res.status(401);
          throw new Error("Not authorized, invalid token payload");
        }
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export { protect };
