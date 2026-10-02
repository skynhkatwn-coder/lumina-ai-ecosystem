import { useState } from 'react'
import { LandingPage } from './pages/LandingPage'
import { OwnerDashboard } from './pages/OwnerDashboard'
import { Login } from './pages/Login'
import { useAuth } from './hooks/useAuth'
import { AIWidget } from './components/AIWidget'

type View = 'login' | 'landing' | 'dashboard' | 'shopping'

export default function App() {
  const { user, loading } = useAuth()
  const [currentView, setCurrentView] = useState<View>('landing')

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-slate-200">Initializing Lumina OS...</p>
        </div>
      </div>
    )
  }

  const getPageContext = () => {
    switch (currentView) {
      case 'landing':
        return {
          title: 'Lumina OS Global',
          description: 'World\'s first autonomous AI commerce ecosystem founded by Eng. Mahdi Delzandeh',
          section: 'Landing Page'
        }
      case 'dashboard':
        return {
          title: 'Owner Dashboard',
          description: 'Real-time revenue analytics, order management, and global commerce control',
          section: 'Dashboard'
        }
      case 'shopping':
        return {
          title: 'AI Shopping Assistant',
          description: 'Intelligent product discovery and purchasing across 48+ countries',
          section: 'Shopping'
        }
      case 'login':
        return {
          title: 'Secure Login',
          description: 'Access your Lumina OS account',
          section: 'Authentication'
        }
      default:
        return { title: 'Lumina OS', description: 'AI Commerce Platform', section: 'General' }
    }
  }

  const pageContext = getPageContext()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white">
              L
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Lumina OS</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">Global</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <button onClick={() => setCurrentView('landing')} className={`hover:text-white transition ${currentView === 'landing' ? 'text-white font-semibold' : ''}`}>
              Home
            </button>
            <button onClick={() => user ? setCurrentView('dashboard') : setCurrentView('login')} className={`hover:text-white transition ${currentView === 'dashboard' ? 'text-white font-semibold' : ''}`}>
              Dashboard
            </button>
            <button onClick={() => user ? setCurrentView('shopping') : setCurrentView('login')} className={`hover:text-white transition ${currentView === 'shopping' ? 'text-white font-semibold' : ''}`}>
              Shopping
            </button>
            <button className="hover:text-white transition">Pricing</button>
          </nav>

          <button 
            onClick={() => user ? setCurrentView('dashboard') : setCurrentView('login')}
            className="rounded-full bg-blue-600 hover:bg-blue-500 px-5 py-2 text-sm font-semibold text-white transition"
          >
            {user ? 'Dashboard' : 'Login'}
          </button>
        </div>
      </header>

      <main>
        {!user && currentView === 'login' && <Login onSuccess={() => setCurrentView('dashboard')} />}
        {currentView === 'landing' && <LandingPage onNavigate={setCurrentView} />}
        {user && currentView === 'dashboard' && <OwnerDashboard onNavigate={setCurrentView} />}
        {user && currentView === 'shopping' && <ShoppingAssistant />}
      </main>

      <AIWidget pageContext={pageContext} />

      <Footer />
    </div>
  )
}

function ShoppingAssistant() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-widest text-cyan-400">AI Shopping</p>
        <h1 className="mt-3 text-4xl font-extrabold text-white">Intelligent Product Discovery</h1>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <p className="text-slate-300">AI Shopping Assistant - Coming Soon</p>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <p className="text-sm font-semibold text-white mb-4">Product</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white">Dashboard</a></li>
              <li><a href="#" className="hover:text-white">Shopping</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-4">Company</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-4">Resources</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white">Docs</a></li>
              <li><a href="#" className="hover:text-white">API</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-4">Social</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="https://instagram.com/lumina.ai.ecosystem" target="_blank" className="hover:text-white">Instagram</a></li>
              <li><a href="https://twitter.com/LuminaAIEco" target="_blank" className="hover:text-white">Twitter</a></li>
              <li><a href="https://linkedin.com/company/lumina-ai-ecosystem" target="_blank" className="hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8">
          <p className="text-sm text-slate-400 text-center">
            © 2024 Lumina OS Global. Founded & Architected by Eng. Mahdi Delzandeh<br/>
            World's First Autonomous AI Commerce Ecosystem
          </p>
        </div>
      </div>
    </footer>
  )
}
