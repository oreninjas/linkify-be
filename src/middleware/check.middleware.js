import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const checkAuth = async (req, res, next) => {
  try {
    const { auth_t } = req.cookies;
    if (!auth_t) {
      return res.status(401).json({ message: 'invalid credentials' });
    }
    const verifyToken = jwt.verify(auth_t, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({ message: 'invalid credentials' });
    }

    const user = await userModel.findOne({ _id: verifyToken.data });
    req.user = user;

    next();
  } catch (error) {
    console.log(`there was error on checkAuth middleware !! ${error.message}`);
    res
      .status(401)
      .json({ message: 'invalid credentials please try again later' });
  }
};

export default checkAuth;
