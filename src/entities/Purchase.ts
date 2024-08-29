import { getDateFromString } from '~/utils.js';
import type { PaymentFormsUnion, PurchaseTable as PurchaseTable } from '~/db/types.js';

class Purchase {
  public readonly id: number;
  public readonly value: number;
  public readonly discount: number;
  public readonly store: string;
  public readonly brand: string;
  public readonly paymentForm: PaymentFormsUnion;
  public readonly invoiceId: string;
  public readonly quantity: number;
  public readonly priority: number;
  public readonly expirationDate: string;
  public readonly productId: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor({
    id,
    value,
    discount,
    store,
    brand,
    payment_form,
    invoice_id,
    quantity,
    priority,
    expiration_date,
    product_id,
    created_at,
    updated_at,
  }: PurchaseTable) {
    this.id = id;
    this.value = value;
    this.discount = discount;
    this.store = store;
    this.brand = brand;
    this.paymentForm = payment_form;
    this.invoiceId = invoice_id;
    this.quantity = quantity;
    this.priority = priority;
    this.expirationDate = expiration_date;
    this.productId = product_id;
    this.createdAt = getDateFromString(created_at);
    this.updatedAt = getDateFromString(updated_at);
  }
}

export type PurchaseEntity = InstanceType<typeof Purchase>;
export default Purchase;
