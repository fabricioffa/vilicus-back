import { getDateFromString } from '~/utils.js';
// entities/Product.js
import type { CategoryTable as CategoryTable } from '~/db/types.js';
import { z } from 'zod';

const categorySchema = z.object({
  id: z.coerce.number().positive().nullish(),
  name: z.string().trim().min(2).max(100),
  createdAt: z.coerce.date().nullish(),
  updatedAt: z.coerce.date().nullish(),
});

class Category {
  public readonly id?: number;
  public readonly name: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor({ id, name, created_at, updated_at }: CategoryTable) {
    const result = this.validate({ id, name, created_at, updated_at })
    if (!result.success) {
      throw new Error('Data passed to Category is invalid: ' + result.error.errors.toString())
    }
    this.id = id;
    this.name = name;
    this.createdAt = getDateFromString(created_at);
    this.updatedAt = getDateFromString(updated_at);
  }

  public validate(category: CategoryTable) {
    return categorySchema.safeParse(category)
  }
}

export type CategoryEntity = InstanceType<typeof Category>;
export default Category;
