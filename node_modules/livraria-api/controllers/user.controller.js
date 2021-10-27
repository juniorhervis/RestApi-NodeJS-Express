import UserService from "../services/user.service.js";

async function getUser(req, res, next) {
  try {
    res.send(await UserService.getUser());
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  try {
    const user = req.body
    if(!user.username) {
        throw new Error("Invalid username!")
    }
    if(!user.password) {
        throw new Error("Invalid password!")
    }
    if(!user.role) {
        throw new Error("Invalid role!")
    }
    await UserService.createUser(user)
    res.status(201).json({ message: `User ${user.username} created!`})
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const user = req.body
    if(!user.username) {
        throw new Error("Invalid username!")
    }
    if(!user.password) {
        throw new Error("Invalid password!")
    }
    res.send(await UserService.login(user))
  } catch (err) {
    next(err);
  }
}

export default {
    getUser,
    createUser,
    login

}
