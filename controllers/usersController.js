const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      // Para registro manual, mapeamos "name" a username y displayName
      username: name,
      displayName: name,
      email,
      password: hashedPassword,
      githubId: null,      // No se asigna en registro manual
      profileUrl: '',      // Valor por defecto
      avatarUrl: ''        // Valor por defecto
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ message: 'User successfully deleted' });
  } catch (error) {
    next(error);
  }
};
