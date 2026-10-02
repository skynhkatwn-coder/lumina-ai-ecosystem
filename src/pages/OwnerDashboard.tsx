import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, ShoppingCart, Users, DollarSign, LogOut, Bell, Settings } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

interface OwnerDashboardProps {
  onNavigate: (view: string) => void
}

export function OwnerDashboard({ onNavigate }: OwnerDashboardProps) {
  const { user, logout } = useAuth()

  const chartData = [
    { date: 'Jan 1', revenue: 4200, orders: 24 },
    { date: 'Jan 2', revenue: 3800, orders: 21 },
    { date: 'Jan 3', revenue: 2400, orders: 14 },
    { date: 'Jan 4', revenue: 2780, orders: 16 },
    { date: 'Jan 5', revenue: 1890, orders: 11 },
    { date: 'Jan 6', revenue: 2390, orders: 14 },
    { date: 'Jan 7', revenue: 3490, orders: 20 },
  ]

  const regionData = [
    { name: 'Iran', value: 35, revenue: '$14,700' },
    { name: 'UAE', value: 25, revenue: '$10,500' },
    { name: 'Europe', value: 20, revenue: '$8,400' },
    { name: 'USA', value: 20, revenue: '$8,400' },
  ]

  const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899']

  const stats = [
    { label: 'Total Revenue', value: '$197,800', icon: DollarSign, trend: '+12.5%' },
    { label: 'Active Orders', value: '47', icon: ShoppingCart, trend: '+8.2%' },
    { label: 'Suppliers', value: '12', icon: Users, trend: '+4%' },
    { label: 'Conversion', value: '18.2%', icon: TrendingUp, trend: '+2.1%' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-widest text-cyan-400">Owner Dashboard</p>
            <h1 className="text-3xl font-black text-white mt-2">Welcome back, {user?.name}! 👋</h1>
          </div>
          <button
            onClick={() => {
              logout()
              onNavigate('login')
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-slate-700 transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Icon size={24} className="text-white" />
                  </div>
                  <span className="text-green-400 text-sm font-semibold">{stat.trend}</span>
                </div>
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                <Line type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Revenue by Region</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={regionData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {regionData.map((_, index) => <Cell key={index} fill={COLORS[index]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to automate shopping?</h2>
          <p className="text-blue-100 mb-4">Launch AI Shopping Assistant and start generating real income</p>
          <button
            onClick={() => onNavigate('shopping')}
            className="rounded-full bg-white text-blue-600 font-semibold px-6 py-3 hover:bg-blue-50 transition"
          >
            Launch Shopping Assistant
          </button>
        </div>
      </div>
    </div>
  )
}
