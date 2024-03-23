const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const todoRoute = require("./routes/todoRoute");
const { requireAuth } = require("./middleware/authMiddleware");
const cookieParser = require("cookie-parser");
const app = express();

const cors = require("cors");
const port = 8000;

app.use(
  cors({
    origin: "*", // Allow requests from all origins
  })
);

// app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const mongoUri = `mongodb://localhost:27017/databse2`;
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) =>
    app.listen(port, () => {
      console.log(`server running on port ${port}.`);
    })
  )
  .catch((err) => console.log(err));

app.use("/user", userRoute);
app.use("/todo", todoRoute);
