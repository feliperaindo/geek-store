// Biblioteca
import bcrypt from 'bcryptjs';

async function hashValidator(password: string, hash: string) : Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export default { hashValidator };