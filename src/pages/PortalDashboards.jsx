import { BadgeCheck, BarChart3, CheckCircle2, ClipboardList, FileCheck2, Handshake, Package, ShieldAlert, Store, TrendingUp, Users } from 'lucide-react'
import { Button, Card, SectionHeading, StatCard, StatusBadge } from '../components/ui'
import { useState } from 'react'

const lots = [
  { crop: 'Onion', grade: 'Grade A', quantity: '5,000 kg', city: 'Nashik', price: '₹28–₹30/kg', farmer: 'Ramesh Patil', match: '95%', quality: 'Grade A', moisture: 8, defects: 2, qualityScore: 94 },
  { crop: 'Tomato', grade: 'Grade A', quantity: '3,000 kg', city: 'Pune', price: '₹30–₹33/kg', farmer: 'Meera Jadhav', match: '89%', quality: 'Grade A', moisture: 10, defects: 5, qualityScore: 85 },
  { crop: 'Wheat', grade: 'Grade A', quantity: '8,000 kg', city: 'Ahmednagar', price: '₹24–₹26/kg', farmer: 'Vikram Shinde', match: '84%', quality: 'Grade A', moisture: 12, defects: 8, qualityScore: 80 },
]

export function BuyerDashboard({ toast }) {
  const [selectedLots, setSelectedLots] = useState([])
  const [showComparison, setShowComparison] = useState(false)

  return <div className="page-enter"><SectionHeading eyebrow="Buyer workspace" title="Good morning, ABC Foods" description="Source verified crop lots matched to your active requirements." action={<Button icon={Package}>Post requirement</Button>} /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard icon={ClipboardList} label="Active Requirements" value="4" note="2 ending this week" /><StatCard icon={Package} label="Matching Lots" value="18" note="5 new today" tone="blue" /><StatCard icon={Handshake} label="Pending Offers" value="6" note="2 require action" tone="amber" /><StatCard icon={CheckCircle2} label="Completed Deals" value="32" note="This season" tone="violet" /></div><Card className="mt-8 overflow-hidden p-0"><div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6"><div><h2 className="font-extrabold text-ink">Recommended Crop Lots</h2><p className="mt-1 text-sm text-slate-500">Ranked by your purchase requirement and quality preference.</p></div><StatusBadge type="recommended">18 matched lots</StatusBadge>{selectedLots.length >= 2 && (
  <Button
    onClick={() => setShowComparison(true)}
    className="px-4 py-2"
  >
    Compare Selected ({selectedLots.length})
  </Button>
)}</div><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left"><thead className="border-y border-slate-100 bg-slate-50/70 text-[10px] font-bold uppercase tracking-[.12em] text-slate-400"><tr><th className="px-6 py-3">Crop lot</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Price range</th><th className="px-4 py-3">Match</th><th className="px-6 py-3 text-right">Action</th></tr></thead><tbody>{lots.map(lot => <tr key={lot.farmer} className="border-b border-slate-50"><td className="px-6 py-4"><p className="font-extrabold text-ink">{lot.crop} <span className="font-semibold text-slate-400">— {lot.grade} — {lot.quantity}</span></p><p className="mt-1 text-xs text-slate-400">Farmer: {lot.farmer}</p></td><td className="px-4 py-4 text-sm font-semibold text-slate-600">{lot.city}</td><td className="px-4 py-4 text-sm font-extrabold text-forest-700">{lot.price}</td><td className="px-4 py-4"><StatusBadge type="recommended">{lot.match}</StatusBadge></td><td className="px-6 py-4 text-right"><Button variant="secondary" onClick={() => toast('Lot opened', `Viewing ${lot.crop} lot from ${lot.farmer}.`)} className="mr-2 px-3 py-2">View Lot</Button><Button
  variant="secondary"
  onClick={() => {
    setSelectedLots(prev =>
      prev.some(item => item.farmer === lot.farmer)
        ? prev.filter(item => item.farmer !== lot.farmer)
        : [...prev, lot]
    )
  }}
  className="mr-2 px-3 py-2"
>
  {selectedLots.some(item => item.farmer === lot.farmer)
    ? '✓ Selected'
    : 'Compare'}
</Button><Button onClick={() => toast('Offer draft created', `Offer form opened for ${lot.farmer}.`)} className="px-3 py-2">Make Offer</Button></td></tr>)}</tbody></table></div></Card>

{/* Quality Comparison Popup */}
{showComparison && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-ink">
            Product Quality Comparison
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Compare selected crop lots before making a purchase.
          </p>
        </div>

        <button
          onClick={() => setShowComparison(false)}
          className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100"
        >
          ✕
        </button>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left">

          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-4 py-3 text-sm text-slate-500">
                Parameter
              </th>

              {selectedLots.map(lot => (
                <th
                  key={lot.farmer}
                  className="px-4 py-3 text-sm font-bold text-ink"
                >
                  {lot.farmer}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>

            <tr className="border-b border-slate-50">
              <td className="px-4 py-3 font-semibold">
                Crop
              </td>

              {selectedLots.map(lot => (
                <td key={lot.farmer} className="px-4 py-3">
                  {lot.crop}
                </td>
              ))}
            </tr>

            <tr className="border-b border-slate-50">
              <td className="px-4 py-3 font-semibold">
                Quality Grade
              </td>

              {selectedLots.map(lot => (
                <td key={lot.farmer} className="px-4 py-3">
                  {lot.grade}
                </td>
              ))}
            </tr>
            <tr className="border-b border-slate-50">
  <td className="px-4 py-3 font-semibold">
    Moisture
  </td>

  {selectedLots.map(lot => (
    <td key={lot.farmer} className="px-4 py-3">
      {lot.moisture}%
    </td>
  ))}
</tr>

<tr className="border-b border-slate-50">
  <td className="px-4 py-3 font-semibold">
    Defects
  </td>

  {selectedLots.map(lot => (
    <td key={lot.farmer} className="px-4 py-3">
      {lot.defects}%
    </td>
  ))}
</tr>

<tr className="border-b border-slate-50">
  <td className="px-4 py-3 font-semibold">
    Quality Score
  </td>

  {selectedLots.map(lot => (
    <td key={lot.farmer} className="px-4 py-3 font-bold text-forest-700">
      {lot.qualityScore}/100
    </td>
  ))}
</tr>

            <tr className="border-b border-slate-50">
              <td className="px-4 py-3 font-semibold">
                Quantity
              </td>

              {selectedLots.map(lot => (
                <td key={lot.farmer} className="px-4 py-3">
                  {lot.quantity}
                </td>
              ))}
            </tr>

            <tr className="border-b border-slate-50">
              <td className="px-4 py-3 font-semibold">
                Location
              </td>

              {selectedLots.map(lot => (
                <td key={lot.farmer} className="px-4 py-3">
                  {lot.city}
                </td>
              ))}
            </tr>

            <tr className="border-b border-slate-50">
              <td className="px-4 py-3 font-semibold">
                Price
              </td>

              {selectedLots.map(lot => (
                <td key={lot.farmer} className="px-4 py-3 font-bold text-forest-700">
                  {lot.price}
                </td>
              ))}
            </tr>

            <tr>
              <td className="px-4 py-3 font-semibold">
                Match Score
              </td>

              {selectedLots.map(lot => (
                <td key={lot.farmer} className="px-4 py-3 font-bold">
                  {lot.match}
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  </div>
)}

</div>
}

const buyerRows = [
  ['ABC Foods', 'Food processing', '124 transactions', 'Verified'],
  ['FreshMart', 'Retail chain', '86 transactions', 'Verified'],
  ['XYZ Traders', 'Wholesale', 'New account', 'Pending'],
]

export function AdminDashboard({ toast }) {
  return <div className="page-enter"><SectionHeading eyebrow="Platform overview" title="KrishiLink Admin" description="Monitor marketplace trust, activity and verification from one workspace." action={<Button icon={FileCheck2}>Review verifications</Button>} /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard icon={Users} label="Registered Farmers" value="1,248" note="+38 this month" /><StatCard icon={BadgeCheck} label="Verified Buyers" value="184" note="12 awaiting review" tone="blue" /><StatCard icon={Package} label="Active Lots" value="426" note="69 added this week" tone="amber" /><StatCard icon={Handshake} label="Transactions" value="2,840" note="₹3.2 Cr tracked" tone="violet" /></div><div className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_.65fr]"><Card className="overflow-hidden p-0"><div className="flex items-center justify-between p-5 sm:p-6"><div><h2 className="font-extrabold text-ink">Buyer Verification</h2><p className="mt-1 text-sm text-slate-500">Review buyer credentials and transaction history.</p></div><button onClick={() => toast('Verification queue opened', '12 buyer profiles are awaiting review.')} className="text-sm font-extrabold text-forest-700">View queue →</button></div><div className="overflow-x-auto"><table className="w-full min-w-[580px] text-left"><thead className="border-y border-slate-100 bg-slate-50/70 text-[10px] font-bold uppercase tracking-[.12em] text-slate-400"><tr><th className="px-6 py-3">Buyer</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Activity</th><th className="px-6 py-3">Status</th></tr></thead><tbody>{buyerRows.map(([name, type, activity, status]) => <tr key={name} className="border-b border-slate-50 last:border-0"><td className="px-6 py-4 font-extrabold text-ink">{name}</td><td className="px-4 py-4 text-sm text-slate-600">{type}</td><td className="px-4 py-4 text-sm text-slate-600">{activity}</td><td className="px-6 py-4"><StatusBadge type={status === 'Verified' ? 'verified' : 'pending'}>{status === 'Verified' && <BadgeCheck size={13} />} {status}</StatusBadge></td></tr>)}</tbody></table></div></Card><div className="space-y-4"><Card className="p-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600"><TrendingUp size={20} /></span><h3 className="mt-4 font-extrabold text-ink">Platform Analytics</h3><p className="mt-2 text-sm leading-relaxed text-slate-500">84% of active lots received at least one buyer response this month.</p><button onClick={() => toast('Analytics opened', 'Marketplace performance details are ready.')} className="mt-4 text-sm font-extrabold text-forest-700">View analytics →</button></Card><Card className="p-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><ShieldAlert size={20} /></span><h3 className="mt-4 font-extrabold text-ink">Disputes</h3><p className="mt-2 text-3xl font-extrabold text-ink">3 <span className="text-sm font-semibold text-slate-500">open cases</span></p><p className="mt-2 text-sm text-slate-500">All cases are within the response window.</p></Card></div></div></div>
}
