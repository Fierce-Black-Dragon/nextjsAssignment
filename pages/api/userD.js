import jwt from "jsonwebtoken";
import User from "../../model/User";
export default async function handler(req, res) {
  const { cookies } = req;

  const token = cookies.accessToken;

  if (!token) {
    return res.json({ message: "Invalid token!" });
  }
  const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
  console.log(decoded);
  const user = await User.find({ _id: decoded.id });
  console.log(user);
  return res.json({ data: user });
}
