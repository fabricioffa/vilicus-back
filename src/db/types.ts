import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

enum Units {
  UNIT = 'UNIT',
  ML = 'ML',
  L = 'L',
  KG = 'KG',
  G = 'G',
}

enum PaymentForms {
  CREDIT_CARD = 'CREDIT_CARD',
  MONEY = 'MONEY',
  PIX = 'PIX',
}

type UnitStrings = `${Units}`;
type PaymentFormsStrings = `${PaymentForms}`;

export interface Database {
  product: ProductTable;
  category: CategoryTable;
  purchase: PurchaseTable;
}

//`ColumnType<SelectType, InsertType, UpdateType>`
export interface ProductTable {
  id: Generated<number>;
  name: string;
  description: string;
  unit: UnitStrings;
  avaiable: Boolean;
  category_id: number;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, string | undefined>;
}

export type Person = Selectable<ProductTable>;
export type NewPerson = Insertable<ProductTable>;
export type PersonUpdate = Updateable<ProductTable>;

export interface CategoryTable {
  id: Generated<number>;
  name: string;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, string | undefined>;
}

export type Category = Selectable<CategoryTable>;
export type NewCategory = Insertable<CategoryTable>;
export type CategoryUpdate = Updateable<CategoryTable>;

export interface PurchaseTable {
  id: Generated<number>;
  value: number;
  discount: number;
  store: string;
  brand: string;
  paymentForm: PaymentFormsStrings;
  invoiceId: string;
  quantity: number;
  priority: number;
  expirationDate: ColumnType<Date, string | undefined, string | undefined>;
  product_id: number;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, string | undefined>;
}

export type Purchase = Selectable<PurchaseTable>;
export type NewPurchase = Insertable<PurchaseTable>;
export type PurchaseUpdate = Updateable<PurchaseTable>;
