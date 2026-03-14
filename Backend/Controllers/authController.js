
import bcrypt from "bcryptjs";
import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";

const router = Router();

import { authMiddleware } from "../Middleware/authMiddleware.js";
import { roleMiddleware } from "../Middleware/roleMiddleware.js";


router.post("/create-user", async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({message:"Please fill all the fields"})
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"No user found with this email"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        } 

        const token = jwt.sign({
            id:user._id,
            role:user.role,
        
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
        });
        res.status(200).json({ token , message:"Login successful" , user:{
            name:user.name,
            email:user.email,
            role:user.role
        }});
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
});

router.get("/", authMiddleware, (req, res) => {
    res.send("Welcome to the User authentication system");
});

router.get("/admin", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
    res.send("Welcome to the Admin panel");
});

router.get("/me", authMiddleware, async (req, res) => {
    console.log("token received for /me route, user id:", req.user.id);
  try {

    const user = await User.findById(req.user.id).select("-password");

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
});

router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
});

router.get("/users", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});


export default router;