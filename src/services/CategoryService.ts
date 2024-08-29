import Category from "~/entities/Category.js";
import type { TCategoryRepository } from "~/repositories/sqlite/CategoryRepository.js";

class CategoryService {
  public readonly productRepository: TCategoryRepository;
  
  constructor(productRepository: TCategoryRepository) {
    this.productRepository = productRepository;
  }

  async getAllCategorys() {
    return this.productRepository.getAll();
  }

  async getCategoryById(id: number) {
    return this.productRepository.getById(id);
  }

  async createCategory(data: any) {
    // const category = new Category()
  }

  // Add other business logic methods as needed
}

export default CategoryService;
