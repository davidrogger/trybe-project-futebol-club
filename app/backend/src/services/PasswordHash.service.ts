import * as bcrypt from 'bcryptjs';

class PasswordHash {
  static encrypt(password: string): string {
    return bcrypt.hashSync(password);
  }

  static verify(password: string, passwordHash: string): boolean {
    return bcrypt.compareSync(password, passwordHash);
  }
}

export default PasswordHash;