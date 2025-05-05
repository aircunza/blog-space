export interface IPasswordEncryptor {
  hash(password: string): Promise<string>;

  compare(hashed: string, plain: string): Promise<boolean>;
}
