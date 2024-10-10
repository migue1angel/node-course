import { Validators } from "../../../config";
import { UserEntity } from "../../entities/user.entity";

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string, //id user
    public readonly category: string //id category
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, available, price, description, user, category } = object;

    if (!name) return ["Missing name"];
    if (!price) return ["Missing price"];
    if (!user) return ["Missing user"];
    if (!Validators.isMongoId(user)) return [`Invalid user `];
    if (!category) return ["Missing category"];
    if (!Validators.isMongoId(category)) return ["Invalid category id"];

    return [
      undefined,
      new CreateProductDto(
        name,
        !!available,
        price,
        description,
        user,
        category
      ),
    ];
  }
}
