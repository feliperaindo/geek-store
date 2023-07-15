// Bibliotecas
import jwt from 'jsonwebtoken';

// Types
import { Login } from '../../types/exporter';

// Variáveis de ambiente
const SECRET = process.env.JWT_SECRET || 'secret';

const config : jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1h' };

function tokenGenerator(payload: Login): string {
  return jwt.sign(payload, SECRET, config);
}

function tokenValidator(token: string) : Login {
  return jwt.verify(token, SECRET, config) as Login;
}

export default { tokenGenerator, tokenValidator };