import { read, write } from "../utils/model.js";
import jwt from "../utils/jwt.js";

const LOGIN = (req, res) => {
  try {
    const admins = read("admins");
    const { username, password } = req.body;
    console.log("ok", req.body);
    const user = admins.find(
      (user) => user.username == username && user.password == password
    );

    if (!user) {
      throw new Error("wrong username or password");
    }
    delete user.password;
    res.status(200).json({
      status: 200,
      message: "success",
      data: {
        token: jwt.sign({ username: username }),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

const REGISTER = (req, res) => {
  try {
    const admins = read("admins");
    const { username, password } = req.body;

    const user = admins.find((user) => user.username == username);

    if (user) {
      throw new Error("username already exists");
    }
    const newUser = {
      id: admins.at(-1).id + 1 || 1,
      username,
      password,
    };
    admins.push(newUser);
    write("admins", admins);

    delete newUser.password;
    res.status(201).json({
      status: 201,
      message: "success",
      token: jwt.sign({ userId: newUser.userId }),
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

const GET = (req, res) => {
  try {
    const admins = read("admins").filter((user) => delete user.password);

    res.status(200).json({
      status: 200,
      message: "success",
      data: admins,
    });
  } catch (error) {
    res.status(400).json({
        status: 400,
        message: error.message,
      });
  }
};

export default {
  LOGIN,
  REGISTER,
  GET,
};
