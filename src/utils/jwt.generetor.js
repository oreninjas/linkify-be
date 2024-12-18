import jwt from 'jsonwebtoken';

const jwtGeneretor = (data, res) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  res.cookie('auth_t', token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  return token;
};

export default jwtGeneretor;
