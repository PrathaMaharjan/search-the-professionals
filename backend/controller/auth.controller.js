
// let users = []; // In-memory user storage (temporary)
// let users = []; // In-memory user storage (temporary)
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

export async function register(req, res) {
  try{
    const { username, email, role, password } = req.body;

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).send({ message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, role, password: hashedPassword });

    await user.save();
  } catch(e) {
  console.log(e);
  return res.status(500).json(e);
  } finally {
  res.status(201).json({ message: "User registered successfully" });
  } 
}

export async function login(req, res) {
  try{
    const { username,  password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send({ message: "User not found" });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Incalid credentials");


    const token = jwt.sign ({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

    res.json({message: "Login successful", user, token});

  } catch(e) {
  console.log(e);
  return res.status(500).json(e);
  } 
}
