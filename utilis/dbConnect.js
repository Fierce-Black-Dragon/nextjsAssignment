import mongoose from "mongoose";

const connection = {};

const mongoDbUrL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.51rp6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const dbConnect = () => {
  console.log(mongoDbUrL);
  mongoose
    .connect(mongoDbUrL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to mongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default dbConnect;
