import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Leaf, TreePine, Droplets, Wind, Zap, Award, Target, 
  TrendingUp, Globe2, Share2, CheckCircle2, Flame, Star
} from 'lucide-react';
import { toast } from 'sonner';

const ECO_LEVELS = [
  { level: 1, name: 'Seedling',    minPoints: 0,    color: 'from-green-400 to-emerald-500',   textColor: 'text-emerald-500', icon: '🌱' },
  { level: 2, name: 'Sapling',     minPoints: 200,  color: 'from-emerald-400 to-teal-500',    textColor: 'text-teal-500',    icon: '🌿' },
  { level: 3, name: 'Tree',        minPoints: 500,  color: 'from-teal-400 to-cyan-500',       textColor: 'text-cyan-600',    icon: '🌳' },
  { level: 4, name: 'Forest',      minPoints: 1000, color: 'from-cyan-400 to-blue-500',       textColor: 'text-blue-500',    icon: '🌲' },
  { level: 5, name: 'Rainforest',  minPoints: 2000, color: 'from-blue-400 to-indigo-500',     textColor: 'text-indigo-500',  icon: '🏔️' },
];

const CHALLENGES = [
  { id: 1, title: 'First Responder',      desc: 'Report 3 illegal dumps this week',         progress: 2, target: 3,  reward: 150, icon: '🚨', done: false },
  { id: 2, title: 'Green Streak',         desc: 'Log activity for 7 days in a row',         progress: 7, target: 7,  reward: 300, icon: '🔥', done: true  },
  { id: 3, title: 'Community Champion',   desc: 'Get 5 of your reports verified',           progress: 3, target: 5,  reward: 500, icon: '🏆', done: false },
  { id: 4, title: 'Zero Waste Pioneer',   desc: 'Classify 10 items correctly',              progress: 8, target: 10, reward: 200, icon: '♻️', done: false },
];

const ECO_STATS = [
  { label: 'CO₂ Prevented',   value: '48 kg',   icon: Wind,     color: 'text-sky-500',    bg: 'bg-sky-100' },
  { label: 'Water Saved',     value: '320 L',   icon: Droplets, color: 'text-blue-500',   bg: 'bg-blue-100' },
  { label: 'Trees Equivalent',value: '2.4',     icon: TreePine, color: 'text-green-600',  bg: 'bg-green-100' },
  { label: 'Energy Saved',    value: '86 kWh',  icon: Zap,      color: 'text-amber-500',  bg: 'bg-amber-100' },
];

const LEADERBOARD = [
  { rank: 1, name: 'Riya Sharma',    points: 4820, badge: '🌲', city: 'Ward 3' },
  { rank: 2, name: 'Aryan Mehta',    points: 3900, badge: '🌳', city: 'Ward 1' },
  { rank: 3, name: 'You',            points: 1250, badge: '🌿', city: 'Ward 2', isYou: true },
  { rank: 4, name: 'Priya Nair',     points: 980,  badge: '🌱', city: 'Ward 5' },
  { rank: 5, name: 'Karthik Raj',    points: 720,  badge: '🌱', city: 'Ward 4' },
];

const EcoImpactPage = () => {
  const [civicCredits] = useState(1250);
  const [showShareModal, setShowShareModal] = useState(false);
  const [claimedChallenge, setClaimedChallenge] = useState<number | null>(null);

  const currentLevel = ECO_LEVELS.reduce((prev, curr) =>
    civicCredits >= curr.minPoints ? curr : prev, ECO_LEVELS[0]);
  const nextLevel = ECO_LEVELS[ECO_LEVELS.indexOf(currentLevel) + 1];
  const progressToNext = nextLevel
    ? ((civicCredits - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
    : 100;

  const handleClaimChallenge = (id: number, reward: number) => {
    setClaimedChallenge(id);
    toast.success(`🎉 +${reward} Green Points earned!`);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(`I'm a Level ${currentLevel.level} ${currentLevel.name} on CivicLoop with ${civicCredits} Green Points! Join me in cleaning our city 🌱`);
    toast.success('Achievement copied to clipboard!');
    setShowShareModal(false);
  };

  return (
    <div className="w-full space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Eco Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl"
      >
        <div className={`bg-gradient-to-br ${currentLevel.color} p-8 text-white relative`}>
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <Globe2 className="w-full h-full" />
          </div>
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/80 font-semibold text-sm uppercase tracking-widest">Your Eco Level</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-5xl">{currentLevel.icon}</span>
                  <div>
                    <h2 className="text-4xl font-black">{currentLevel.name}</h2>
                    <p className="text-white/80">Level {currentLevel.level} Eco Warrior</p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setShowShareModal(true)}
                className="bg-white/20 hover:bg-white/30 text-white border-none font-bold backdrop-blur-sm"
              >
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span>{civicCredits.toLocaleString()} pts</span>
                {nextLevel && <span>{nextLevel.minPoints.toLocaleString()} pts → {nextLevel.name}</span>}
              </div>
              <div className="w-full bg-white/30 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNext}%` }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  className="bg-white h-3 rounded-full shadow-sm"
                />
              </div>
              {nextLevel && (
                <p className="text-white/70 text-xs mt-1">{nextLevel.minPoints - civicCredits} pts to reach {nextLevel.name}</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Real World Impact Stats */}
      <div>
        <h2 className="text-xl font-black text-foreground mb-4 flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-green-500" /> Your Real World Impact
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ECO_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-none shadow-sm hover:shadow-md transition-all hover:-translate-y-1 bg-card">
                <CardContent className="p-5 text-center">
                  <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs font-semibold text-muted-foreground mt-1">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Challenges */}
        <div>
          <h2 className="text-xl font-black text-foreground mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-500" /> Active Challenges
          </h2>
          <div className="space-y-3">
            {CHALLENGES.map((ch, i) => (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`border shadow-sm ${ch.done ? 'border-green-300 bg-green-50 dark:bg-green-950/20' : 'border-border bg-card'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{ch.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="font-bold text-foreground text-sm">{ch.title}</span>
                          <Badge className="bg-amber-100 text-amber-700 shadow-none text-xs shrink-0">
                            +{ch.reward} pts
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{ch.desc}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-1.5">
                            <div
                              className="bg-green-500 h-1.5 rounded-full transition-all"
                              style={{ width: `${(ch.progress / ch.target) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-muted-foreground">{ch.progress}/{ch.target}</span>
                          {ch.done && claimedChallenge !== ch.id && (
                            <Button
                              size="sm"
                              onClick={() => handleClaimChallenge(ch.id, ch.reward)}
                              className="h-6 text-xs bg-green-500 hover:bg-green-600 text-white font-bold px-2"
                            >
                              Claim!
                            </Button>
                          )}
                          {(ch.done && claimedChallenge === ch.id) && (
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* City Leaderboard */}
        <div>
          <h2 className="text-xl font-black text-foreground mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" /> City Leaderboard
          </h2>
          <Card className="border-none shadow-sm">
            <CardContent className="p-0 divide-y divide-border">
              {LEADERBOARD.map((entry, i) => (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-center gap-3 px-4 py-3 ${entry.isYou ? 'bg-primary/5 border-l-2 border-primary' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                    entry.rank === 1 ? 'bg-amber-100 text-amber-600' :
                    entry.rank === 2 ? 'bg-slate-100 text-slate-600' :
                    entry.rank === 3 ? 'bg-orange-100 text-orange-600' : 'bg-muted text-muted-foreground'
                  }`}>
                    {entry.rank <= 3 ? ['🥇','🥈','🥉'][entry.rank - 1] : `#${entry.rank}`}
                  </div>
                  <span className="text-lg">{entry.badge}</span>
                  <div className="flex-1">
                    <div className={`font-bold text-sm ${entry.isYou ? 'text-primary' : 'text-foreground'}`}>
                      {entry.name} {entry.isYou && <span className="text-xs font-normal text-muted-foreground">(You)</span>}
                    </div>
                    <div className="text-xs text-muted-foreground">{entry.city}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-black text-sm text-foreground">{entry.points.toLocaleString()}</span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl p-6 shadow-2xl max-w-sm w-full border border-border"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">{currentLevel.icon}</div>
                <h3 className="text-2xl font-black text-foreground">{currentLevel.name}</h3>
                <p className="text-muted-foreground mt-1 text-sm">Level {currentLevel.level} Eco Warrior • {civicCredits} points</p>
              </div>
              <div className="bg-muted rounded-xl p-3 text-sm text-muted-foreground text-center mb-4">
                "I'm a Level {currentLevel.level} {currentLevel.name} on CivicLoop with {civicCredits} Green Points!"
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowShareModal(false)} className="flex-1 font-bold">Close</Button>
                <Button onClick={handleShare} className="flex-1 font-bold bg-green-500 hover:bg-green-600 text-white">
                  <Share2 className="w-4 h-4 mr-1" /> Copy
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EcoImpactPage;
