import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from 'kysely'

export interface Database {
  product: ProductTable
  purchases: PurchasesTable
}

export interface ProductTable {
  id: Generated<number>
  name: string
  description: string
  //`ColumnType<SelectType, InsertType, UpdateType>`
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, string | undefined>
}

export type Person = Selectable<ProductTable>
export type NewPerson = Insertable<ProductTable>
export type PersonUpdate = Updateable<ProductTable>


export interface PurchasesTable {
  id: Generated<number>
  first_name: string
  gender: 'man' | 'woman' | 'other'
  last_name: string | null
  //`ColumnType<SelectType, InsertType, UpdateType>`
  created_at: ColumnType<Date, string | undefined, never>
}