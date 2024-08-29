export enum Unit {
  UNIT = 'UNIT',
  ML = 'ML',
  L = 'L',
  KG = 'KG',
  G = 'G',
}

export enum PaymentForms {
  CREDIT_CARD = 'CREDIT_CARD',
  MONEY = 'MONEY',
  PIX = 'PIX',
}

export type UnitsUnion = `${Unit}`;
export type PaymentFormsUnion = `${PaymentForms}`;

export type Database = {
  product: ProductTable;
  category: CategoryTable;
  purchase: PurchaseTable;
}

export type ProductTable = {
  id: number;
  name: string;
  description: string;
  unit: UnitsUnion;
  avaiable: boolean;
  category_id: number;
  created_at: string;
  updated_at: string;
}

export type CategoryTable = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export type PurchaseTable = {
  id: number;
  value: number;
  discount: number;
  store: string;
  brand: string;
  payment_form: PaymentFormsUnion;
  invoice_id: string;
  quantity: number;
  priority: number;
  expiration_date: string;
  product_id: number;
  created_at: string;
  updated_at: string;
}
