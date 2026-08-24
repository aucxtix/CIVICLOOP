import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Brain, TrendingUp, TrendingDown, AlertTriangle, MapPin, Activity,
  Flame, Zap, BarChart3, Clock, CheckCircle2, Shield, RefreshCw,
  Globe2, Eye
} from 'lucide-react';
import { toast } from 'sonner';

const WARD_DATA = [
  { ward: 'Ward 1', risk: 90, reports: 24, resolved: 18, trend: 'up',   hotCategory: 'Plastic',  color: 'bg-red-500',    label: 'Critical' },
  { ward: 'Ward 2', risk: 65, reports: 16, resolved: 13, trend: 'down', hotCategory: 'Organic',  color: 'bg-amber-500',  label: 'Moderate' },
  { ward: 'Ward 3', risk: 45, reports: 9,  resolved: 8,  trend: 'down', hotCategory: 'Mixed',    color: 'bg-yellow-400', label: 'Moderate' },
  { ward: 'Ward 4', risk: 20, reports: 5,  resolved: 5,  trend: 'stable', hotCategory: 'Paper',  color: 'bg-green-500',  label: 'Low' },
  { ward: 'Ward 5', risk: 78, reports: 20, resolved: 11, trend: 'up',   hotCategory: 'E-Waste',  color: 'bg-red-400',    label: 'High' },
];

const AI_ALERTS = [
  {
    id: 1, severity: 'critical', icon: '🔥',
    title: 'Surge Predicted — Ward 1',
    detail: 'AI predicts 30% increase in Plastic waste next 48h based on local market schedule. Pre-deploy 2 vehicles.',
    action: 'Pre-Deploy Vehicle',
    time: '2 min ago'
  },
  {
    id: 2, severity: 'warning', icon: '⚠️',
    title: 'Illegal Dumping Cluster — Zone 5B',
    detail: '4 reports from same GPS cluster in 72h. Likely repeat offender. Recommend camera installation.',
    action: 'Flag for Enforcement',
    time: '18 min ago'
  },
  {
    id: 3, severity: 'info', icon: '💡',
    title: 'Route Optimization Available',
    detail: 'Reordering 3 worker routes can save 42km total distance and 2.1 hours today.',
    action: 'Apply Optimization',
    time: '1 hr ago'
  },
];

const WEEKLY_METRICS = [
  { day: 'Mon', reports: 18, resolved: 15 },
  { day: 'Tue', reports: 24, resolved: 22 },
  { day: 'Wed', reports: 31, resolved: 26 },
  { day: 'Thu', reports: 14, resolved: 14 },
  { day: 'Fri', reports: 42, resolved: 35 },
  { day: 'Sat', reports: 55, resolved: 40 },
  { day: 'Sun', reports: 27, resolved: 25 },
];

const maxReports = Math.max(...WEEKLY_METRICS.map(d => d.reports));

const CITY_KPIS = [
  { label: 'City Cleanliness Score', value: '74/100', change: '+3', positive: true, icon: Shield },
  { label: 'Avg Response Time',      value: '4.2 hrs', change: '-0.8hr', positive: true, icon: Clock },
  { label: 'Active Illegal Dumps',   value: '12',      change: '+2', positive: false, icon: AlertTriangle },
  { label: 'Worker Efficiency',      value: '88%',     change: '+5%', positive: true, icon: Zap },
];

const CityIntelligencePage = () => {
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleAction = (alert: typeof AI_ALERTS[0]) => {
    toast.success(`Action taken: ${alert.action}`);
    setDismissedAlerts(prev => [...prev, alert.id]);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Intelligence data refreshed.');
    }, 1500);
  };

  const visibleAlerts = AI_ALERTS.filter(a => !dismissedAlerts.includes(a.id));

  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <Brain className="w-7 h-7 text-violet-500" />
            City Intelligence Center
          </h1>
          <p className="text-muted-foreground mt-1">AI-powered predictive analytics and real-time city health monitoring.</p>
        </div>
        <Button onClick={handleRefresh} variant="outline" className="font-bold" disabled={isRefreshing}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} /> Refresh Data
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {CITY_KPIS.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-sm bg-card hover:shadow-md transition-all hover:-translate-y-1">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <kpi.icon className="w-5 h-5 text-muted-foreground" />
                  <Badge className={`shadow-none text-xs ${kpi.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {kpi.positive ? <TrendingUp className="w-3 h-3 mr-1 inline" /> : <TrendingDown className="w-3 h-3 mr-1 inline" />}
                    {kpi.change}
                  </Badge>
                </div>
                <div className="text-2xl font-black text-foreground">{kpi.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5 font-medium">{kpi.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* AI Alerts Feed */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-black text-foreground mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5 text-violet-500" /> AI Alerts
            {visibleAlerts.length > 0 && (
              <Badge className="bg-red-500 text-white shadow-none">{visibleAlerts.length}</Badge>
            )}
          </h2>
          <div className="space-y-3">
            {visibleAlerts.length === 0 && (
              <Card className="border-dashed border-green-300 bg-green-50 dark:bg-green-950/10">
                <CardContent className="py-8 text-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-green-700 font-semibold text-sm">All clear! No active alerts.</p>
                </CardContent>
              </Card>
            )}
            {visibleAlerts.map((alert, i) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`border shadow-sm ${
                  alert.severity === 'critical' ? 'border-red-300 bg-red-50 dark:bg-red-950/20' :
                  alert.severity === 'warning' ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/20' :
                  'border-blue-200 bg-blue-50 dark:bg-blue-950/20'
                }`}>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xl">{alert.icon}</span>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <div className="font-bold text-sm text-foreground">{alert.title}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{alert.detail}</p>
                    <Button
                      size="sm"
                      onClick={() => handleAction(alert)}
                      className={`w-full font-bold text-xs h-8 mt-1 ${
                        alert.severity === 'critical' ? 'bg-red-500 hover:bg-red-600 text-white' :
                        alert.severity === 'warning' ? 'bg-amber-500 hover:bg-amber-600 text-white' :
                        'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {alert.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ward Risk Heatmap */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-lg font-black text-foreground mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" /> Ward Risk Assessment
            </h2>
            <div className="space-y-3">
              {WARD_DATA.map((ward, i) => (
                <motion.div
                  key={ward.ward}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="border-none shadow-sm bg-card">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="font-bold text-sm text-foreground w-16">{ward.ward}</div>
                        <div className="flex-1">
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${ward.risk}%` }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              className={`h-2.5 rounded-full ${ward.color}`}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {ward.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-red-500" />
                          ) : ward.trend === 'down' ? (
                            <TrendingDown className="w-4 h-4 text-green-500" />
                          ) : (
                            <Activity className="w-4 h-4 text-muted-foreground" />
                          )}
                          <Badge className={`shadow-none text-xs ${
                            ward.label === 'Critical' ? 'bg-red-100 text-red-700' :
                            ward.label === 'High' ? 'bg-orange-100 text-orange-700' :
                            ward.label === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                            'bg-green-100 text-green-700'
                          }`}>{ward.label}</Badge>
                          <span className="text-xs font-bold text-muted-foreground w-8 text-right">{ward.risk}%</span>
                        </div>
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground font-medium">
                        <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> {ward.hotCategory}</span>
                        <span>{ward.reports} reports</span>
                        <span className="text-green-600">{ward.resolved} resolved</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Weekly Volume Chart */}
          <div>
            <h2 className="text-lg font-black text-foreground mb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> Weekly Waste Volume
            </h2>
            <Card className="border-none shadow-sm bg-card">
              <CardContent className="p-5">
                <div className="flex items-end justify-between gap-2 h-40">
                  {WEEKLY_METRICS.map((day, i) => (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex flex-col gap-0.5" style={{ height: '120px', justifyContent: 'flex-end' }}>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(day.reports / maxReports) * 100}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className="w-full bg-primary/20 rounded-t relative overflow-hidden"
                        >
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(day.resolved / day.reports) * 100}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                            className="w-full bg-green-500 absolute bottom-0 rounded-t"
                          />
                        </motion.div>
                      </div>
                      <span className="text-xs font-bold text-muted-foreground">{day.day}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs font-semibold">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary/20 inline-block" /> Reported</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-500 inline-block" /> Resolved</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityIntelligencePage;
