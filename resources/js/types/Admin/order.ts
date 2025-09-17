import { Table } from "./table"

export type Order = {
    'id': number,
    'table_id': number,
    'table'?: Table[],
    'status': string,
    'subtotal_cents': number,
    'service_charge_cents': number,
    'tax_cents': number,
    'total_cents': string,
    'customer_name': string
    'customer_phone': string,
    'payment_status': string
    'meta': string
}