import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {
  constructor() {}

  async registerUser(registerUserDto: RegisterUserDto) {
    const existsUser = await UserModel.findOne({
      email: registerUserDto.email,
    });
    if (existsUser) throw CustomError.badRequest("Email already exists");

    try {
      const user = new UserModel(registerUserDto);
      user.save();

      const {password, ...rest} = UserEntity.fromObject(user);

      return {
        user: rest,
        token: 'adb'
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
