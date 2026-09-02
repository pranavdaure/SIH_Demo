import { useState } from 'react'
import { Bell, ChevronDown, ClipboardList, Handshake, LayoutDashboard, Leaf, LogOut, Map, Menu, PackagePlus, Search, Settings2, Truck, UserRound, WalletCards, X } from 'lucide-react'
import { farmer } from '../data/mockData'
import { StatusBadge } from './ui'

const navItems = [
  ['dashboard', 'Dashboard', LayoutDashboard], ['market', 'Market Intelligence', Map], ['lots', 'My Crop Lots', PackagePlus], ['matching', 'AI Recommendations', Settings2], ['offers', 'Offers', Handshake], ['deals', 'Deals', ClipboardList], ['logistics', 'Logistics', Truck], ['payments', 'Payments', WalletCards], ['profile', 'Profile', UserRound],
]

export function AppShell({ active, navigate, children, onLogout, paymentReceived }) {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const go = route => { navigate(route); setOpen(false) }
  return <div className="min-h-screen bg-[#f6f9f6]">
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[#dfe9e1] bg-white px-4 py-5 transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <button onClick={() => go('dashboard')} className="flex items-center gap-2 px-3 text-left"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-600 text-white shadow-lg shadow-forest-600/20"><Leaf size={21} fill="currentColor" /></span><span><span className="block font-[Manrope] text-lg font-extrabold tracking-tight text-ink">Krishi<span className="text-forest-600">Link</span></span><span className="block text-[10px] font-bold tracking-[.12em] text-slate-400">FARMER PORTAL</span></span></button>
      <button onClick={() => setOpen(false)} className="absolute right-4 top-6 text-slate-500 lg:hidden"><X size={20} /></button>
      <nav className="mt-8 space-y-1">
        {navItems.map(([id, label, Icon]) => <button key={id} onClick={() => go(id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition ${active === id ? 'bg-forest-50 text-forest-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
          <Icon size={18} strokeWidth={active === id ? 2.5 : 2} />{label}{id === 'offers' && <span className="ml-auto rounded-full bg-forest-600 px-1.5 py-0.5 text-[10px] text-white">1</span>}
        </button>)}
      </nav>
      <div className="mt-auto rounded-2xl bg-gradient-to-br from-forest-50 to-white p-4"><p className="text-xs font-bold text-forest-700">Need help selling?</p><p className="mt-1 text-xs leading-relaxed text-slate-500">Your KrishiLink advisor is here.</p><button className="mt-3 text-xs font-extrabold text-forest-700">Get support →</button></div>
      <button onClick={onLogout} className="mt-3 flex items-center gap-2 px-3 py-2 text-sm font-bold text-slate-400 hover:text-rose-600"><LogOut size={16} />Switch account</button>
    </aside>
    {open && <button aria-label="Close menu" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden" />}
    <main className="min-h-screen lg:pl-72">
      <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-[#e3ece5]/80 bg-[#f6f9f6]/90 px-4 backdrop-blur lg:px-8">
        <button onClick={() => setOpen(true)} className="rounded-lg p-2 text-slate-600 lg:hidden"><Menu size={22} /></button>
        <div className="relative hidden w-full max-w-md md:block"><Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><input className="w-full rounded-xl border border-transparent bg-white py-2.5 pl-10 pr-4 text-sm font-medium outline-none shadow-sm placeholder:text-slate-400 focus:border-forest-200" placeholder="Search markets, buyers or lots..." /></div>
        <div className="ml-auto flex items-center gap-2.5">
          <div className="relative"><button onClick={() => setNotifications(!notifications)} className="relative rounded-xl bg-white p-2.5 text-slate-500 shadow-sm transition hover:text-forest-700"><Bell size={19} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-forest-600" /></button>
            {notifications && <div className="absolute right-0 top-12 w-80 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl"><p className="font-extrabold text-ink">Notifications</p><div className="mt-3 rounded-xl bg-forest-50 p-3"><p className="text-xs font-bold text-forest-700">Onion price is trending up</p><p className="mt-1 text-xs text-slate-500">Nashik Mandi price increased 4.3% today.</p></div></div>}</div>
          <button onClick={() => navigate('profile')} className="flex items-center gap-2 rounded-xl py-1 pl-1 pr-2 text-left hover:bg-white"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-100 text-xs font-extrabold text-forest-700">{farmer.initials}</span><span className="hidden sm:block"><span className="block text-xs font-extrabold text-ink">Ramesh Patil</span><span className="block text-[10px] text-slate-400">Farmer</span></span><ChevronDown size={14} className="hidden text-slate-400 sm:block" /></button>
        </div>
      </header>
      <div className="mx-auto max-w-[1540px] p-4 sm:p-6 lg:p-8">{children}</div>
    </main>
  </div>
}

export function CompactPortalShell({ role, onLogout, children }) {
  return <div className="min-h-screen bg-[#f6f9f6]"><header className="flex h-[76px] items-center justify-between border-b border-[#e3ece5] bg-white px-5 sm:px-8"><div className="flex items-center gap-2"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-600 text-white"><Leaf size={21} fill="currentColor" /></span><div><p className="font-[Manrope] text-lg font-extrabold text-ink">Krishi<span className="text-forest-600">Link</span></p><p className="text-[10px] font-bold tracking-[.12em] text-slate-400">{role.toUpperCase()} PORTAL</p></div></div><div className="flex items-center gap-3"><StatusBadge type={role === 'admin' ? 'reliable' : 'verified'}>{role === 'admin' ? 'Platform Admin' : 'Verified Buyer'}</StatusBadge><button onClick={onLogout} className="text-sm font-bold text-slate-500 hover:text-forest-700">Switch role</button></div></header><main className="mx-auto max-w-[1400px] p-5 sm:p-8">{children}</main></div>
}
