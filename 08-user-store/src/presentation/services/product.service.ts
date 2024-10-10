import { ProductModel } from "../../data";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";

export class ProductService {
  constructor() {}
  async createProduct(createProductDto: CreateProductDto) {
    const productExists = await ProductModel.findOne({
      name: createProductDto.name,
    });
    if (productExists) throw CustomError.badRequest("Product already exists");

    try {
      
      const product = new ProductModel(createProductDto);
      await product.save();

      return product;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      // const categories = await ProductModel.find()
      // .skip((page-1) * limit)
      // .limit(limit)
      // const total = await ProductModel.countDocuments()

      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
        //todo: populate
      ]);

      return {
        page,
        limit,
        total,
        // se puede agregar más datos como la página siguiente o la página previa
        products: products,
      };
    } catch (error) {
      throw CustomError.internalServer("Internal Server Error");
    }
  }
}
