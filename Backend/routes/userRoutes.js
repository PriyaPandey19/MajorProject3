import express from "express";
import User from "../models/User.js";

const router = express.Router();
router.post("/save-user",async(req,res) => {
    try{
        const {uid, name, email, photoURL, provider} = req.body;

        let user = await User.findOne({ uid });
        if(!user){
            user = new User ({
                uid,
                name,
                email,
                photoURL,
                provider,
                createdAt: new Date()
            });
            await user.save();
        }
        res.json({success : true, user});
    }catch(error){
        res.status(500).json({error:error.message});
    }
});
export default router;