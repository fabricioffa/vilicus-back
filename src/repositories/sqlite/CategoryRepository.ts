// repositories/CategoryRepository.js
import { db, DB } from '~/db/index.js';
import Category, { CategoryEntity } from '~/entities/Category.js';
import { IBaseRepository } from '~/types.js';

class CategoryRepository implements IBaseRepository<CategoryEntity> {
  public readonly db: DB;

  constructor(db: DB) {
    this.db = db;
  }

   getAll() {
    return {} as [CategoryEntity];
    // const rows = await this.db.exec('SELECT * FROM product');
    // return rows.map(row => new Category(row.id, row.name, row.unit, row.available, row.categoryId, row.createdAt, row.updatedAt));
  }

   getById(id: number) {
    // const row = await this.db.get('SELECT * FROM product WHERE id = ?', [id]);
    // if (row) {
    // return new Category(row.id, row.name, row.unit, row.available, row.categoryId, row.createdAt, row.updatedAt);
    // }
    // return null;
    return {} as CategoryEntity;
  }

  save (category: CategoryEntity) {
    const insert = db.prepare<CategoryEntity>('INSERT INTO category (name) VALUES (@name)');
    const result = insert.run(category)
    console.log('%c result', 'color: green', result)
    return {} as CategoryEntity;
  }

   delete(id: number) {}

   update(category: CategoryEntity) {
    return {} as CategoryEntity;
  }

  // Add other methods as needed (update, delete, etc.)
}
export type TCategoryRepository = InstanceType<typeof CategoryRepository>;
export default CategoryRepository;
