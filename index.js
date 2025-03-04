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
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json("user created successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "user doesn't exist" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "invalid id format" });
  }
});

app.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "user doesn't exist" });
    }
    const updatedUser = User.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "invalid id format" });
  }
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "user doesn't exist" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "user successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "invalid id format" });
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
