const router = require("express").Router();
const user = require("../models/user");
require("dotenv").config();
const { authenticateToken } = require("./userAuth");

router.put("/addtocart", authenticateToken, async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const userData = await user.findById(id);
    const isCart = userData.cart.includes(bookid);
    if (isCart) {
      return res.status(201).json({ message: "Book already in cart" });
    }
    await user.findByIdAndUpdate(id, { $push: { cart: bookid } });
    return res.status(200).json({ message: "Book added to cart" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/removefromcart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    const userData = await user.findById(id);
    const isCart = userData.cart.includes(bookid);
    if (!isCart) {
      return res.status(400).json({ message: "Book not in cart" });
    }
    await user.findByIdAndUpdate(id, { $pull: { cart: bookid } });
    return res.status(200).json({ message: "Book removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getcart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await user.findById(id).populate("cart");
    const cartdata = userData.cart.reverse();
    return res.status(200).json({ status: "success", data: cartdata });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
