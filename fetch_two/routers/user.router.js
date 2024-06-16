const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const AddressModel = require("../models/address.model");
const PaymentModel = require("../models/payment.model");
require("dotenv").config();

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user)
      return res.json({
        message: "You are already registered.",
        status: false,
      });

    if (!password || !email)
      return res.json({
        message: "Invalid Credentials.",
        status: false,
      });

    bcrypt.hash(password, 5, async (err, hashedPassword) => {
      if (err) return res.send("Something went wrong");

      const newUser = new UserModel({ email, password: hashedPassword });
      await newUser.save();
      return res
        .status(200)
        .json({ message: "User registered successfully", status: true });
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!password || !email)
      return res.json({ message: "Invalid Credentials. Please try again." });

    if (!user) return res.json({ message: "Please register first." });

    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        const access_token = jwt.sign(
          {
            _id: user._id,
            email: user.email,
          },
          process.env.SECRET_CODE
        );
        return res.status(200).json({
          message: "Logged in successfully",
          access_token,
          email: email,
        });
      } else return res.json({ message: "Invalid Credentials" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.post("/address", async (req, res) => {
  const { email, address } = req.body;

  if (email && address) {
    const newAddress = new AddressModel({ email, address });
    await newAddress.save();
    return res.json({ message: "Address Added.", status: true });
  }

  return res.json({ message: "Invalid Data.", status: false });
});

userRouter.post("/payment", async (req, res) => {
  const { email, payment } = req.body;

  if (email && payment) {
    const newPayment = new PaymentModel({ email, payment });
    await newPayment.save();
    return res.json({ status: "Success", message: "Payment Done" });
  }

  return res.json({ status: "Fail", message: "Payment Failed" });
});

module.exports = userRouter;
