// repositories/ProductRepository.js
import { DB } from '~/db/index.js';
import Product, { ProductEntity } from '~/entities/Product.js';
import { IBaseRepository } from '~/types.js';

class ProductRepository implements IBaseRepository<ProductEntity> {
  public readonly db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  getAll() {
    return {} as [ProductEntity];
    // const rows = await this.db.exec('SELECT * FROM product');
    // return rows.map(row => new Product(row.id, row.name, row.unit, row.available, row.categoryId, row.createdAt, row.updatedAt));
  }

  getById(id: number) {
    // const row = await this.db.get('SELECT * FROM product WHERE id = ?', [id]);
    // if (row) {
    // return new Product(row.id, row.name, row.unit, row.available, row.categoryId, row.createdAt, row.updatedAt);
    // }
    // return null;
    return {} as ProductEntity;
  }

  save(product: Product) {
    // const { name, unit, available, categoryId } = product;
    // const result = await this.db.run('INSERT INTO product (name, unit, available, categoryId) VALUES (?, ?, ?, ?)', [name, unit, available, categoryId]);
    // product.id = result.lastID;
    // return product;
    return {} as ProductEntity;
  }

  delete(id: number) {}

  update(product: Product) {
    return {} as ProductEntity;
  }

  // Add other methods as needed (update, delete, etc.)
}
export type TProductRepository = InstanceType<typeof ProductRepository>;
export default ProductRepository;
