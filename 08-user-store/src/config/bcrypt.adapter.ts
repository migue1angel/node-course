import { compareSync, genSaltSync, hashSync } from "bcrypt";

// export const bcryptAdapter = {
//   hash: (password: string) => {
//     const salt = genSaltSync();
//     return hashSync(password, salt);
//   },

//   compare: (hashed: string,password: string ) => {
//     return compareSync(hashed, password)
//   }
// };

export class BcryptAdapter{
  static hash(password: string){
    return hashSync(password, genSaltSync())
  }
  static compare(hashed:string, password:string){
    return compareSync(hashed, password)
  }
}
