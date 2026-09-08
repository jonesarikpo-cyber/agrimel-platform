export const products=[
{code:'001',name:'Agricultural Project KPI & Indicator Management Toolkit',category:'MEL Toolkit',price:149,status:'Ready for QA',version:'v1.1'},
{code:'002',name:'Farmer & Beneficiary Management Toolkit',category:'Field Operations',price:129,status:'In build',version:'v0.1'},
{code:'003',name:'Farm Performance & Profitability Toolkit',category:'Agribusiness Finance',price:179,status:'In build',version:'v0.1'},
{code:'FLAG',name:'Agribusiness MEL Operating System',category:'Flagship Bundle',price:899,status:'Planned',version:'Roadmap'}]
export const orders=[
{id:'DEMO-1041',customer:'Daniel Otieno',product:'Agribusiness MEL Operating System',amount:899,status:'Paid',source:'LinkedIn',country:'Kenya'},
{id:'DEMO-1040',customer:'Amina Yusuf',product:'Farmer & Beneficiary Management Toolkit',amount:129,status:'Paid',source:'Organic search',country:'Nigeria'},
{id:'DEMO-1039',customer:'John Mwangi',product:'Farm Performance & Profitability Toolkit',amount:179,status:'Pending',source:'Email',country:'Kenya'}]
export const customers=[
{name:'Amina Yusuf',org:'Sahel Agri Trust',country:'Nigeria',type:'NGO',stage:'Customer',ltv:1278},
{name:'Daniel Otieno',org:'Rift Valley Cooperative',country:'Kenya',type:'Agribusiness',stage:'Champion',ltv:2148},
{name:'Grace Mensah',org:'Ministry of Food & Agriculture',country:'Ghana',type:'Government',stage:'Nurturing',ltv:0},
{name:'Peter Banda',org:'AgriLead Consulting',country:'Zambia',type:'Consultant',stage:'Customer',ltv:328}]
export const approvalsSeed=[
{id:'APR-114',title:'Launch Climate-Smart Agriculture MEL Add-on',category:'New product',risk:'Medium',impact:'+US$6,200 projected / 90 days',recommendation:'Approve a controlled pilot launch after QA.',evidence:'Market demand + customer requests',deadline:'9 Sep'},
{id:'APR-113',title:'LinkedIn paid campaign for flagship MEL OS',category:'Paid media',risk:'Medium',impact:'US$750 spend',recommendation:'Hold until live product funnel has first organic conversion.',evidence:'Organic LinkedIn conversion signal',deadline:'10 Sep'},
{id:'APR-112',title:'Refund above policy threshold',category:'Refund',risk:'Low',impact:'-US$149',recommendation:'Approve where customer has not downloaded the product.',evidence:'Support case + download log',deadline:'Today'}]
export const agentJobs=[
{job:'Daily business briefing',trigger:'06:00 daily',level:'L1',status:'Configured'},
{job:'Weekly market scan',trigger:'Monday 07:00',level:'L1',status:'Configured'},
{job:'Content generation',trigger:'Tue/Thu 09:00',level:'L1',status:'Configured'},
{job:'Support triage',trigger:'On ticket',level:'L1',status:'Configured'},
{job:'Abandoned cart recovery',trigger:'2h after abandon',level:'L2',status:'Configured'},
{job:'Sales anomaly detection',trigger:'Hourly',level:'L1',status:'Configured'},
{job:'Product opportunity scoring',trigger:'Friday',level:'L3',status:'Configured'},
{job:'Approval escalation',trigger:'On consequential action',level:'L3',status:'Configured'},
{job:'Monthly business review',trigger:'1st of month',level:'L1',status:'Configured'}]
export const campaigns=[
{name:'MEL OS launch sequence',channel:'Email',status:'Draft',metric:'4-email nurture'},
{name:'LinkedIn thought leadership',channel:'LinkedIn',status:'Ready',metric:'12 posts queued'},
{name:'Abandoned cart recovery',channel:'Email',status:'Configured',metric:'3-step recovery'},
{name:'Lead magnet funnel',channel:'Web + Email',status:'In build',metric:'10 Essential Agribusiness KPIs'}]
export const content=[
{title:'Five KPIs every agricultural project should track',type:'Article',channel:'Blog',stage:'Draft'},
{title:'How to design a beneficiary register that survives an audit',type:'Article',channel:'Blog',stage:'Needs review'},
{title:'Gross margin per hectare explained',type:'Short post',channel:'LinkedIn',stage:'Ready'},
{title:'AGRIMEL toolkit onboarding email 1',type:'Email',channel:'Email',stage:'Draft'}]
