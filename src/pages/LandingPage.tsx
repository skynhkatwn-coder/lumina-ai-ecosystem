import { ArrowRight, Check, Zap, Globe, BarChart3, Shield } from 'lucide-react'

interface LandingPageProps {
  onNavigate: (view: string) => void
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 mb-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-cyan-300">Founded by Eng. Mahdi Delzandeh</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-tight text-white mb-6">
              Autonomous AI Commerce Ecosystem
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              Lumina OS Global empowers owners, teams, and businesses with real-time AI shopping, global product intelligence, multi-region operations, and automated revenue decisions across 48+ countries.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-6 py-3 font-semibold text-white transition"
              >
                Launch Platform <ArrowRight size={16} />
              </button>
              <button className="rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 px-6 py-3 font-semibold text-white transition">
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '48+', label: 'Countries' },
                { value: '4+', label: 'Currencies' },
                { value: '5', label: 'Revenue Streams' },
                { value: '24/7', label: 'AI Automation' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">AI Commerce Intelligence</p>
                  <h3 className="text-xl font-bold text-white">Real-time Dashboard</h3>
                </div>
                <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">Live</div>
              </div>

              <div className="space-y-4">
                {[
                  { role: 'Owner', status: 'Global Control' },
                  { role: 'Regions', status: '4 Directors' },
                  { role: 'Operations', status: '5 Managers' },
                  { role: 'Revenue', status: '$197,800 YTD' },
                ].map((item) => (
                  <div key={item.role} className="flex items-center justify-between rounded-xl bg-slate-800 p-3">
                    <span className="text-sm font-medium text-slate-200">{item.role}</span>
                    <span className="text-xs text-cyan-300 font-semibold">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-cyan-400 mb-4">Why Lumina OS</p>
          <h2 className="text-4xl font-black text-white mb-4">Everything You Need to Succeed</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: 'AI-Powered Shopping',
              desc: 'Discover products globally with real-time price comparison and supplier intelligence',
            },
            {
              icon: Globe,
              title: 'Multi-Region Operations',
              desc: 'Manage Iran, UAE, Europe, and USA separately with localized pricing and compliance',
            },
            {
              icon: BarChart3,
              title: 'Live Revenue Tracking',
              desc: 'Real-time dashboard with earnings, orders, and performance across all regions',
            },
            {
              icon: Shield,
              title: 'Secure & Compliant',
              desc: 'Enterprise-grade security with regional tax compliance and payment processing',
            },
            {
              icon: Check,
              title: 'Team Management',
              desc: 'Role-based access for owners, managers, and operations with full audit trails',
            },
            {
              icon: Zap,
              title: 'API & Integrations',
              desc: 'Connect with suppliers, payment gateways, and logistics providers seamlessly',
            },
          ].map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-slate-700 transition">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-cyan-400 mb-4">Simple Pricing</p>
          <h2 className="text-4xl font-black text-white">Revenue Sharing Models</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Commission',
              value: '1.5-5%',
              desc: 'Per transaction across regions',
            },
            {
              name: 'Affiliate',
              value: '3-10%',
              desc: 'Supplier partnership revenue',
            },
            {
              name: 'Premium',
              value: '$29-99',
              desc: 'Monthly subscription tiers',
            },
          ].map((plan) => (
            <div key={plan.name} className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
              <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-3xl font-black text-cyan-400 mb-4">{plan.value}</p>
              <p className="text-slate-400 text-sm mb-6">{plan.desc}</p>
              <button className="w-full rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 transition">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600 p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Transform Your Commerce?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join Lumina OS Global and start generating real income with AI-powered automation across global markets.
          </p>
          <button className="rounded-full bg-white text-blue-600 font-semibold px-8 py-4 hover:bg-blue-50 transition">
            Launch Now
          </button>
        </div>
      </section>
    </div>
  )
}
