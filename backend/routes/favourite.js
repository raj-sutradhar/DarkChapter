const router = require("express").Router();
const user = require("../models/user");
require("dotenv").config();
const { authenticateToken } = require("./userAuth");

router.put("/addtofavourite",authenticateToken, async (req,res)=>{
    try {
        const {id,bookid}=req.headers;
        const userData = await user.findById(id);
        const isFavourite = userData.favourites.includes(bookid);
        if(isFavourite){
            return res.status(200).json({message:"Book already in favourites"})
        }
        await user.findByIdAndUpdate(id, {$push:{favourites:bookid}})
        return res.status(200).json({message:"Book added to favourites"})


    } catch (error) {
        res.status(500).json({message:"Internal server error"}) 
    }
})

router.put("/removefromfavourite",authenticateToken, async (req,res)=>{
    try {
        const {id,bookid}=req.headers;
        const userData = await user.findById(id);
        const isFavourite = userData.favourites.includes(bookid);
        if(!isFavourite){
            return res.status(400).json({message:"Book not in favourites"})
        }
        await user.findByIdAndUpdate(id, {$pull:{favourites:bookid}})
        return res.status(200).json({message:"Book removed from favourites"})


    } catch (error) {
        res.status(500).json({message:"Internal server error"}) 
    }
})

router.get("/getfavourite",authenticateToken, async (req,res)=>{
    try {
        const {id}=req.headers;
        const userData = await user.findById(id).populate("favourites");
        const favouriteBooks = userData.favourites;
        return res.status(200).json({status: "success", data:favouriteBooks})


    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

module.exports = router;
