import pkg from 'jsonwebtoken';
const { sign } = pkg;

const generateToken = (userId,name) => {
  return sign({ id: userId,name}, process.env.JWT_SECRET, {
  });
};

export default generateToken;
