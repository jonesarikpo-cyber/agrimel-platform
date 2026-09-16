import { supabase } from './supabase'

export type LiveCommerceSnapshot={revenue:number;orders:number;readyOrders:number;customers:number;pendingApprovals:number;products:number;agentRuns:number;latestOrder:any|null}
export type LiveOrder={order_number:string;amount:number;currency:string;status:string;fulfilment_status:string;source:string;created_at:string}
export type LiveCustomer={full_name:string|null;organization:string|null;country:string|null;lifecycle_stage:string;created_at:string}
export type LiveApproval={id:string;approval_type:string;title:string;recommendation:string|null;risk:string;status:string;due_at:string|null}

export async function getLiveCommerceSnapshot():Promise<LiveCommerceSnapshot>{
 if(!supabase)throw new Error('Supabase is not configured')
 const [ordersResult,approvalsResult,productsResult,agentRunsResult,customersResult]=await Promise.all([
  supabase.from('orders').select('order_number,amount,currency,status,fulfilment_status,is_demo,created_at').eq('is_demo',false).order('created_at',{ascending:false}),
  supabase.from('approval_requests').select('id',{count:'exact',head:true}).eq('status','pending'),
  supabase.from('products').select('id',{count:'exact',head:true}),
  supabase.from('agent_runs').select('id',{count:'exact',head:true}),
  supabase.from('customers').select('id',{count:'exact',head:true}).eq('is_demo',false)
 ])
 for(const r of [ordersResult,approvalsResult,productsResult,agentRunsResult,customersResult])if(r.error)throw r.error
 const paid=(ordersResult.data??[]).filter((o:any)=>o.status==='paid')
 return {revenue:paid.filter((o:any)=>o.currency==='NGN').reduce((s:number,o:any)=>s+Number(o.amount||0),0),orders:paid.length,readyOrders:(ordersResult.data??[]).filter((o:any)=>o.fulfilment_status==='ready').length,customers:customersResult.count??0,pendingApprovals:approvalsResult.count??0,products:productsResult.count??0,agentRuns:agentRunsResult.count??0,latestOrder:(ordersResult.data??[])[0]??null}
}
export async function getLiveOrders():Promise<LiveOrder[]>{if(!supabase)return[];const{data,error}=await supabase.from('orders').select('order_number,amount,currency,status,fulfilment_status,source,created_at').eq('is_demo',false).order('created_at',{ascending:false}).limit(50);if(error)throw error;return(data??[]) as LiveOrder[]}
export async function getLiveCustomers():Promise<LiveCustomer[]>{if(!supabase)return[];const{data,error}=await supabase.from('customers').select('full_name,organization,country,lifecycle_stage,created_at').eq('is_demo',false).order('created_at',{ascending:false}).limit(50);if(error)throw error;return(data??[]) as LiveCustomer[]}
export async function getLiveApprovals():Promise<LiveApproval[]>{if(!supabase)return[];const{data,error}=await supabase.from('approval_requests').select('id,approval_type,title,recommendation,risk,status,due_at').order('created_at',{ascending:false});if(error)throw error;return(data??[]) as LiveApproval[]}
export async function decideApproval(id:string,decision:'approved'|'rejected'|'changes_requested',note?:string){if(!supabase)throw new Error('Supabase is not configured');const{data:{user}}=await supabase.auth.getUser();if(!user)throw new Error('Authentication required');const{error}=await supabase.from('approval_requests').update({status:decision,decided_by:user.id,decided_at:new Date().toISOString(),decision_note:note??null}).eq('id',id);if(error)throw error}
export async function signInWithEmail(email:string,password:string){if(!supabase)throw new Error('Supabase is not configured');return supabase.auth.signInWithPassword({email,password})}
export async function signOut(){if(!supabase)return;await supabase.auth.signOut()}
