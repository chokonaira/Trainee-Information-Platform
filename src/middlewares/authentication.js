import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticate = async (req, res, next) => {
  
  const token = req.header('token') || req.body.token || req.query.token;
  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'access denied, no token provided',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = decoded.id;
    req.authUser = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      error: 'authentication failed, please login again',
    });
  }
};

export default authenticate;
