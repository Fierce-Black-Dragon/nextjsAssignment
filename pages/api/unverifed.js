import User from "../../model/User";
import mailHelper from "../../utilis/nodemailer";

const otp = await user.getVerificationToken();
await user.save({ validateBeforeSave: false });
// craft a message
const message = `this ur verification otp \n ${otp} `;
try {
  await mailHelper({
    email: user.email,
    subject: "Store - password reset",
    message: message,
  });
  res.status(200).json({
    succes: true,
    message: "Email sent successfully",
  });
} catch (error) {
  //if  sending email failed  resetting the token to null
  user.verificationToken = undefined;
  user.verificationTokeExpiry = undefined;
  // saving in the database
  await user.save({ validateBeforeSave: false });
  console.log(error);
}
