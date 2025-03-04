const express = require("express");
const connectDB = require("./db");
const User = require("./models/userModel");

const app = express();
app.use(express.json());

const port = process.env.port || 5000;

connectDB();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/user", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json({ message: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({ message: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json({ message: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body);
    const updatedUser = await User.findById(id);
    res.status(200).json({ message: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "user successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
