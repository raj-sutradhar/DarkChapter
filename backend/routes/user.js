const router = require('express').Router();
const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {authenticateToken} = require('./userAuth')

router.post('/signup', async (req,res)=>{
    
    try {
        const { username, email, password, address } = req.body;
        if(username.length <3){
            return res.status(400).json({message:"username must be greater than 3 characters"})
        }
        const existingUser = await user.findOne({username:username});
        if(existingUser){
            return res.status(400).json(message="username already Exists")
        }
        const existingEmail = await user.findOne({email:email});
        if(existingEmail){
            return res.status(400).json(message="email already Exists")
        }

        if(password.length < 6){
            return res.status(400).json({message:"password must be greater than 6 characters"})
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new user({
            username,
            email,
            password: hashPassword,
            address,
        });
        await newUser.save();
        return res.status(200).json({message:"SignUp successfully"})

    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

router.post("/signin", async (req, res) => {
  try {
   const { username, password } = req.body;
    const existingUser = await user.findOne({username:username});
    
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    await bcrypt.compare(password,existingUser.password,(err,data)=>{
        if(data){
            const authclaims = {
                username:existingUser.username,
                role:existingUser.role,
            }
            const token = jwt.sign({authclaims}, process.env.JWT_SECRET, { expiresIn: "90d" });
            return res.status(200).json({id:existingUser._id,role:existingUser.role,token:token})
        }
        else{
            return res.status(400).json({message:"Invalid credentials"})
        }
    })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getuser",authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers
        const data = await user.findById(id).select("-password")
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

router.put("/updateAddress", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    const data = await user.findByIdAndUpdate(id, { address: address });
    res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;