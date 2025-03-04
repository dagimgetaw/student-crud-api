const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    gender: {
      type: String,
      required: [true, "gender is required"],
    },
    age: {
      type: Number,
      required: [true, "age is required"],
      default: 0,
    },
    department: {
      type: String,
      required: [true, "department is required"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
