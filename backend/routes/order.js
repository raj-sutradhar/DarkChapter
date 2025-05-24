const router = require("express").Router();
const user = require("../models/user");
require("dotenv").config();
const { authenticateToken } = require("./userAuth");
const order = require("../models/order");

router.post("/placeorder", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order: orderArray } = req.body;

    for (const orderData of orderArray) {
      const newOrder = new order({
        user: id,
        book: orderData._id,
      });

      const orderDataFromDb = await newOrder.save();

      await user.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });

      await user.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }

    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Order placement failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//GET ORDERS HISTORY FOR PARTICULAR USER
router.get("/orders", authenticateToken, async (req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await user.findById(id).populate({
            path: "orders",
            populate: {path: "book"}

        });
        const orderData = userData.orders.reverse()
        res.status(200).json({message:"Orders fetched successfully", data: orderData})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        
    }
})

//GET ALL ORDERS FOR ADMIN
// routes/orders.js
router.get("/allorders", authenticateToken, async (req, res) => {
  try {
    const orders = await order.find()
      .populate({
        path: "user",
        select: "name email" // Only get necessary user fields
      })
      .populate({
        path: "book",
        select: "title author price" // Only get necessary book fields
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({ 
      status: "success", 
      data: orders 
    });
  } catch (error) {
    console.error("All orders error:", error);
    res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
});

//update order status
router.put("/updateorder/:id", authenticateToken, async (req,res)=>{
    try {
        const {id} = req.params;
        await order.findByIdAndUpdate(id, {
            status: req.body.status
        });
        return res.status(200).json({status:"success", message:"Order status updated successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        
    }
})

module.exports = router;