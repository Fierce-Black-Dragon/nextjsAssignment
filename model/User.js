const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,

    maxlength: [40, " max 40 character"],
  },
  email: {
    type: String,
    required: [true, "Please enter the email address"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
    minlength: [6, "Please enter password greater than or equal to 6 char"],
  },
  mobile_no: {
    type: Number,
    maxlength: [13, "Please enter password greater than or equal to 6 char"],
  },
  verified: {
    type: Boolean,
    default: false,
  },

  verificationToken: Number,
  verificationTokeExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // more fields will be added when required
});

//encrypt password before save -- mongoose Hook
userSchema.pre("save", async function (next) {
  //to prevent over-encryption of password
  if (!this.isModified("password")) {
    return next();
  }
  //encrypt
  this.password = await bcrypt.hash(this.password, 10);
});
// Mongoose Methods
//user password validate method
// userSchema.methods.isPasswordValid = async function (senderPassword) {
//   console.log(senderPassword);
//   console.log(await bcrypt.compare(senderPassword, this.password));
//   return await bcrypt.compare(senderPassword, this.password);
// };

// jwt Access Token  creation
userSchema.methods.jwtAccessTokenCreation = async function () {
  return await jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    }
  );
};

// //verification token creation
// userSchema.methods.getVerificationToken = async function () {
//   //verification token creation -(type - nu)
//   const verifyToken = await crypto.randomBytes(20); // dont know how much time will  take
//   //expire
//   console.log(verificationToken);
//   this.verificationTokeExpiry = Date.now() + 20 * 60 * 1000;

//   // save hash version of the token in the database  and send the forgot password token  to user
//   this.verificationToken = await crypto
//     .createHash("sha256")
//     .update(verifyToken)
//     .digest("hex");

//   return verifyToken;
// };
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
