import { Kysely, sql } from 'kysely';
import { Database } from '~/db/types.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('product')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('name', 'varchar(100)', (col) => col.notNull())
    .addColumn('unit', sql`ENUM('UNIT', 'ML', 'L', 'KG', 'G')`, (col) => col.notNull())
    .addColumn('avaiable', 'boolean', (col) => col.notNull())
    .addColumn('category_id', 'integer', (col) => col.references('category.id').onDelete('cascade').notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP()`).notNull())
    .execute();

  await db.schema
    .createTable('category')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('name', 'varchar(100)', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP()`).notNull())
    .execute();

  await db.schema
    .createTable('purchase')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('value', sql`decimal(7,2)`, (col) => col.notNull())
    .addColumn('discount', sql`decimal(7,2)`, (col) => col.notNull().defaultTo(0))
    .addColumn('store', 'varchar(100)', (col) => col.notNull())
    .addColumn('brand', 'varchar(100)', (col) => col.notNull())
    .addColumn('paymentForm', sql`ENUM('CREDIT_CARD', 'MONEY', 'PIX')`, (col) => col.notNull())
    .addColumn('invoiceId', 'varchar(200)')
    .addColumn('quantity', sql`decimal(7,2)`, (col) => col.notNull())
    .addColumn('priority', 'int2', (col) => col.notNull())
    .addColumn('expirationDate', 'date', (col) => col.notNull())
    .addColumn('product_id', 'integer', (col) => col.references('product.id').onDelete('cascade').notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP()`).notNull())
    .execute();

  await db.schema.createIndex('category_id_index').on('category').column('id').execute();
  await db.schema.createIndex('product_category_id_index').on('product').column('category_id').execute();
  await db.schema.createIndex('purchase_product_id_index').on('purchase').column('product_id').execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('purchase').ifExists().execute();
  await db.schema.dropTable('category').ifExists().execute();
  await db.schema.dropTable('product').ifExists().execute();
}
