import * as bcrypt from 'bcryptjs';

class PasswordHash {
  static verify(password: string, passwordHash: string): boolean {
    return bcrypt.compareSync(password, passwordHash);
  }
}

export default PasswordHash;
