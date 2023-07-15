// Biblioteca
import bcrypt from 'bcryptjs';

// Variáveis de ambiente
const SALTS = process.env.BCRYPT_SALT_ROUNDS || 10;

async function hashGenerator(password: string) : Promise<string> {
  return bcrypt.hash(password, SALTS);
}

async function hashValidator(password: string, hash: string) : Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export default { hashGenerator, hashValidator };