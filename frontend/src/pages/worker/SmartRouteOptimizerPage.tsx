import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Navigation, MapPin, CheckCircle2, Clock, Zap, BarChart3,
  Flame, Trophy, ArrowRight, AlertTriangle, Radio, Package
} from 'lucide-react';
import { toast } from 'sonner';

const TASKS = [
  {
    id: 1, order: 1, zone: 'Zone 4A', address: '42 Green St, Near Metro',
    category: 'Plastic', priority: 'HIGH', estimatedTime: '12 min',
    distance: '0.8 km', status: 'CURRENT', points: 80,
    lat: 40.7150, lng: -74.0100, hazard: null,
  },
  {
    id: 2, order: 2, zone: 'Zone 4B', address: '118 Market Road',
    category: 'E-Waste', priority: 'HIGH', estimatedTime: '8 min',
    distance: '1.2 km', status: 'UPCOMING', points: 120,
    lat: 40.7160, lng: -74.0130, hazard: 'Wear gloves — reported sharp edges',
  },
  {
    id: 3, order: 3, zone: 'Zone 3C', address: 'Behind City Mall, Gate 2',
    category: 'Organic', priority: 'NORMAL', estimatedTime: '15 min',
    distance: '2.4 km', status: 'UPCOMING', points: 60,
    lat: 40.7120, lng: -74.0090, hazard: null,
  },
  {
    id: 4, order: 4, zone: 'Zone 2A', address: 'Riverside Park South Entrance',
    category: 'Mixed', priority: 'NORMAL', estimatedTime: '20 min',
    distance: '3.1 km', status: 'UPCOMING', points: 70,
    lat: 40.7090, lng: -74.0060, hazard: null,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Plastic':  'bg-blue-100 text-blue-700',
  'E-Waste':  'bg-purple-100 text-purple-700',
  'Organic':  'bg-green-100 text-green-700',
  'Mixed':    'bg-orange-100 text-orange-700',
};

const SmartRouteOptimizerPage = () => {
  const [tasks, setTasks] = useState(TASKS);
  const [sessionPoints, setSessionPoints] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const current = tasks.find(t => t.status === 'CURRENT');

  const handleMarkDone = () => {
    if (!current) return;
    const earned = current.points;
    setSessionPoints(p => p + earned);
    setCompletedCount(c => c + 1);
    toast.success(`✅ Task completed! +${earned} pts earned`);

    setTasks(prev => {
      const updated = prev.map(t => t.id === current.id ? { ...t, status: 'DONE' } : t);
      const nextUpcoming = updated.find(t => t.status === 'UPCOMING');
      if (nextUpcoming) return updated.map(t => t.id === nextUpcoming.id ? { ...t, status: 'CURRENT' } : t);
      return updated;
    });
  };

  const handleSkip = () => {
    toast('Task skipped — supervisor notified.', { icon: '⚠️' });
  };

  const totalTasks = tasks.length;
  const doneCount = tasks.filter(t => t.status === 'DONE').length;
  const progressPct = Math.round((doneCount / totalTasks) * 100);
  const totalEst = tasks.filter(t => t.status !== 'DONE').reduce((acc) => acc + 15, 0);

  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <Zap className="w-7 h-7 text-amber-500" />
            Smart Route Optimizer
          </h1>
          <p className="text-muted-foreground mt-1">AI-optimized pickup sequence for maximum efficiency.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full font-bold text-sm">
            <Flame className="w-4 h-4" /> {sessionPoints} pts today
          </div>
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-bold text-sm">
            <Trophy className="w-4 h-4" /> {completedCount}/{totalTasks} done
          </div>
        </div>
      </div>

      {/* Session Progress Bar */}
      <Card className="border-none shadow-sm bg-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-foreground">Session Progress</span>
            <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> ~{totalEst} min left</span>
              <span className="flex items-center gap-1"><BarChart3 className="w-3.5 h-3.5" /> {progressPct}% complete</span>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.8 }}
              className="bg-green-500 h-3 rounded-full"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Active Task Card */}
        <div className="lg:col-span-2 space-y-4">
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-2 border-primary shadow-lg bg-card relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary/10 text-primary shadow-none font-bold">
                      <Radio className="w-3 h-3 mr-1 animate-pulse" /> ACTIVE TASK #{current.order}
                    </Badge>
                    <Badge className="bg-red-100 text-red-700 shadow-none font-bold text-xs">
                      {current.priority} PRIORITY
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-black text-foreground mt-2">{current.zone}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground font-medium">{current.address}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-background rounded-xl p-3 text-center border border-border">
                      <Badge className={`${CATEGORY_COLORS[current.category]} shadow-none text-xs mb-1`}>{current.category}</Badge>
                      <p className="text-xs text-muted-foreground font-medium">Type</p>
                    </div>
                    <div className="bg-background rounded-xl p-3 text-center border border-border">
                      <div className="font-black text-foreground">{current.estimatedTime}</div>
                      <p className="text-xs text-muted-foreground font-medium">ETA</p>
                    </div>
                    <div className="bg-background rounded-xl p-3 text-center border border-border">
                      <div className="font-black text-amber-500">+{current.points}</div>
                      <p className="text-xs text-muted-foreground font-medium">Points</p>
                    </div>
                  </div>

                  {current.hazard && (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-orange-700 font-medium">{current.hazard}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={handleMarkDone}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold shadow-md h-11"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Mark Complete
                    </Button>
                    <Button variant="outline" onClick={handleSkip} className="font-bold h-11 px-4">
                      Skip
                    </Button>
                    <Button className="font-bold h-11 px-4 bg-primary text-white">
                      <Navigation className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {!current && (
            <Card className="border-2 border-green-400 shadow-lg bg-green-50 dark:bg-green-950/20">
              <CardContent className="py-12 text-center">
                <div className="text-5xl mb-3">🎉</div>
                <h3 className="text-2xl font-black text-green-700">Route Complete!</h3>
                <p className="text-green-600 mt-1">You earned <strong>{sessionPoints} points</strong> this session. Great work!</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Upcoming Task Queue */}
        <div>
          <h3 className="font-black text-foreground mb-3 flex items-center gap-2">
            <Package className="w-4 h-4 text-primary" /> Upcoming Queue
          </h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: task.status === 'DONE' ? 0.5 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`border shadow-sm transition-all ${
                  task.status === 'CURRENT' ? 'border-primary bg-primary/5' :
                  task.status === 'DONE' ? 'border-green-300 bg-green-50 dark:bg-green-950/10' : 'border-border bg-card'
                }`}>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-black ${
                        task.status === 'DONE' ? 'bg-green-100 text-green-600' :
                        task.status === 'CURRENT' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        {task.status === 'DONE' ? '✓' : task.order}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-foreground truncate">{task.zone}</div>
                        <div className="text-xs text-muted-foreground truncate">{task.address}</div>
                      </div>
                      <div className="text-xs font-bold text-amber-500 shrink-0">+{task.points}</div>
                    </div>
                    {task.hazard && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-orange-600 font-medium">
                        <AlertTriangle className="w-3 h-3" /> Hazard alert
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartRouteOptimizerPage;
