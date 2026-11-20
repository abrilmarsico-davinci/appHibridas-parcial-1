import User from '../auth/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Por favor ingresa email, contraseña y nombre'
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya existe'
      });
    }

    const user = await User.create({ email, password, name });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'tu_secreto_aqui',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el registro',
      error: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor ingresa email y contraseña'
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email o contraseña incorrectos'
      });
    }

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Email o contraseña incorrectos'
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'tu_secreto_aqui',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el login',
      error: error.message
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo usuario',
      error: error.message
    });
  }
};
