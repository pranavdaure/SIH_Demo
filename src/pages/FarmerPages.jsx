import { useEffect, useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowRight, BadgeCheck, Building2, CalendarDays, CheckCircle2, ChevronRight, CircleDollarSign, Clock3, Copy, FileCheck2, Handshake, Warehouse, Info, Lightbulb, MapPin, Package, PackageCheck, Plus, Route, Send, ShieldCheck, Sparkles, Star, Store, TrendingDown, TrendingUp, Truck, WalletCards, XCircle } from 'lucide-react'
import { buyers, farmer, logistics, marketPrices, marketSnapshot, matchingFactors, priceTrend } from '../data/mockData'
import { Button, Card, EmptyState, Metric, ScoreRing, SectionHeading, StatCard, StatusBadge } from '../components/ui'

const rupee = value => `₹${new Intl.NumberFormat('en-IN').format(value)}`
const buyer = buyers[0]

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const amount = payload.find(p => p.value !== null)?.value
  return <div className="rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-lg"><p className="text-[10px] font-bold text-slate-400">{label}</p><p className="text-sm font-extrabold text-forest-700">₹{amount}/kg</p></div>
}

export function PriceTrendChart({ market = false }) {
  return <div className="h-[245px] w-full"><ResponsiveContainer width="100%" height="100%"><LineChart data={priceTrend} margin={{ top: 8, right: 5, bottom: 0, left: -24 }}><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#24955d" stopOpacity={.18} /><stop offset="100%" stopColor="#24955d" stopOpacity={0} /></linearGradient></defs>{market && <CartesianGrid vertical={false} stroke="#edf2ee" strokeDasharray="3 3" />}<XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dy={8} /><YAxis domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={v => `₹${v}`} /><Tooltip content={<ChartTooltip />} cursor={{ stroke: '#bbdcca', strokeWidth: 1 }} />{market ? <><Area type="monotone" dataKey="price" stroke="#18794e" fill="url(#chartFill)" strokeWidth={3} connectNulls={false} /><Line type="monotone" dataKey="forecast" stroke="#82bf99" strokeWidth={3} strokeDasharray="6 5" dot={{ r: 3, fill: '#82bf99', strokeWidth: 0 }} /></> : <><Line type="monotone" dataKey="price" stroke="#18794e" strokeWidth={3} dot={{ r: 3, fill: '#18794e', strokeWidth: 0 }} activeDot={{ r: 5 }} /><Line type="monotone" dataKey="forecast" stroke="#72b88d" strokeWidth={3} strokeDasharray="6 5" dot={{ r: 3, fill: '#72b88d', strokeWidth: 0 }} /></>}</LineChart></ResponsiveContainer></div>
}

function PriceSnapshotCard({ item }) {
  const isUp = item.direction === 'up'
  return <Card className="p-4"><div className="flex items-start justify-between"><span className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.tone === 'emerald' ? 'bg-forest-50 text-forest-600' : item.tone === 'orange' ? 'bg-orange-50 text-orange-500' : 'bg-amber-50 text-amber-600'}`}><Store size={18} /></span><span className={`flex items-center gap-0.5 text-xs font-extrabold ${isUp ? 'text-emerald-600' : 'text-rose-500'}`}>{isUp ? <TrendingUp size={15} /> : <TrendingDown size={15} />} {item.change}%</span></div><p className="mt-4 font-extrabold text-ink">{item.crop}</p><p className="mt-0.5 text-xl font-extrabold tracking-tight text-forest-700">₹{item.price}<span className="text-xs text-slate-400">/kg</span></p><p className="mt-1 text-xs font-medium text-slate-400">{item.mandi}</p></Card>
}

export function BuyerCard({ item, onView, compact = false }) {
  return <Card className={`relative overflow-hidden ${compact ? 'p-4' : 'p-5'}`}><div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[70px] bg-forest-50" /><div className="relative flex gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#143f2c] text-sm font-extrabold text-white">{item.shortName.split(' ').map(x => x[0]).join('').slice(0, 2)}</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate font-extrabold text-ink">{item.shortName}</h3>{item.verified && <BadgeCheck size={16} className="text-forest-600" />}</div><p className="mt-0.5 text-xs text-slate-400"><MapPin size={12} className="mr-1 inline" />{item.city} · {item.distance} km</p></div><ScoreRing value={item.match} size={compact ? 53 : 61} /></div><div className="relative mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4"><Metric label="Offer price" value={`₹${item.price}/kg`} valueClass="text-forest-700" /><Metric label="Requirement" value={`${new Intl.NumberFormat('en-IN').format(item.quantity)} kg`} /></div>{onView && <Button onClick={onView} variant={compact ? 'ghost' : 'secondary'} className={`relative mt-4 ${compact ? 'w-full py-1.5 text-xs text-forest-700' : 'w-full py-2'}`}>View Details <ChevronRight size={16} /></Button>}</Card>
}

export function FarmerDashboard({ navigate }) {
  return <div className="page-enter">
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-slate-500"><MapPin size={15} className="mr-1 inline text-forest-600" />{farmer.location}</p><h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink">Good morning Ramesh <span className="inline-block">👋</span></h1><p className="mt-1 text-sm text-slate-500">Here’s what is happening with your crops today.</p></div><Button onClick={() => navigate('lots')} icon={Plus}>Create crop lot</Button></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard icon={Package} label="Active Lots" value="2" note="1 buyer response pending" /><StatCard icon={Building2} label="Potential Buyers" value="12" note="+3 since yesterday" tone="blue" /><StatCard icon={TrendingUp} label="Best Current Price" value="₹29/kg" note="Mumbai market" tone="amber" /><StatCard icon={WalletCards} label="Expected Earnings" value="₹1,37,000" note="After estimated logistics" tone="violet" /></div>
    <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(330px,.9fr)]"><div className="space-y-6"><section><SectionHeading title="Market Snapshot" description="Today’s modal prices across your watched crops" action={<button onClick={() => navigate('market')} className="text-sm font-extrabold text-forest-700 hover:text-forest-800">View market intelligence →</button>} /><div className="grid gap-4 sm:grid-cols-3">{marketSnapshot.map(item => <PriceSnapshotCard item={item} key={item.crop} />)}</div></section><Card className="p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-extrabold text-ink">Onion Price Trend</h2><p className="mt-1 text-sm text-slate-500">Nashik Mandi · Last 7 days + forecast</p></div><StatusBadge type="increasing"><TrendingUp size={13} />4.3% this week</StatusBadge></div><div className="mt-5"><PriceTrendChart /></div><div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500"><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-forest-600" />Actual price</span><span className="flex items-center gap-1.5"><i className="h-[2px] w-4 bg-[#72b88d]" />Expected trend</span><span className="ml-auto font-bold text-forest-700">Current: ₹25/kg</span></div></Card></div>
      <aside className="space-y-6"><Card className="overflow-hidden border-forest-100 bg-gradient-to-br from-forest-50 via-white to-white p-0"><div className="border-b border-forest-100 p-5"><div className="flex items-center gap-2"><span className="rounded-lg bg-forest-600 p-2 text-white"><Sparkles size={16} /></span><div><h2 className="font-extrabold text-ink">AI Market Recommendation</h2><p className="text-xs text-slate-500">For your Grade A onions</p></div></div></div><div className="p-5"><div className="grid grid-cols-2 gap-3"><div className="rounded-xl bg-white p-3 shadow-sm"><p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Current price</p><p className="mt-1 text-lg font-extrabold text-ink">₹25<span className="text-xs text-slate-400">/kg</span></p></div><div className="rounded-xl bg-white p-3 shadow-sm"><p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Expected range</p><p className="mt-1 text-lg font-extrabold text-forest-700">₹27–₹29</p></div></div><div className="mt-4 rounded-xl border border-forest-100 bg-white/70 p-3"><p className="flex items-center gap-2 text-xs font-bold text-emerald-700"><TrendingUp size={15} />Trend: Increasing</p><p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">Consider waiting 1–2 days if storage is available.</p></div><p className="mt-4 flex gap-1.5 text-[11px] leading-relaxed text-slate-400"><Info size={14} className="shrink-0" />Prediction is an estimate based on sample market data.</p></div></Card><section><SectionHeading title="Top Buyer Opportunities" action={<button onClick={() => navigate('matching')} className="text-xs font-extrabold text-forest-700">See all matches →</button>} /><div className="space-y-3">{buyers.map(item => <BuyerCard key={item.id} item={item} compact onView={() => navigate('buyer-details')} />)}</div></section></aside></div>
  </div>
}

export function MarketIntelligence({ navigate }) {
  return <div className="page-enter"><SectionHeading eyebrow="Price discovery" title="Market Intelligence" description="Compare prices, transport and realistic net returns before you sell." action={<Button variant="secondary" onClick={() => navigate('lots')} icon={Plus}>Create lot</Button>} /><Card className="mb-6 p-4"><div className="grid gap-3 sm:grid-cols-3"><label><span className="label">Crop</span><select className="input"><option>Onion</option><option>Tomato</option><option>Wheat</option></select></label><label><span className="label">Location</span><select className="input"><option>Nashik, Maharashtra</option><option>Pune, Maharashtra</option><option>Mumbai, Maharashtra</option></select></label><label><span className="label">Date</span><div className="relative"><CalendarDays size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><input className="input pl-10" value="28 August 2026" readOnly /></div></label></div></Card><div className="grid gap-6 xl:grid-cols-[1.6fr_.85fr]"><div className="space-y-6"><Card className="overflow-hidden p-0"><div className="flex items-center justify-between p-5 sm:p-6"><div><h2 className="font-extrabold text-ink">Onion price comparison</h2><p className="mt-1 text-sm text-slate-500">Modal price is the most common price traded today.</p></div><StatusBadge type="increasing"><TrendingUp size={13} />Prices rising</StatusBadge></div><div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left"><thead className="border-y border-slate-100 bg-slate-50/70 text-[10px] font-bold uppercase tracking-[.12em] text-slate-400"><tr><th className="px-6 py-3.5">Market</th><th className="px-4 py-3.5">Min</th><th className="px-4 py-3.5">Max</th><th className="px-4 py-3.5">Modal</th><th className="px-6 py-3.5">Trend</th></tr></thead><tbody>{marketPrices.map((row, index) => <tr key={row.market} className="border-b border-slate-50 last:border-0"><td className="px-6 py-4 font-extrabold text-ink"><span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-forest-50 text-forest-600"><MapPin size={14} /></span>{row.market}</td><td className="px-4 py-4 text-sm font-semibold text-slate-600">₹{row.min}</td><td className="px-4 py-4 text-sm font-semibold text-slate-600">₹{row.max}</td><td className="px-4 py-4 text-sm font-extrabold text-forest-700">₹{row.modal}/kg</td><td className="px-6 py-4"><StatusBadge type="increasing"><TrendingUp size={12} />{index === 0 ? '4.3%' : index === 1 ? '3.4%' : '4.9%'}</StatusBadge></td></tr>)}</tbody></table></div></Card><Card className="p-5 sm:p-6"><div className="flex flex-wrap justify-between gap-3"><div><h2 className="font-extrabold text-ink">Nashik onion price movement</h2><p className="mt-1 text-sm text-slate-500">Historical data with a short-term sample forecast</p></div><span className="text-sm font-extrabold text-forest-700">₹25/kg today</span></div><div className="mt-5"><PriceTrendChart market /></div></Card></div><aside className="space-y-6"><Card className="border-forest-100 bg-gradient-to-br from-forest-50 to-white p-5"><div className="flex items-center gap-2"><span className="rounded-lg bg-forest-600 p-2 text-white"><Lightbulb size={17} /></span><div><p className="text-xs font-bold uppercase tracking-[.1em] text-forest-600">Best market opportunity</p><h2 className="font-extrabold text-ink">Mumbai</h2></div></div><div className="mt-6 space-y-4"><div className="flex justify-between border-b border-forest-100 pb-3"><span className="text-sm font-semibold text-slate-500">Modal market price</span><b className="text-forest-700">₹29/kg</b></div><div className="flex justify-between border-b border-forest-100 pb-3"><span className="text-sm font-semibold text-slate-500">Estimated transport</span><b className="text-rose-600">− ₹2/kg</b></div><div className="flex justify-between"><span className="font-bold text-ink">Estimated net price</span><b className="text-xl font-extrabold text-forest-700">₹27/kg</b></div></div><p className="mt-5 rounded-xl bg-white/80 p-3 text-xs leading-relaxed text-slate-500"><Info size={14} className="mr-1 inline text-forest-600" />Mumbai has the highest price, but net return—not gross price—is what matters.</p></Card><Card className="p-5"><h3 className="font-extrabold text-ink">Quick decision guide</h3><ul className="mt-4 space-y-3 text-sm text-slate-600"><li className="flex gap-2"><CheckCircle2 size={17} className="shrink-0 text-forest-600" />Nashik: sell now with no freight</li><li className="flex gap-2"><CheckCircle2 size={17} className="shrink-0 text-forest-600" />Mumbai: higher gross, ₹27 net</li><li className="flex gap-2"><CheckCircle2 size={17} className="shrink-0 text-forest-600" />Wait 1–2 days if stored safely</li></ul></Card></aside></div></div>
}

export function CreateLot({ navigate, toast, setLotCreated, lotCreated }) {
  const [form, setForm] = useState({ crop: 'Onion', quantity: '5000', quality: 'Grade A', location: 'Nashik, Maharashtra', harvest: '2026-08-26', price: '28', available: '2026-08-29' })
  const [success, setSuccess] = useState(false)
  useEffect(() => { if (!success) return; const timer = setTimeout(() => navigate('matching'), 1250); return () => clearTimeout(timer) }, [success, navigate])
  const update = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = e => { e.preventDefault(); setLotCreated(true); setSuccess(true); toast('Lot created successfully', 'KL-ON-4582 is ready for AI buyer matching.') }
  if (success) return <div className="page-enter mx-auto max-w-xl pt-10"><Card className="border-forest-100 p-8 text-center"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-100 text-forest-700"><CheckCircle2 size={34} /></span><p className="mt-5 text-xs font-bold uppercase tracking-[.14em] text-forest-600">Lot published</p><h1 className="mt-2 text-2xl font-extrabold text-ink">Lot Created Successfully</h1><div className="mt-6 rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-[.12em] text-slate-400">Lot ID</p><p className="mt-1 font-[Manrope] text-xl font-extrabold text-forest-700">KL-ON-4582</p></div><p className="mt-5 text-sm text-slate-500">Preparing your personalised buyer matches…</p></Card></div>
  return <div className="page-enter mx-auto max-w-4xl"><SectionHeading eyebrow="Sell your produce" title="Create a Crop Lot" description="Share the essentials. We’ll match it with suitable verified buyers." /><form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_290px]"><Card className="p-5 sm:p-7"><div className="grid gap-5 sm:grid-cols-2"><label><span className="label">Crop</span><select name="crop" value={form.crop} onChange={update} className="input"><option>Onion</option><option>Tomato</option><option>Wheat</option></select></label><label><span className="label">Quantity</span><div className="relative"><input name="quantity" value={form.quantity} onChange={update} className="input pr-12" type="number" min="1" required /><span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">kg</span></div></label><label><span className="label">Quality</span><select name="quality" value={form.quality} onChange={update} className="input"><option>Grade A</option><option>Grade B</option><option>Grade C</option></select></label><label><span className="label">Location</span><select name="location" value={form.location} onChange={update} className="input"><option>Nashik, Maharashtra</option><option>Pune, Maharashtra</option><option>Mumbai, Maharashtra</option></select></label><label><span className="label">Harvest Date</span><input name="harvest" value={form.harvest} onChange={update} className="input" type="date" required /></label><label><span className="label">Expected Price</span><div className="relative"><span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">₹</span><input name="price" value={form.price} onChange={update} className="input pl-8 pr-12" type="number" min="1" required /><span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">/kg</span></div></label><label className="sm:col-span-2"><span className="label">Available From</span><input name="available" value={form.available} onChange={update} className="input" type="date" required /></label></div><div className="mt-7 flex justify-end border-t border-slate-100 pt-5"><Button type="submit" icon={Sparkles}>Find Best Buyers</Button></div></Card><aside className="space-y-4"><Card className="border-forest-100 bg-forest-50 p-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-forest-600 shadow-sm"><Sparkles size={19} /></span><h3 className="mt-4 font-extrabold text-ink">What happens next?</h3><ol className="mt-4 space-y-3 text-sm text-slate-600"><li className="flex gap-2"><b className="text-forest-700">1.</b>We score buyer fit</li><li className="flex gap-2"><b className="text-forest-700">2.</b>Compare price and distance</li><li className="flex gap-2"><b className="text-forest-700">3.</b>Show your best options</li></ol></Card><Card className="p-5"><p className="text-xs font-bold uppercase tracking-[.1em] text-slate-400">Your sample lot</p><p className="mt-2 font-extrabold text-ink">Onion · Grade A</p><p className="mt-1 text-sm text-slate-500">5,000 kg from Nashik</p><p className="mt-4 text-xs leading-relaxed text-slate-400">You can edit any detail before finding buyers.</p></Card></aside></form></div>
}

export function BuyerMatching({ navigate, lotCreated }) {
  return <div className="page-enter"><SectionHeading eyebrow="Explainable AI match" title="AI Buyer Matching" description="We analyzed your crop, quantity, quality, location, price expectation and buyer requirements." action={lotCreated && <StatusBadge type="verified"><CheckCircle2 size={13} />Lot KL-ON-4582 live</StatusBadge>} /><div className="grid gap-6 xl:grid-cols-[.8fr_1.55fr]"><Card className="p-5 sm:p-6"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-50 text-forest-600"><Sparkles size={21} /></span><div><h2 className="font-extrabold text-ink">Matching factors</h2><p className="text-xs text-slate-500">Transparent scoring for demo</p></div></div><div className="mt-6 space-y-5">{matchingFactors.map(([label, weight, score]) => <div key={label}><div className="mb-2 flex items-center justify-between text-xs"><span className="font-bold text-slate-600">{label}</span><span className="font-extrabold text-forest-700">{weight}%</span></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-forest-600" style={{ width: `${score}%` }} /></div></div>)}</div><div className="mt-7 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-500"><Info size={14} className="mr-1 inline text-forest-600" />Scores use sample data and weigh product fit more than distance alone.</div></Card><div className="space-y-6"><Card className="relative overflow-hidden border-forest-100 p-5 sm:p-7"><div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-forest-50" /><div className="relative flex flex-wrap items-start justify-between gap-5"><div className="flex gap-4"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#143f2c] text-lg font-extrabold text-white">AF</span><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-extrabold text-ink">ABC Foods Pvt. Ltd.</h2><StatusBadge type="verified"><BadgeCheck size={13} />Verified buyer</StatusBadge></div><p className="mt-1 text-sm text-slate-500"><MapPin size={14} className="mr-1 inline" />Pune, Maharashtra · 145 km away</p></div></div><div className="flex items-center gap-3"><StatusBadge type="recommended"><Sparkles size={12} />Best Match</StatusBadge><ScoreRing value={95} size={76} /></div></div><div className="relative mt-7 grid gap-3 sm:grid-cols-3"><div className="rounded-xl bg-slate-50 p-4"><p className="text-[10px] font-bold uppercase tracking-[.11em] text-slate-400">Offer</p><p className="mt-1 text-xl font-extrabold text-forest-700">₹29/kg</p><p className="mt-1 text-xs text-slate-500">₹1 above expectation</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-[10px] font-bold uppercase tracking-[.11em] text-slate-400">Requirement</p><p className="mt-1 font-extrabold text-ink">Onion · Grade A</p><p className="mt-1 text-xs text-slate-500">Up to 10,000 kg</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-[10px] font-bold uppercase tracking-[.11em] text-slate-400">Payment</p><p className="mt-1 font-extrabold text-ink">Within 3 days</p><p className="mt-1 text-xs text-slate-500">96% payment reliability</p></div></div><div className="relative mt-6 grid gap-5 border-t border-slate-100 pt-5 md:grid-cols-[1fr_auto]"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-slate-400">Why this buyer?</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{buyer.reasons.map(reason => <p key={reason} className="flex items-center gap-2 text-sm font-semibold text-slate-600"><CheckCircle2 size={16} className="shrink-0 text-forest-600" />{reason}</p>)}</div></div><Button onClick={() => navigate('buyer-details')} className="self-end" icon={ArrowRight} iconRight>View Buyer</Button></div></Card><div><div className="mb-3 flex items-center justify-between"><h2 className="font-extrabold text-ink">Other suitable buyers</h2><span className="text-xs font-semibold text-slate-400">Ranked by fit</span></div><div className="grid gap-4 md:grid-cols-2">{buyers.slice(1).map(item => <BuyerCard item={item} compact key={item.id} />)}</div></div><p className="text-center text-xs text-slate-400">AI recommendation is based on sample/demo data.</p></div></div></div>
}

export function BuyerDetails({ navigate, toast }) {
  return <div className="page-enter mx-auto max-w-5xl"><button onClick={() => navigate('matching')} className="mb-5 text-sm font-bold text-slate-500 hover:text-forest-700">← Back to AI recommendations</button><Card className="overflow-hidden p-0"><div className="border-b border-slate-100 bg-gradient-to-r from-forest-50 to-white p-6 sm:p-8"><div className="flex flex-wrap items-start justify-between gap-5"><div className="flex gap-4"><span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#143f2c] text-xl font-extrabold text-white">AF</span><div><div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-extrabold text-ink">ABC Foods Pvt. Ltd.</h1><StatusBadge type="verified"><BadgeCheck size={13} />Verified Buyer</StatusBadge></div><p className="mt-2 text-sm text-slate-500"><MapPin size={15} className="mr-1 inline" />Pune, Maharashtra</p></div></div><StatusBadge type="recommended" className="px-3 py-1.5"><Sparkles size={13} />95% AI match</StatusBadge></div><div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4"><Metric label="Rating" value="4.8/5" sub="Based on 124 trades" /><Metric label="Transactions" value="124" sub="Previous transactions" /><Metric label="Payment reliability" value="96%" sub="On-time payment score" /><Metric label="Distance" value="145 km" sub="From your lot" /></div></div><div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_330px]"><div><h2 className="font-extrabold text-ink">Current requirement</h2><div className="mt-4 rounded-2xl border border-slate-100 p-5"><div className="grid gap-5 sm:grid-cols-3"><Metric label="Crop" value="Onion" /><Metric label="Quantity" value="5,000 kg" /><Metric label="Quality" value="Grade A" /></div></div><h2 className="mt-7 font-extrabold text-ink">Offer terms</h2><div className="mt-4 grid gap-3 sm:grid-cols-3"><Card className="p-4 shadow-soft"><p className="text-xs font-bold text-slate-400">OFFER PRICE</p><p className="mt-1 text-2xl font-extrabold text-forest-700">₹29/kg</p></Card><Card className="p-4 shadow-soft"><p className="text-xs font-bold text-slate-400">DELIVERY</p><p className="mt-1 font-extrabold text-ink">Pune</p></Card><Card className="p-4 shadow-soft"><p className="text-xs font-bold text-slate-400">PAYMENT</p><p className="mt-1 font-extrabold text-ink">3 days after delivery</p></Card></div></div><aside className="rounded-2xl bg-slate-50 p-5"><p className="text-xs font-bold uppercase tracking-[.13em] text-slate-400">Potential sale value</p><p className="mt-2 text-3xl font-extrabold tracking-tight text-ink">₹1,45,000</p><p className="mt-1 text-sm text-slate-500">5,000 kg × ₹29/kg</p><div className="mt-6 space-y-3"><Button onClick={() => { toast('Offer selected', 'Review and accept the ₹29/kg offer.'); navigate('offers') }} className="w-full" icon={CheckCircle2}>Accept Offer</Button><Button onClick={() => navigate('offers')} variant="secondary" className="w-full" icon={CircleDollarSign}>Counter Offer</Button><Button onClick={() => toast('Offer declined', 'You can review other AI matches anytime.')} variant="ghost" className="w-full text-rose-600" icon={XCircle}>Reject</Button></div><p className="mt-5 text-center text-[11px] leading-relaxed text-slate-400">You’ll review the final terms before this becomes a confirmed deal.</p></aside></div></Card></div>
}

export function Offers({ navigate, toast }) {
  const [counterOpen, setCounterOpen] = useState(false); const [counter, setCounter] = useState('30')
  const accept = () => { toast('Offer accepted', 'Deal KL-D1024 has been created.'); navigate('deals') }
  return <div className="page-enter mx-auto max-w-5xl"><SectionHeading eyebrow="Active negotiation" title="Offer from ABC Foods" description="Review the offer terms before confirming your sale." /><div className="grid gap-6 lg:grid-cols-[1.45fr_.75fr]"><Card className="p-0 overflow-hidden"><div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#143f2c] font-extrabold text-white">AF</span><div><h2 className="font-extrabold text-ink">ABC Foods Pvt. Ltd.</h2><p className="text-xs text-slate-500">Verified buyer · Pune</p></div></div><StatusBadge type="verified"><BadgeCheck size={13} />Verified</StatusBadge></div><div className="grid sm:grid-cols-2"><div className="border-b border-r border-slate-100 p-5 sm:border-b-0 sm:p-6"><p className="text-xs font-bold uppercase tracking-[.12em] text-slate-400">Your asking price</p><p className="mt-2 text-3xl font-extrabold text-ink">₹28<span className="text-sm text-slate-400">/kg</span></p><p className="mt-2 text-xs font-semibold text-slate-500">Listed in lot KL-ON-4582</p></div><div className="bg-forest-50 p-5 sm:p-6"><p className="text-xs font-bold uppercase tracking-[.12em] text-forest-600">Buyer offer</p><p className="mt-2 text-3xl font-extrabold text-forest-700">₹29<span className="text-sm text-forest-600">/kg</span></p><p className="mt-2 text-xs font-bold text-emerald-700">₹1/kg above your expectation</p></div></div><div className="grid gap-4 border-t border-slate-100 p-5 sm:grid-cols-3 sm:p-6"><Metric label="Quantity" value="5,000 kg" /><Metric label="Total offer" value="₹1,45,000" valueClass="text-forest-700" /><Metric label="Payment" value="Within 3 days" /></div>{counterOpen && <div className="mx-5 mb-5 rounded-2xl border border-forest-100 bg-forest-50 p-4 sm:mx-6 sm:mb-6"><div className="flex flex-wrap items-end gap-3"><label className="flex-1"><span className="label text-forest-700">Your counter offer (₹/kg)</span><input value={counter} onChange={e => setCounter(e.target.value)} className="input" type="number" min="1" /></label><Button onClick={() => { toast('Counter offer sent', `ABC Foods will review your ₹${counter}/kg request.`); setCounterOpen(false) }} icon={Send}>Send counter</Button></div></div>}</Card><aside className="space-y-4"><Card className="p-5"><h3 className="font-extrabold text-ink">Decision summary</h3><div className="mt-4 space-y-3 text-sm"><p className="flex justify-between"><span className="text-slate-500">Buyer match</span><b className="text-forest-700">95% Best Match</b></p><p className="flex justify-between"><span className="text-slate-500">Payment reliability</span><b>96%</b></p><p className="flex justify-between"><span className="text-slate-500">Transport estimate</span><b>₹8,000</b></p><hr /><p className="flex justify-between"><span className="font-bold text-ink">Estimated net</span><b className="text-lg text-forest-700">₹1,37,000</b></p></div></Card><Button onClick={accept} className="w-full" icon={CheckCircle2}>Accept Offer</Button><Button onClick={() => setCounterOpen(!counterOpen)} variant="secondary" className="w-full" icon={CircleDollarSign}>{counterOpen ? 'Cancel counter' : 'Counter Offer'}</Button><Button onClick={() => toast('Offer kept open', 'You can return to this offer anytime.')} variant="ghost" className="w-full">Decide later</Button></aside></div></div>
}

export function DealConfirmation({ navigate }) {
  const copy = () => navigator.clipboard?.writeText('KL-D1024')
  return <div className="page-enter mx-auto max-w-3xl pt-2"><Card className="overflow-hidden p-0"><div className="bg-gradient-to-br from-[#ecfaef] to-white px-6 py-10 text-center sm:px-12"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-600 text-white shadow-lg shadow-forest-600/20"><CheckCircle2 size={34} /></span><p className="mt-5 text-xs font-bold uppercase tracking-[.14em] text-forest-600">Offer accepted</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Deal Confirmed</h1><p className="mt-2 text-sm text-slate-500">Your sale is ready to move to logistics.</p><div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-extrabold text-forest-700 shadow-sm">Deal ID: KL-D1024 <button onClick={copy} className="text-slate-400 hover:text-forest-700"><Copy size={15} /></button></div></div><div className="p-6 sm:p-8"><div className="grid gap-y-5 sm:grid-cols-2"><Metric label="Crop" value="Onion" /><Metric label="Quantity" value="5,000 kg" /><Metric label="Price" value="₹29/kg" /><Metric label="Gross Value" value="₹1,45,000" valueClass="text-forest-700" /><Metric label="Buyer" value="ABC Foods" /><Metric label="Delivery" value="Pune" /><Metric label="Payment" value="Within 3 days" /><Metric label="Status" value="Confirmed" valueClass="text-forest-700" /></div><div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between"><Button onClick={() => navigate('offers')} variant="ghost">Review offer</Button><Button onClick={() => navigate('logistics')} icon={Truck}>Continue to Logistics</Button></div></div></Card></div>
}

export function Logistics({ navigate, toast }) {
  const [selected, setSelected] = useState('truck-a'); const option = logistics.find(t => t.id === selected); const net = 145000 - option.price
  return <div className="page-enter mx-auto max-w-5xl"><SectionHeading eyebrow="Move your produce" title="Logistics" description="Choose a trusted transport option for your confirmed deal." /><div className="grid gap-6 lg:grid-cols-[1.45fr_.75fr]"><div className="space-y-4">{logistics.map(truck => <button key={truck.id} onClick={() => setSelected(truck.id)} className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition ${selected === truck.id ? 'border-forest-500 bg-forest-50 shadow-sm' : 'border-slate-200 bg-white hover:border-forest-200'}`}><span className={`flex h-11 w-11 items-center justify-center rounded-xl ${selected === truck.id ? 'bg-forest-600 text-white' : 'bg-slate-100 text-slate-500'}`}><Truck size={21} /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="font-extrabold text-ink">{truck.name}</h2>{truck.tag && <StatusBadge type="recommended">{truck.tag}</StatusBadge>}</div><p className="mt-1 text-sm text-slate-500">{truck.driver} · {truck.capacity} capacity</p></div><div className="text-right"><p className="font-extrabold text-ink">{rupee(truck.price)}</p><p className="mt-1 flex items-center justify-end gap-1 text-xs font-semibold text-slate-500"><Clock3 size={13} />ETA {truck.eta}</p></div><span className={`h-5 w-5 rounded-full border-2 ${selected === truck.id ? 'border-forest-600 bg-forest-600 shadow-[inset_0_0_0_3px_#effaf3]' : 'border-slate-300'}`} /></button>)}</div><aside><Card className="border-forest-100 p-5"><div className="flex items-center gap-2"><span className="rounded-lg bg-forest-50 p-2 text-forest-600"><Route size={18} /></span><h2 className="font-extrabold text-ink">Net realization</h2></div><div className="mt-6 space-y-4"><div className="flex justify-between text-sm"><span className="text-slate-500">Gross sale value</span><b>₹1,45,000</b></div><div className="flex justify-between text-sm"><span className="text-slate-500">Estimated logistics</span><b className="text-rose-600">− {rupee(option.price)}</b></div><div className="border-t border-slate-100 pt-4"><p className="text-xs font-bold uppercase tracking-[.12em] text-slate-400">Estimated net realization</p><p className="mt-1 text-3xl font-extrabold tracking-tight text-forest-700">{rupee(net)}</p></div></div><div className="mt-6 rounded-xl bg-forest-50 p-3 text-xs font-semibold leading-relaxed text-forest-800"><CheckCircle2 size={14} className="mr-1 inline" />Truck A is recommended: it fits your lot and offers the best net return.</div><Button onClick={() => { toast('Logistics confirmed', `${option.name} has been reserved for your pickup.`); navigate('payments') }} className="mt-6 w-full" icon={Truck}>Confirm Logistics</Button></Card></aside></div></div>
}

export function Payments({ paymentReceived, setPaymentReceived, toast }) {
  const markReceived = () => { setPaymentReceived(true); toast('Payment marked received', '₹1,37,000 received for deal KL-D1024.') }
  const timeline = [['Deal Confirmed', true, '28 Aug, 10:20 AM'], ['Produce Dispatched', true, '28 Aug, 2:15 PM'], ['Delivered', true, '28 Aug, 6:32 PM'], ['Payment Received', paymentReceived, paymentReceived ? '31 Aug, 11:05 AM' : 'Expected within 3 days']]
  return <div className="page-enter mx-auto max-w-5xl"><SectionHeading eyebrow="Deal settlement" title="Payments" description="Track the amount due and every milestone of your sale." /><div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]"><Card className="p-5 sm:p-7"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-slate-400">Deal</p><h2 className="mt-1 text-xl font-extrabold text-ink">#KL-D1024</h2><p className="mt-1 text-sm text-slate-500">ABC Foods · 5,000 kg Onion</p></div><StatusBadge type={paymentReceived ? 'verified' : 'pending'} dot>{paymentReceived ? 'Received' : 'Pending'}</StatusBadge></div><div className="mt-8 grid gap-4 sm:grid-cols-3"><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold text-slate-400">GROSS AMOUNT</p><p className="mt-2 text-lg font-extrabold text-ink">₹1,45,000</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold text-slate-400">TRANSPORT</p><p className="mt-2 text-lg font-extrabold text-rose-600">− ₹8,000</p></div><div className="rounded-xl bg-forest-50 p-4"><p className="text-xs font-bold text-forest-600">EXPECTED NET</p><p className="mt-2 text-lg font-extrabold text-forest-700">₹1,37,000</p></div></div><div className="mt-7 rounded-2xl border border-forest-100 bg-gradient-to-r from-forest-50 to-white p-5"><p className="text-xs font-bold uppercase tracking-[.12em] text-forest-600">Payment status</p><p className="mt-2 text-xl font-extrabold text-ink">{paymentReceived ? 'Payment received successfully' : 'Payment pending from ABC Foods'}</p><p className="mt-1 text-sm text-slate-500">{paymentReceived ? 'Settlement complete. Your deal is closed.' : 'Expected within 3 days after delivery.'}</p>{!paymentReceived && <Button onClick={markReceived} variant="secondary" className="mt-4">Mark as received <span className="text-[10px]">(demo)</span></Button>}</div></Card><Card className="p-5 sm:p-7"><h2 className="font-extrabold text-ink">Transaction timeline</h2><div className="mt-7 space-y-0">{timeline.map(([title, complete, time], index) => <div key={title} className="relative flex gap-4 pb-7 last:pb-0"><div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">{complete ? <CheckCircle2 size={22} className="text-forest-600" /> : <Clock3 size={21} className="text-amber-500" />}</div>{index < timeline.length - 1 && <span className={`absolute left-[15px] top-8 h-[30px] w-[2px] ${complete ? 'bg-forest-200' : 'bg-slate-200'}`} />}<div className="pt-1"><p className={`text-sm font-extrabold ${complete ? 'text-ink' : 'text-slate-500'}`}>{title} {complete && <span className="text-forest-600">✓</span>}</p><p className="mt-1 text-xs text-slate-400">{time}</p></div></div>)}</div></Card></div></div>
}

export function Profile({ toast }) {
  return <div className="page-enter mx-auto max-w-4xl"><SectionHeading eyebrow="Account settings" title="Farmer Profile" description="Your details are used to personalise market and buyer recommendations." /><div className="grid gap-6 md:grid-cols-[.8fr_1.2fr]"><Card className="p-6 text-center"><span className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-forest-100 text-2xl font-extrabold text-forest-700">RP</span><h2 className="mt-4 text-xl font-extrabold text-ink">Ramesh Patil</h2><p className="mt-1 text-sm text-slate-500">Farmer · Nashik, Maharashtra</p><StatusBadge type="verified" className="mt-4"><BadgeCheck size={13} />Profile verified</StatusBadge><div className="mt-7 border-t border-slate-100 pt-5 text-left"><p className="label">Primary crop</p><p className="font-extrabold text-ink">Onion · Grade A</p><p className="mt-4 label">Farm location</p><p className="font-extrabold text-ink">Pimpalgaon Baswant</p></div></Card><Card className="p-6"><h2 className="font-extrabold text-ink">Personal details</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><label><span className="label">Full name</span><input className="input" defaultValue="Ramesh Patil" /></label><label><span className="label">Mobile number</span><input className="input" defaultValue="+91 98220 45678" /></label><label><span className="label">Village</span><input className="input" defaultValue="Pimpalgaon Baswant" /></label><label><span className="label">District</span><input className="input" defaultValue="Nashik" /></label></div><Button onClick={() => toast?.('Profile saved', 'Your farmer details were updated in this demo session.')} className="mt-6">Save changes</Button></Card></div></div>
}

export function WarehousePage({ navigate, toast }) {
  const [selected, setSelected] = useState(null)

  const [crop, setCrop] = useState('Onion')
  const [quantity, setQuantity] = useState(5000)
  const [quality, setQuality] = useState('Grade A')
  const [location, setLocation] = useState('Nashik')

  const warehouses = [
    {
      id: 1,
      name: 'Nashik Agro Warehouse',
      location: 'Pimpalgaon, Nashik',
      distance: '12 km',
      capacity: '50 Ton',
      available: '20 Ton',
      price: 2,
      rating: 4.7,
    },
    {
      id: 2,
      name: 'Kisan Storage Center',
      location: 'Lasalgaon, Nashik',
      distance: '24 km',
      capacity: '100 Ton',
      available: '45 Ton',
      price: 1.8,
      rating: 4.6,
    },
    {
      id: 3,
      name: 'Maharashtra Cold Storage',
      location: 'Nashik Road',
      distance: '18 km',
      capacity: '75 Ton',
      available: '30 Ton',
      price: 2.2,
      rating: 4.8,
    },
  ]

  const selectedWarehouse = warehouses.find(
    warehouse => warehouse.id === selected
  )

  const weeks = 1

  const storageCost = selectedWarehouse
    ? quantity * selectedWarehouse.price * weeks
    : 0

  const currentPrice = 25
  const estimatedFuturePrice = 28

  const currentValue = quantity * currentPrice
  const futureValue = quantity * estimatedFuturePrice

  const additionalValue = futureValue - currentValue - storageCost

  const selectWarehouse = (warehouse) => {
    setSelected(warehouse.id)

    toast(
      'Warehouse Selected',
      `${warehouse.name} selected for your crop storage.`
    )
  }

  const continueToSelling = () => {
    if (!selectedWarehouse) {
      toast(
        'Select Warehouse',
        'Please select a warehouse first.'
      )
      return
    }

    toast(
      'Storage Plan Ready',
      'You can continue to create your crop lot.'
    )

    navigate('lots')
  }

  return (
    <div className="page-enter mx-auto max-w-6xl">

      <SectionHeading
        eyebrow="Store & Sell Later"
        title="Warehouse"
        description="Find a verified warehouse and decide whether storing your crop can improve your selling opportunity."
      />

       {/* Crop Information */}
<Card className="mb-6 p-5">

  <div className="mb-5">
    <p className="text-xs font-bold uppercase tracking-[.12em] text-slate-400">
      Your Crop
    </p>

    <h2 className="mt-1 text-xl font-extrabold text-ink">
      Enter Crop Details
    </h2>
  </div>

  <div className="grid gap-4 md:grid-cols-4">

    {/* Crop */}
    <div>
      <label className="text-sm font-bold text-slate-600">
        Crop
      </label>

      <select
        value={crop}
        onChange={(e) => setCrop(e.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-forest-500"
      >
        <option>Onion</option>
        <option>Tomato</option>
        <option>Potato</option>
        <option>Wheat</option>
        <option>Rice</option>
        <option>Cotton</option>
        <option>Soybean</option>
      </select>
    </div>

    {/* Quantity */}
    <div>
      <label className="text-sm font-bold text-slate-600">
        Quantity (kg)
      </label>

      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-forest-500"
        placeholder="Enter quantity"
        min="1"
      />
    </div>

    {/* Quality */}
    <div>
      <label className="text-sm font-bold text-slate-600">
        Quality
      </label>

      <select
        value={quality}
        onChange={(e) => setQuality(e.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-forest-500"
      >
        <option>Grade A</option>
        <option>Grade B</option>
        <option>Grade C</option>
      </select>
    </div>

    {/* Location */}
    <div>
      <label className="text-sm font-bold text-slate-600">
        Location
      </label>

      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-forest-500"
        placeholder="Enter location"
      />
    </div>

  </div>

  <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-slate-50 p-4">

    <div>
      <p className="text-xs font-bold uppercase text-slate-400">
        Selected Crop
      </p>

      <p className="mt-1 font-extrabold text-ink">
        {crop}
      </p>

      <p className="text-sm text-slate-500">
        {quantity.toLocaleString('en-IN')} kg · {quality} · {location}
      </p>
    </div>

    <div className="rounded-xl bg-forest-50 px-5 py-3">
      <p className="text-xs font-bold text-forest-600">
        CURRENT PRICE
      </p>

      <p className="mt-1 text-xl font-extrabold text-ink">
        ₹{currentPrice}/kg
      </p>
    </div>

  </div>

</Card>
        {/* Warehouse List */}
        <div>

          <div className="mb-4">
            <h2 className="text-lg font-extrabold text-ink">
              Nearby Warehouses
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Compare distance, capacity, rating and storage cost.
            </p>
          </div>

          <div className="space-y-4">

            {warehouses.map(warehouse => (

              <button
                key={warehouse.id}
                onClick={() => selectWarehouse(warehouse)}
                className={`w-full rounded-2xl border p-5 text-left transition ${
                  selected === warehouse.id
                    ? 'border-forest-500 bg-forest-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-forest-200'
                }`}
              >

                <div className="flex items-start gap-4">

                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      selected === warehouse.id
                        ? 'bg-forest-600 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <Warehouse size={22} />
                  </span>

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="font-extrabold text-ink">
                        {warehouse.name}
                      </h3>

                      <StatusBadge type="recommended">
                        Verified
                      </StatusBadge>

                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      📍 {warehouse.location} · {warehouse.distance}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">

                      <span>
                        📦 {warehouse.available} available
                      </span>

                      <span>
                        ⭐ {warehouse.rating}
                      </span>

                      <span>
                        ₹{warehouse.price}/kg/week
                      </span>

                    </div>

                  </div>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Storage Summary */}
        <aside>

          <Card className="sticky top-6 p-5">

            <div className="flex items-center gap-2">

              <span className="rounded-lg bg-forest-50 p-2 text-forest-600">
                <Warehouse size={18} />
              </span>

              <h2 className="font-extrabold text-ink">
                Storage Analysis
              </h2>

            </div>

            {!selectedWarehouse ? (

              <div className="mt-6 rounded-xl bg-slate-50 p-5 text-center">

                <p className="text-sm font-semibold text-slate-500">
                  Select a warehouse to see the estimated storage cost and selling opportunity.
                </p>

              </div>

            ) : (

              <div className="mt-5 space-y-4">

                <div>
                  <p className="text-xs font-bold uppercase text-slate-400">
                    Selected Warehouse
                  </p>

                  <p className="mt-1 font-extrabold text-ink">
                    {selectedWarehouse.name}
                  </p>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Storage duration
                  </span>

                  <b>1 Week</b>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Storage cost
                  </span>

                  <b>
                    ₹{storageCost.toLocaleString('en-IN')}
                  </b>
                </div>

                <div className="border-t border-slate-100 pt-4">

                  <p className="text-xs font-bold uppercase text-slate-400">
                    Price Comparison
                  </p>

                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-slate-500">
                      Current value
                    </span>

                    <b>
                      ₹{currentValue.toLocaleString('en-IN')}
                    </b>
                  </div>

                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-slate-500">
                      Estimated future value
                    </span>

                    <b className="text-forest-700">
                      ₹{futureValue.toLocaleString('en-IN')}
                    </b>
                  </div>

                </div>

                <div className="rounded-xl bg-forest-50 p-4">

                  <p className="text-xs font-bold uppercase text-forest-600">
                    Estimated additional value
                  </p>

                  <p className="mt-1 text-2xl font-extrabold text-forest-700">
                    ₹{additionalValue.toLocaleString('en-IN')}
                  </p>

                  <p className="mt-1 text-xs text-forest-700">
                    Demo estimate after storage cost.
                  </p>

                </div>

                <Button
                  onClick={continueToSelling}
                  className="w-full"
                  icon={Warehouse}
                >
                  Store & Continue
                </Button>

              </div>

            )}

          </Card>

        </aside>

      </div>

    </div>
  )
}
