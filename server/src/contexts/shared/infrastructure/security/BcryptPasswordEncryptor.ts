import bcrypt from "bcryptjs";

import { IPasswordEncryptor } from "../../domain/IPasswordEncryptor";

export class BcryptPasswordEncryptor implements IPasswordEncryptor {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async compare(hashed: string, plain: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
