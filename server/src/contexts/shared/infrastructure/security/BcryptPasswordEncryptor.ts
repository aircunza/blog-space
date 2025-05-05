import bcrypt from "bcryptjs";

import { IPasswordEncryptor } from "../../domain/IPasswordEncryptor";

export class BcryptPasswordEncryptor implements IPasswordEncryptor {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  async compare(hashed: string, plain: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
