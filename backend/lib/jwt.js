import pkg from 'jsonwebtoken';
const { sign } = pkg;

const generateToken = (userId,name) => {
  return sign({ id: userId,name}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export default generateToken;
