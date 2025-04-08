import { Request, Response } from "express";
import * as UserService from "./user.service";

export async function createUser(req: Request, res: Response){
  try {
    const {email, username, password} = req.body;
  

  const user = await UserService.createUser({email, username, password});

  res.status(201).json(user);
  } catch (error){
    console.error(error);
  }
}