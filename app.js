const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const RoutesAPIUser = require("./server/routes/RoutesAPIUser");
const RoutesAPIProject = require("./server/routes/RoutesAPIProject");
const path = require("path");
const dotenv = require("dotenv");
const http = require("http").createServer(app);
const jwt = require("jsonwebtoken");
const User = require("./server/models/studentUser");
const cloudinary = require("cloudinary");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const socketIo = require("socket.io");
const compression = require("compression");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

mongoose
  .connect(process.env.MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("- Connected to IdeaStack Database...");
  })
  .catch((err) => console.log(err));

mongoose.connection.on("error", function (err) {
  console.log(err);
});

app.use(express.json());
let linkUrl =
  process.env.NODE_ENV === "production"
    ? "https://www.ideastack.org"
    : "http://localhost:3000";

app.use(
  cors({
    origin: linkUrl,
    credentials: true,
  })
);

const io = socketIo(http, {
  cors: {
    origin: linkUrl,
    credentials: true,
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
  },
  allowEIO3: true,
});

io.on("connection", (socket) => {
  console.log("- New client connected");
  socket.on("disconnect", (reason) => {
    console.log("- Client disconnected");
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

const port = process.env.PORT || 4000;

app.use(
  session({
    secret: process.env.SESHSECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// app.use(compression());

// app.get("*.js", function (req, res, next) {
//   req.url = req.url + ".gz";
//   res.set("Content-Encoding", "gzip");
//   next();
// });

app.use("/api/user", RoutesAPIUser);
app.use("/api/project", RoutesAPIProject);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use("*", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

http.listen(port, () => {
  console.log(`- Successfully connected to server at port ${port}`);
});
