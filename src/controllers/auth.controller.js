import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwtGeneretor from '../utils/jwt.generetor.js';

const authController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || email.length < 12 || !password || password.length < 8) {
        return res.status(400).json({ message: 'invalid credentials' });
      }

      if (!email.length > 12 || !password.length > 8) {
        return res.status(400).json({ message: 'invalid credentials' });
      }

      const isExists = await userModel.findOne({ email });
      if (isExists) {
        return res.status(400).json({ message: 'invalid credentials' });
      }

      let trimedEmail = email.trim();

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await userModel.create({
        email: trimedEmail,
        password: hashedPassword,
      });

      let token = jwtGeneretor(user._id, res);

      // New concept !!
      delete user._doc.password;

      res.status(201).json({ user, token });
    } catch (error) {
      console.log(`error occured in register controller !! ${error.message}`);
      res.status(500).json({ message: 'internal server error, try again' });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'invalid credentials' });
      }

      const compared = await bcrypt.compare(password, user.password);
      if (!compared) {
        return res.status(401).json({ message: 'invalid credentials' });
      }

      const token = jwtGeneretor(user._id, res);

      delete user._doc.password;

      res.status(200).json({ user, token });
    } catch (error) {
      console.log(`error occured in login controller !! ${error.message}`);
      res.status(500).json({ message: 'something went wron, try again later' });
    }
  },
  logout: (req, res) => {
    try {
      res.cookie('auth_t', '', {
        maxAge: 0,
      });
      res.status(200).json({ message: 'Logged Out' });
    } catch (error) {
      console.log(`error occured in logout controller !! ${error.message}`);
      res
        .status(500)
        .json({ message: 'something went wrong, try again later' });
    }
  },
  protectedRoute: (req, res) => {
    const user = req.user;

    const token = jwtGeneretor(user._id, res);

    res.status(200).json({ user, token });
  },
};

export default authController;
