import { Check, ChevronRight, LoaderCircle, X } from 'lucide-react'

const styles = {
  primary: 'bg-forest-600 text-white shadow-lg shadow-forest-600/20 hover:bg-forest-700',
  secondary: 'border border-forest-200 bg-forest-50 text-forest-700 hover:bg-forest-100',
  white: 'bg-white text-forest-700 shadow-soft hover:bg-forest-50',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  danger: 'bg-rose-50 text-rose-700 hover:bg-rose-100',
}

export function Button({ children, variant = 'primary', icon: Icon, iconRight = false, className = '', loading = false, ...props }) {
  return <button className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`} disabled={loading || props.disabled} {...props}>
    {loading ? <LoaderCircle size={17} className="animate-spin" /> : Icon && !iconRight ? <Icon size={17} /> : null}
    {children}
    {Icon && iconRight && <Icon size={17} />}
  </button>
}

const badgeStyles = {
  verified: 'bg-emerald-50 text-emerald-700 ring-emerald-100', recommended: 'bg-forest-100 text-forest-700 ring-forest-200',
  increasing: 'bg-emerald-50 text-emerald-700 ring-emerald-100', pending: 'bg-amber-50 text-amber-700 ring-amber-100',
  reliable: 'bg-sky-50 text-sky-700 ring-sky-100', neutral: 'bg-slate-100 text-slate-600 ring-slate-200',
}

export function StatusBadge({ children, type = 'neutral', dot = false, className = '' }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${badgeStyles[type]} ${className}`}>
    {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}{children}
  </span>
}

export function Card({ children, className = '', padding = 'p-5' }) { return <section className={`app-card ${padding} ${className}`}>{children}</section> }

export function StatCard({ icon: Icon, label, value, note, tone = 'green' }) {
  const tones = { green: 'bg-forest-50 text-forest-600', blue: 'bg-sky-50 text-sky-600', amber: 'bg-amber-50 text-amber-600', violet: 'bg-violet-50 text-violet-600' }
  return <Card className="relative overflow-hidden p-5">
    <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}><Icon size={20} /></div>
    <p className="text-xs font-bold uppercase tracking-[.1em] text-slate-400">{label}</p>
    <p className="mt-1 text-2xl font-extrabold tracking-tight text-ink">{value}</p>
    {note && <p className="mt-1 text-xs font-medium text-slate-500">{note}</p>}
    <div className="absolute -right-5 -top-6 h-24 w-24 rounded-full bg-forest-50/80" />
  </Card>
}

export function SectionHeading({ eyebrow, title, description, action }) {
  return <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
    <div>
      {eyebrow && <p className="mb-1 text-xs font-bold uppercase tracking-[.14em] text-forest-600">{eyebrow}</p>}
      <h2 className="text-xl font-extrabold tracking-tight text-ink">{title}</h2>
      {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
    </div>
    {action}
  </div>
}

export function Metric({ label, value, sub, valueClass = '' }) {
  return <div><p className="text-xs font-semibold text-slate-400">{label}</p><p className={`mt-1 text-base font-extrabold text-ink ${valueClass}`}>{value}</p>{sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}</div>
}

export function ScoreRing({ value, size = 66 }) {
  const radius = 24, circumference = 2 * Math.PI * radius, offset = circumference - (value / 100) * circumference
  return <div className="relative shrink-0" style={{ width: size, height: size }}>
    <svg width={size} height={size} viewBox="0 0 60 60" className="-rotate-90"><circle cx="30" cy="30" r={radius} fill="none" stroke="#e8f1eb" strokeWidth="5" /><circle cx="30" cy="30" r={radius} fill="none" stroke="#24955d" strokeWidth="5" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} /></svg>
    <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-forest-700">{value}%</span>
  </div>
}

export function Toasts({ toasts, remove }) {
  return <div className="fixed right-4 top-4 z-[100] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2">
    {toasts.map(toast => <div key={toast.id} className="flex items-start gap-3 rounded-2xl border border-forest-100 bg-white p-4 shadow-xl shadow-slate-900/10">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-700"><Check size={14} strokeWidth={3} /></span>
      <div className="min-w-0 flex-1"><p className="text-sm font-extrabold text-ink">{toast.title}</p><p className="mt-0.5 text-xs leading-relaxed text-slate-500">{toast.message}</p></div>
      <button aria-label="Dismiss" className="text-slate-400 hover:text-slate-700" onClick={() => remove(toast.id)}><X size={16} /></button>
    </div>)}
  </div>
}

export function EmptyState({ icon: Icon, title, copy, action }) {
  return <Card className="flex min-h-64 flex-col items-center justify-center p-8 text-center"><div className="mb-4 rounded-2xl bg-forest-50 p-4 text-forest-600"><Icon size={28} /></div><h3 className="font-extrabold text-ink">{title}</h3><p className="mt-2 max-w-sm text-sm text-slate-500">{copy}</p>{action && <div className="mt-5">{action}</div>}</Card>
}

export function ListArrow({ children, onClick }) { return <button onClick={onClick} className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-bold text-slate-600 transition hover:bg-forest-50 hover:text-forest-700">{children}<ChevronRight size={17} className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-forest-600" /></button> }
