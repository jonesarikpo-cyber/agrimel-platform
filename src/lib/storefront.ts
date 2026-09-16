import { supabase } from './supabase'

export type StoreProduct = {
  id: string
  sku: string
  name: string
  family: string | null
  description: string | null
  price: number
  currency: string
  version: string
  licence_type: string
}

export async function getStoreProducts(): Promise<StoreProduct[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('products')
    .select('id,sku,name,family,description,price,currency,version,licence_type')
    .eq('status', 'active')
    .eq('is_demo', false)
    .order('price')
  if (error) throw error
  return (data ?? []).map(p => ({ ...p, price: Number(p.price) }))
}

export async function registerCustomer(input: { email: string; fullName?: string; organization?: string; country?: string }) {
  if (!supabase) throw new Error('Storefront backend is not configured')
  const { data, error } = await supabase
    .from('customers')
    .upsert({
      email: input.email.trim().toLowerCase(),
      full_name: input.fullName || null,
      organization: input.organization || null,
      country: input.country || null,
      lifecycle_stage: 'buyer',
      is_demo: false,
    }, { onConflict: 'email' })
    .select('id,email')
    .single()
  if (error) throw error
  return data
}

export async function createTestOrder(customerId: string, product: StoreProduct) {
  if (!supabase) throw new Error('Storefront backend is not configured')
  const orderNumber = `AGR-${Date.now()}`
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      customer_id: customerId,
      amount: product.price,
      currency: product.currency,
      status: 'pending',
      fulfilment_status: 'pending',
      source: 'storefront',
      provider: 'paystack_test',
      is_demo: false,
    })
    .select('id,order_number,status')
    .single()
  if (orderError) throw orderError

  const { error: itemError } = await supabase.from('order_items').insert({
    order_id: order.id,
    product_id: product.id,
    quantity: 1,
    unit_price: product.price,
  })
  if (itemError) throw itemError
  return order
}

export async function getFulfilmentStatus(orderNumber: string) {
  if (!supabase) throw new Error('Storefront backend is not configured')
  const { data, error } = await supabase
    .from('orders')
    .select('order_number,status,fulfilment_status,provider')
    .eq('order_number', orderNumber)
    .single()
  if (error) throw error
  return data
}
