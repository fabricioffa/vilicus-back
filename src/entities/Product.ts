import { getDateFromString } from '~/utils.js';
// entities/Product.js
import type {ProductTable, UnitsUnion} from '~/db/types.js'

class Product {
  public readonly id?: number;
  public readonly name: string;
  public readonly unit: UnitsUnion;
  public readonly avaiable: boolean;
  public readonly categoryId: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor({id, name, unit, avaiable, category_id, created_at, updated_at}: ProductTable) {
    this.id = id;
    this.name = name;
    this.unit = unit;
    this.avaiable = avaiable;
    this.categoryId = category_id;
    this.createdAt = getDateFromString(created_at);
    this.updatedAt = getDateFromString(updated_at);
  }
}

export type ProductEntity = InstanceType<typeof Product>;

export default Product;
