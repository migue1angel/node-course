import { BcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    const existsUser = await UserModel.findOne({
      email: registerUserDto.email,
    });
    if (existsUser) throw CustomError.badRequest("Email already exists");

    try {
      const user = new UserModel(registerUserDto);

      user.password = BcryptAdapter.hash(registerUserDto.password);
      user.save();

      this.sendEmailValidationLink(user.email);
      const { password, ...rest } = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) throw CustomError.internalServer("Error creating a JWT");
      return {
        user: rest,
        token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) throw CustomError.notFound("User not found");
    const hasMatch = BcryptAdapter.compare(
      loginUserDto.password,
      user.password
    );
    if (!hasMatch) throw CustomError.unauthorized("Invalid credentials");

    const { password, ...rest } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken({ id: user.id });
    if (!token) throw CustomError.internalServer("Error creating a JWT");
    return {
      user: rest,
      token,
    };
  }

  async sendEmailValidationLink(email: string) {
    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw CustomError.internalServer("Error getting token");

    const link = `${envs.WEB_SERVICE_URL}/${token}`;
    const html = `
      <h1> Please validate your email</h1>
      <p> Click on the following link to validate your email</p>
      <a href="${link}">Validate you email</a>
    `;

    const options = {
      to: email,
      subject: "Validate your email",
      htmlBody: html,
    };
    const isSent = await this.emailService.sendEmail(options);
    if (!isSent) throw CustomError.internalServer("Error sending email");
    return true;
  }
}
