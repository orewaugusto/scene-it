export interface LoginUserServiceInterface {
  execute: (email: string, password: string) => Promise<string>;
}