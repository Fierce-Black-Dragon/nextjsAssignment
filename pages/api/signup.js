import User from "../../model/User";
import mailHelper from "./../../utilis/nodemailer";
const crypto = require("crypto");
export default async function handler(req, res) {
  try {
    const { name, email, password, mobile_no } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ message: " email already exist" });
    }

    const user = await User.create(req.body);
    console.log(user);
    //   verification token creation -(type - nu)

    var minm = 100000;
    var maxm = 999999;
    const otp = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

    //  save  token in the database  and send the forgot password token  to user
    user.verificationToken = otp;
    user.verificationTokeExpiry = Date.now() + 20 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
    // craft a message
    const message = `this ur verification otp \n ${otp} `;
    try {
      await mailHelper({
        email: user.email,
        subject: "Email verification",
        message: message,
      });
      res.status(200).json({
        success: true,
        message:
          " Register successfully u can login now &&  otp send Email sent successfully",
      });
    } catch (error) {
      //if  sending email failed  resetting the token to null
      user.forgotPasswordToken = undefined;
      user.forgotTokenExpiry = undefined;
      // saving in the database
      await user.save({ validateBeforeSave: false });
    }
  } catch (error) {
    console.log(error);
  }
}
