const router = require("express").Router();
const user = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { authenticateToken } = require("./userAuth");
const book = require("../models/book");

router.post("/addbook",authenticateToken, async(req,res)=>{
    try {
        const {id}=req.headers;
        const existingUser = await user.findById(id);
        if (existingUser.role !== "admin") {
            return res.status(400).json({ message: "You are not authorized to add a book" });
        }
        const {url, title, author, price, description, language } = req.body;
        const newBook = new book({
            url,
            title,
            author,
            price,
            description,
            language,
        });
        await newBook.save(); 
        return res.status(200).json({message:"Book added successfully"})

    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

router.put("/updatebook", authenticateToken, async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const existingUser = await user.findById(id);

    if (existingUser.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to update a book" });
    }

    const updatedBook = await book.findByIdAndUpdate(
      bookid,
      {
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        description: req.body.description,
        language: req.body.language,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.error("Update Book Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/deletebook", authenticateToken, async (req, res) => {
    try {
        const { id, bookid } = req.headers;
        await book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "Book deleted successfully" });
        
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

router.get("/getbooks", async (req, res) => {
    try {
        const data = await book.find().sort({createdAt:-1});
        if (!data) {
            return res.status(404).json({ message: "No books found" });
        }
        res.status(200).json({status:"success", data:data})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

router.get("/recentbooks", async (req, res) => {
  try {
    const data = await book.find().sort({ createdAt: -1 }).limit(4);
    if (!data) {
      return res.status(404).json({ message: "No books found" });
    }
    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getbook/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await book.findById(id);
        if (!data) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({status:"success", data:data})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

module.exports = router;

