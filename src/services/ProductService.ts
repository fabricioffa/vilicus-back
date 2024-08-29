import type { TProductRepository } from "~/repositories/sqlite/ProductRepository.js";

class ProductService {
  public readonly productRepository: TProductRepository;
  
  constructor(productRepository: TProductRepository) {
    this.productRepository = productRepository;
  }

  async getAllProducts() {
    return this.productRepository.getAll();
  }

  async getProductById(id: number) {
    return this.productRepository.getById(id);
  }

  async createProduct() {
    // const product = new Product(null, productData.name, productData.unit, productData.available, productData.categoryId, new Date(), new Date());
    // return this.productRepository.save(product);
  }

  // Add other business logic methods as needed
}

export default ProductService;
