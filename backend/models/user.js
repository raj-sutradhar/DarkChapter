const mongoose = require('mongoose');

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default:
      "https://th.bing.com/th/id/OIP.dDKYQqVBsG1tIt2uJzEJHwHaHa?w=160&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7",
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  favourites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  }
],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
    }],
},
{timestamps: true}
);
module.exports = mongoose.model("user", user);