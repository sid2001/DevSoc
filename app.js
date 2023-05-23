const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
//const mongoConnect = require("./util/database").mongoConnect;
//const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// app.use((req, res, next) => {
//   User.findById("6460306ac2f6909be258f9e2")
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect("mongodb+srv://sisa:up32dp0799@cluster0.nrslqpa.mongodb.net/shop")
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
