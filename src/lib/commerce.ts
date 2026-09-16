import { supabase } from './supabase'

export type LiveCommerceSnapshot = {
  revenue: number
  orders: number
  pendingApprovals: number
  products: number
  agentRuns: number
}

export async function getLiveCommerceSnapshot(): Promise<LiveCommerceSnapshot> {
  if (!supabase) return { revenue: 0, orders: 0, pendingApprovals: 0, products: 0, agentRuns: 0 }

  const [ordersResult, approvalsResult, productsResult, agentRunsResult] = await Promise.all([
    supabase.from('orders').select('amount,status,is_demo'),
    supabase.from('approval_requests').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('agent_runs').select('id', { count: 'exact', head: true }),
  ])

  if (ordersResult.error) throw ordersResult.error
  if (approvalsResult.error) throw approvalsResult.error
  if (productsResult.error) throw productsResult.error
  if (agentRunsResult.error) throw agentRunsResult.error

  const livePaidOrders = (ordersResult.data ?? []).filter(order => order.status === 'paid' && !order.is_demo)
  const revenue = livePaidOrders.reduce((sum, order) => sum + Number(order.amount ?? 0), 0)

  return {
    revenue,
    orders: livePaidOrders.length,
    pendingApprovals: approvalsResult.count ?? 0,
    products: productsResult.count ?? 0,
    agentRuns: agentRunsResult.count ?? 0,
  }
}

export async function decideApproval(
  id: string,
  decision: 'approved' | 'rejected' | 'changes_requested',
  note?: string,
) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Authentication required')

  const { error } = await supabase
    .from('approval_requests')
    .update({
      status: decision,
      decided_by: user.id,
      decided_at: new Date().toISOString(),
      decision_note: note ?? null,
    })
    .eq('id', id)

  if (error) throw error
}

export async function signInWithEmail(email: string, password: string) {
  if (!supabase) throw new Error('Supabase is not configured')
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  if (!supabase) return
  await supabase.auth.signOut()
}
