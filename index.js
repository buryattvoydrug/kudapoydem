const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const router = express.Router();
const path = require("path");

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
).then((res) => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.log(error);
});
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.static(path.join(__dirname, "./client/build")));

app.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.get('/profile/:username', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.get('/login', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.get('/register', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(process.env.PORT || 8800, () => {
  console.log("Backend server is running!");
});