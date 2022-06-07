import User from "../../model/User";
const bcrypt = require("bcryptjs");
import { serialize } from "cookie";
export default async function handler(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne(
      { email: email },
      { password: 1, email: 1, name: 1 }
    );
    if (!user) {
      res.status(400).json({ message: " user does not exist" });
    }
    console.log(user);
    const validPass = await bcrypt.compare(password, user.password);
    console.log(validPass);
    if (validPass) {
      const accessToken = await user.jwtAccessTokenCreation();

      const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        // Secure: true,
      };
      const serialised = serialize("accessToken", accessToken, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      });

      res.setHeader("Set-Cookie", serialised);

      res.status(200).json({
        success: true,
        access_token: accessToken,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401).json({ message: " wrong credentials" });
    }
  } catch (error) {
    console.log(error);
  }
}
