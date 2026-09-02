import { useCallback, useEffect, useState } from 'react'
import { AppShell, CompactPortalShell } from './components/AppShell'
import { Toasts } from './components/ui'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import { AdminDashboard, BuyerDashboard } from './pages/PortalDashboards'
import { BuyerDetails, BuyerMatching, CreateLot, DealConfirmation, FarmerDashboard, Logistics, MarketIntelligence, Offers, Payments, Profile } from './pages/FarmerPages'

const routeForRole = role => role === 'farmer' ? 'dashboard' : `${role}-dashboard`

export default function App() {
  const [route, setRoute] = useState(() => localStorage.getItem('krishilink-route') || 'landing')
  const [role, setRole] = useState(() => localStorage.getItem('krishilink-role') || 'farmer')
  const [lotCreated, setLotCreated] = useState(() => localStorage.getItem('krishilink-lot-created') === 'true')
  const [paymentReceived, setPaymentReceived] = useState(() => localStorage.getItem('krishilink-payment-received') === 'true')
  const [toasts, setToasts] = useState([])
  useEffect(() => localStorage.setItem('krishilink-route', route), [route])
  useEffect(() => localStorage.setItem('krishilink-role', role), [role])
  useEffect(() => localStorage.setItem('krishilink-lot-created', lotCreated), [lotCreated])
  useEffect(() => localStorage.setItem('krishilink-payment-received', paymentReceived), [paymentReceived])
  const navigate = useCallback(next => { setRoute(next); window.scrollTo({top: 0, behavior: 'smooth'}) }, [])
  const toast = useCallback((title, message) => { const id = Date.now(); setToasts(current => [...current, {id, title, message}]); window.setTimeout(() => setToasts(current => current.filter(item => item.id !== id)), 4200) }, [])
  const login = selected => { setRole(selected); navigate(routeForRole(selected)); toast(`Welcome, ${selected[0].toUpperCase() + selected.slice(1)}`, 'You are now viewing the KrishiLink demo workspace.') }
  const logout = () => { navigate('login'); toast('Role selection', 'Choose another demo role to continue.') }
  let content
  if (route === 'landing') content = <LandingPage navigate={navigate}/>
  else if (route === 'login') content = <LoginPage navigate={navigate} login={login}/>
  else if (route === 'buyer-dashboard') content = <CompactPortalShell role="buyer" onLogout={logout}><BuyerDashboard toast={toast}/></CompactPortalShell>
  else if (route === 'admin-dashboard') content = <CompactPortalShell role="admin" onLogout={logout}><AdminDashboard toast={toast}/></CompactPortalShell>
  else {
    const pageProps = { navigate, toast, lotCreated, setLotCreated, paymentReceived, setPaymentReceived }
    const pages = {
      dashboard: <FarmerDashboard {...pageProps}/>, market: <MarketIntelligence {...pageProps}/>, lots: <CreateLot {...pageProps}/>, matching: <BuyerMatching {...pageProps}/>, 'buyer-details': <BuyerDetails {...pageProps}/>, offers: <Offers {...pageProps}/>, deals: <DealConfirmation {...pageProps}/>, logistics: <Logistics {...pageProps}/>, payments: <Payments {...pageProps}/>, profile: <Profile {...pageProps}/>,
    }
    content = <AppShell active={route} navigate={navigate} onLogout={logout} paymentReceived={paymentReceived}>{pages[route] || pages.dashboard}</AppShell>
  }
  return <>{content}<Toasts toasts={toasts} remove={id => setToasts(current => current.filter(item => item.id !== id))}/></>
}
