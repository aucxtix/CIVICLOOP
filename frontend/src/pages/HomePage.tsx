import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Leaf, ShieldCheck, Zap, 
  MapPin, Truck, Camera, CheckCircle2, TrendingUp,
  Smartphone, Globe, Recycle, Star, Award
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ModeToggle } from '@/components/mode-toggle';

const LANDING_LEADERBOARD = [
  { rank: 1, name: 'Riya Sharma',    points: 4820, badge: '🌲', city: 'Ward 3' },
  { rank: 2, name: 'Aryan Mehta',    points: 3900, badge: '🌳', city: 'Ward 1' },
  { rank: 3, name: 'Vikram Singh',   points: 3100, badge: '🌿', city: 'Ward 4' },
  { rank: 4, name: 'Priya Nair',     points: 980,  badge: '🌱', city: 'Ward 5' },
  { rank: 5, name: 'Karthik Raj',    points: 720,  badge: '🌱', city: 'Ward 4' },
];

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-green-200">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 lg:px-12 flex items-center justify-between bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="text-primary">
            <img src="/logo.png" alt="CivicLoop Logo" className="w-8 h-8 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight leading-none text-foreground">CivicLoop</span>
            <span className="text-[10px] font-medium text-muted-foreground">Smarter Waste. Cleaner Communities.</span>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-muted-foreground">
          <a href="#" className="text-primary border-b-2 border-primary pb-1">Home</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors pb-1">How It Works</a>
          <a href="#features" className="hover:text-primary transition-colors pb-1">Features</a>
          <a href="#impact" className="hover:text-primary transition-colors pb-1">Community Impact</a>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button asChild variant="outline" className="hidden sm:inline-flex border-border text-foreground hover:bg-secondary hover:text-secondary-foreground hover:border-secondary font-bold rounded-full px-6 transition-all">
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-full px-6 shadow-lg shadow-primary/20">
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-green-100/50 blur-[100px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-50/50 blur-[100px]"></div>
          {/* Subtle city silhouette at bottom */}
          <div className="absolute bottom-0 left-0 w-full h-64 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </div>

        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 space-y-8 z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary-foreground dark:text-yellow-400 text-xs font-bold uppercase tracking-wider">
            <span>AI-Powered</span>
            <span className="w-1 h-1 rounded-full bg-secondary"></span>
            <span>Citizen Driven</span>
            <span className="w-1 h-1 rounded-full bg-secondary"></span>
            <span>Impact Focused</span>
          </div>

          <h1 className="text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[1.05] text-foreground">
            Smarter Waste.<br />
            <span className="text-primary">Cleaner Communities.</span>
          </h1>

          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl font-medium leading-relaxed">
            CivicLoop helps citizens identify, report, manage, and responsibly dispose of waste while turning everyday actions into measurable environmental impact.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-full shadow-xl shadow-primary/20">
              <Link to="/citizen/classify"><Camera className="w-5 h-5 mr-2" /> Classify Waste</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg border-border text-foreground hover:bg-secondary hover:text-secondary-foreground hover:border-secondary font-bold rounded-full bg-card transition-all">
              <Link to="/register">Explore CivicLoop <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-border/60 mt-12">
            {[
              { icon: Zap, title: "AI Classification", desc: "Identify waste correctly with AI accuracy", color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-500/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30" },
              { icon: MapPin, title: "Smart Reporting", desc: "Report garbage or illegal dumping in seconds", color: "text-red-600 bg-red-100 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30" },
              { icon: Truck, title: "Collection Mgmt", desc: "Request pickup and track collection status", color: "text-blue-600 bg-blue-100 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30" },
              { icon: TrendingUp, title: "Track Impact", desc: "Monitor contribution and earn green points", color: "text-green-600 bg-green-100 dark:bg-green-500/20 dark:text-green-400 border-green-200 dark:border-green-500/30" }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                className="flex flex-col items-start"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border mb-3 ${feature.color}`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-sm">{feature.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Content (Dashboard Mockup) */}
        <motion.div 
          style={{ y: y2 }}
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full relative z-10 hidden md:block"
        >
          <div className="relative rounded-3xl bg-card border border-border/60 shadow-2xl shadow-slate-200/50 overflow-hidden">
            {/* Mockup Header */}
            <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-background/50">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="CivicLoop Logo" className="w-5 h-5 object-contain" />
                <span className="font-bold text-foreground">CivicLoop</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-200"></div>
              </div>
            </div>
            
            {/* Mockup Body */}
            <div className="flex h-[600px] bg-background">
              {/* Sidebar */}
              <div className="w-48 border-r border-border bg-card p-4 space-y-2">
                <div className="h-8 rounded bg-primary/10 w-full flex items-center px-3 border-l-4 border-primary"><span className="w-3/4 h-2 bg-primary rounded"></span></div>
                <div className="h-8 rounded w-full flex items-center px-3"><span className="w-2/3 h-2 bg-slate-200 dark:bg-slate-700 rounded"></span></div>
                <div className="h-8 rounded w-full flex items-center px-3"><span className="w-1/2 h-2 bg-slate-200 dark:bg-slate-700 rounded"></span></div>
                <div className="h-8 rounded w-full flex items-center px-3"><span className="w-3/4 h-2 bg-slate-200 dark:bg-slate-700 rounded"></span></div>
                <div className="h-8 rounded w-full flex items-center px-3"><span className="w-2/3 h-2 bg-slate-200 dark:bg-slate-700 rounded"></span></div>
              </div>
              
              {/* Main Area */}
              <div className="flex-1 p-6 space-y-6">
                <div className="w-1/3 h-6 bg-slate-200 rounded-md"></div>
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-24 bg-card rounded-xl border border-border shadow-sm p-4 flex flex-col justify-between">
                      <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                      <div className="w-1/2 h-4 bg-slate-200 rounded"></div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-6">
                  <div className="flex-[2] h-64 bg-green-800 rounded-2xl p-6 relative overflow-hidden">
                     <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-green-600 rounded-full blur-3xl opacity-50"></div>
                     <div className="w-1/2 h-6 bg-card/20 rounded mb-4"></div>
                     <div className="w-1/3 h-4 bg-card/20 rounded mb-8"></div>
                     <div className="w-32 h-10 bg-card rounded-lg"></div>
                  </div>
                  <div className="flex-[1] h-64 bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
                     <div className="w-1/2 h-4 bg-slate-200 rounded mb-4"></div>
                     <div className="flex gap-3"><div className="w-8 h-8 rounded-full bg-slate-100"></div><div className="flex-1 h-8 bg-slate-100 rounded"></div></div>
                     <div className="flex gap-3"><div className="w-8 h-8 rounded-full bg-slate-100"></div><div className="flex-1 h-8 bg-slate-100 rounded"></div></div>
                     <div className="flex gap-3"><div className="w-8 h-8 rounded-full bg-slate-100"></div><div className="flex-1 h-8 bg-slate-100 rounded"></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Floating UI Elements */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-12 top-1/4 bg-card p-4 rounded-2xl shadow-xl border border-border flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><CheckCircle2 /></div>
            <div>
              <p className="text-sm font-bold text-foreground">Glass Bottle Classified</p>
              <p className="text-xs text-green-600 font-bold">+20 Green Points</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Info Sections */}
      <div className="bg-card py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <motion.div 
            id="how-it-works"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-2">How <span className="text-primary">CivicLoop</span> Works</h2>
            <p className="text-muted-foreground mb-10">A simple 4-step process that creates a cleaner tomorrow.</p>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {[
                { step: "1. Capture", icon: Camera, desc: "Capture or upload a photo of the waste.", color: "text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-500/30" },
                { step: "2. Classify", icon: Zap, desc: "AI identifies the waste type and best disposal method.", color: "text-yellow-600 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-500/30" },
                { step: "3. Act", icon: Truck, desc: "Report, request pickup, or find a nearby collection point.", color: "text-red-600 border-red-200 bg-red-50 dark:bg-red-900/30 dark:text-red-400 dark:border-red-500/30" },
                { step: "4. Track Impact", icon: Leaf, desc: "Track your actions and earn green points.", color: "text-green-600 border-green-200 bg-green-50 dark:bg-green-900/30 dark:text-green-400 dark:border-green-500/30" }
              ].map((item, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-background border border-border shadow-sm transition-all hover:shadow-md hover:border-primary/50">
                    <h3 className="font-bold text-foreground text-lg mb-1">{item.step}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            id="features"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-2">Why Choose <span className="text-primary">CivicLoop</span>?</h2>
            <p className="text-muted-foreground mb-10">Built for scale, designed for impact.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Easy to Use", desc: "Simple, intuitive and designed for everyone.", icon: Smartphone, color: "text-blue-500 bg-blue-100 dark:bg-blue-500/20" },
                { title: "AI-Powered", desc: "High accuracy waste classification.", icon: Zap, color: "text-yellow-500 bg-yellow-100 dark:bg-yellow-500/20" },
                { title: "Community Driven", desc: "Stronger together for cleaner neighborhoods.", icon: Globe, color: "text-primary bg-primary/10 dark:bg-primary/20" },
                { title: "Verified & Transparent", desc: "Real-time tracking and verified actions.", icon: ShieldCheck, color: "text-indigo-500 bg-indigo-100 dark:bg-indigo-500/20" },
                { title: "Rewards & Impact", desc: "Earn green points and redeem exciting rewards.", icon: TrendingUp, color: "text-green-500 bg-green-100 dark:bg-green-500/20" },
                { title: "Sustainable Future", desc: "Small actions today lead to a big impact tomorrow.", icon: Recycle, color: "text-red-500 bg-red-100 dark:bg-red-500/20" }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-background rounded-2xl p-6 border border-border flex items-start gap-4 hover:border-primary/50 transition-all shadow-sm hover:shadow-md"
                >
                  <div className={`p-3 rounded-xl shadow-sm shrink-0 ${feature.color}`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Community Leaderboard Section */}
      <div className="bg-background py-24 relative z-20 border-t border-border/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Top <span className="text-primary">Community</span> Contributors</h2>
            <p className="text-muted-foreground">Recognizing the citizens making the biggest impact in our city this month.</p>
          </div>
          
          <div className="bg-card rounded-3xl border border-border/60 shadow-2xl p-2 sm:p-6 overflow-hidden">
            <div className="divide-y divide-border">
              {LANDING_LEADERBOARD.map((entry, i) => (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 px-4 py-4 hover:bg-muted/50 rounded-2xl transition-colors"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shadow-sm ${
                    entry.rank === 1 ? 'bg-amber-100 text-amber-600' :
                    entry.rank === 2 ? 'bg-slate-100 text-slate-600' :
                    entry.rank === 3 ? 'bg-orange-100 text-orange-600' : 'bg-muted text-muted-foreground'
                  }`}>
                    {entry.rank <= 3 ? ['🥇','🥈','🥉'][entry.rank - 1] : `#${entry.rank}`}
                  </div>
                  <div className="text-3xl hidden sm:block">{entry.badge}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-lg text-foreground truncate">{entry.name}</div>
                    <div className="text-sm text-muted-foreground truncate">{entry.city}</div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-primary/10 px-4 py-2 rounded-full">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="font-black text-primary">{entry.points.toLocaleString()} <span className="text-xs font-bold hidden sm:inline">pts</span></span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button asChild variant="ghost" className="font-bold text-primary hover:text-primary hover:bg-primary/10 rounded-full">
                <Link to="/register">Join the Leaderboard <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <motion.div 
        id="impact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-primary text-primary-foreground py-12"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <img src="/logo.png" alt="CivicLoop Logo" className="w-12 h-12 object-contain" />
            <div>
              <h2 className="text-2xl font-bold text-white">Make your next disposal decision smarter.</h2>
              <p className="text-primary-foreground/80 text-sm mt-1">Join thousands of citizens making a real difference in their communities.</p>
            </div>
          </div>
          <div className="flex gap-4 w-full lg:w-auto">
            <Button asChild size="lg" className="w-full lg:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold rounded-full shadow-lg">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full lg:w-auto border-primary-foreground/30 text-white hover:bg-white hover:text-primary font-bold rounded-full bg-transparent transition-colors">
              <a href="#how-it-works">Learn More</a>
            </Button>
          </div>
          <div className="flex gap-8 border-t lg:border-t-0 lg:border-l border-primary-foreground/20 pt-8 lg:pt-0 lg:pl-8 w-full lg:w-auto justify-between">
             <div className="text-center">
               <div className="text-2xl font-black">10K+</div>
               <div className="text-xs text-secondary uppercase tracking-wider font-bold mt-1">Active Citizens</div>
             </div>
             <div className="text-center">
               <div className="text-2xl font-black">25K+</div>
               <div className="text-xs text-secondary uppercase tracking-wider font-bold mt-1">Reports</div>
             </div>
             <div className="text-center">
               <div className="text-2xl font-black">1.5M+</div>
               <div className="text-xs text-secondary uppercase tracking-wider font-bold mt-1">kg Managed</div>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
