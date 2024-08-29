// repositories/PurchaseRepository.js
import { DB } from '~/db/index.js';
import Purchase, { PurchaseEntity } from '~/entities/Purchase.js';
import { IBaseRepository } from '~/types.js';

class PurchaseRepository implements IBaseRepository<PurchaseEntity> {
  public readonly db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  getAll() {
    return {} as [PurchaseEntity];
    // const rows = await this.db.exec('SELECT * FROM product');
    // return rows.map(row => new Purchase(row.id, row.name, row.unit, row.available, row.purchaseId, row.createdAt, row.updatedAt));
  }

  getById(id: number) {
    // const row = await this.db.get('SELECT * FROM product WHERE id = ?', [id]);
    // if (row) {
    // return new Purchase(row.id, row.name, row.unit, row.available, row.purchaseId, row.createdAt, row.updatedAt);
    // }
    // return null;
    return {} as PurchaseEntity;
  }

  save(purchase: Purchase) {
    // const { name, unit, available, purchaseId } = product;
    // const result = await this.db.run('INSERT INTO product (name, unit, available, purchaseId) VALUES (?, ?, ?, ?)', [name, unit, available, purchaseId]);
    // product.id = result.lastID;
    // return product;
    return {} as PurchaseEntity;
  }

  delete(id: number) {}

  update(purchase: Purchase) {
    return {} as PurchaseEntity;
  }

  // Add other methods as needed (update, delete, etc.)
}
export type TPurchaseRepository = InstanceType<typeof PurchaseRepository>;
export default PurchaseRepository;
