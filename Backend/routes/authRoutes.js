import express from "express";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import axios from "axios";

const router = express.Router();

const otpStore = {};

router.post("/send-otp",async(req,res) => {
    const {email} = req.body;
    if(!email) return res.status(400).json({error:"Email required"});

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.GMAIL_USER,
            pass:process.env.GMAIL_PASS
        }
    });

    const mailOptions={
        from:`Your PortfolioGenerator<${process.env.GMAIL_USER}>`,
        to:email,
        subject:"Your OTP Code",
        text:`Your OTP is: ${otp}`
    };

    try{
        await transporter.sendMail(mailOptions);
        res.json({success:true, message:"OTP sent successfully"});
    }catch(error){
        console.error("MAIL ERROR",error);
        res.status(500).json({error:"Error sending OTP"});
    }
});


router.post("/verify-otp",async(req,res) => {
    const {email,otp,uid,name,provider} = req.body;

    if(!otpStore[email]){
        return res.status(400).json({error:"OTP not requested"});
    }
    if(otpStore[email] != otp){
        return res.status(400).json({error:"Invalid OTP"});
    }

    delete otpStore[email];

    let user = await User.findOne({uid});

    if(!user){
        user = new User({
            uid,
            name,
            email,
            provider,
            createdAt: new Date()
        });
        await user.save();
    }
    res.json({success: true, user});
});

router.post("/google-login", async(req,res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({error:"Token required"});
        }

        // Get user info from Google using the token
        const response = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        const { id, email, name, picture } = response.data;

        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            // Create new user if doesn't exist
            user = new User({
                uid: id,
                name: name || email.split('@')[0],
                email,
                provider: "google",
                profilePicture: picture,
                createdAt: new Date()
            });
            await user.save();
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error("Google login error:", error.message);
        res.status(500).json({error:"Google login failed", details: error.message});
    }
});

export default router;

