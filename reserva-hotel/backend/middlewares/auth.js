const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

module.exports = function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded; // 👈 Esto es clave
    next();
  } catch {
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
};
