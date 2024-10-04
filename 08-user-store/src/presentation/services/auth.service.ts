import { bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {
  constructor() {}

  async registerUser(registerUserDto: RegisterUserDto) {
    const existsUser = await UserModel.findOne({
      email: registerUserDto.email,
    });
    if (existsUser) throw CustomError.badRequest("Email already exists");

    try {
      const user = new UserModel(registerUserDto);
      console.log(user);
      
      user.password = bcryptAdapter.hash(registerUserDto.password);
      user.save();

      const { password, ...rest } = UserEntity.fromObject(user);

      return {
        user: rest,
        token: "adb",
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) throw CustomError.notFound("User not found");
    const hasMatch = bcryptAdapter.compare(
      loginUserDto.password,
      user.password,
    );
    if (!hasMatch) throw CustomError.unauthorized("Invalid credentials");

    const {password, ...rest} = UserEntity.fromObject(user)  
    return {
      user: rest,
      token: "abc",
    };
  }
}
