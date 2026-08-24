import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Gift, Trophy, Star, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const rewardsList = [
  { title: '$5 Transit Pass', desc: 'Partner: City Transit', pts: 500, color: 'bg-blue-50 text-blue-600' },
  { title: 'Free Coffee', desc: 'Partner: Local Cafe', pts: 200, color: 'bg-amber-50 text-amber-600' },
  { title: 'Reusable Water Bottle', desc: 'Partner: EcoStore', pts: 1200, color: 'bg-green-50 text-green-600' }
];

const GreenPointsPage = () => {
  const [balance, setBalance] = useState(1250);
  const [selectedReward, setSelectedReward] = useState<typeof rewardsList[0] | null>(null);

  const handleRedeem = () => {
    if (!selectedReward) return;
    
    if (balance >= selectedReward.pts) {
      setBalance(prev => prev - selectedReward.pts);
      toast.success(`Successfully redeemed ${selectedReward.title}!`);
    } else {
      toast.error('Insufficient points to redeem this reward.');
    }
    setSelectedReward(null);
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Green Points</h1>
        <p className="text-muted-foreground mt-2">Earn points for sustainable actions and redeem them for rewards.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="border-none shadow-md bg-gradient-to-b from-[#0F5A29] to-[#15803D] text-white overflow-hidden relative">
            <div className="absolute right-[-20px] top-[-20px] opacity-10">
              <Leaf className="w-40 h-40" />
            </div>
            <CardContent className="p-8 relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-card/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/30">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <p className="text-green-100 font-medium mb-1 uppercase tracking-wider text-xs">Current Balance</p>
              <h2 className="text-6xl font-black mb-6">{balance.toLocaleString()}</h2>
              <Button className="w-full bg-card text-primary hover:bg-accent font-bold shadow-lg" onClick={() => toast.info('Please select a reward from the list below.')}>
                Redeem Points
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" /> Available Rewards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewardsList.map((reward, i) => (
              <Card 
                key={i} 
                className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => setSelectedReward(reward)}
              >
                <CardContent className="p-5 flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${reward.color}`}>
                    <Gift className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{reward.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{reward.desc}</p>
                    <div className="mt-3 flex items-center gap-1 text-sm font-bold text-primary">
                      {reward.pts} pts <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Card className="border-none shadow-sm mt-8">
        <CardHeader>
          <CardTitle>How to earn points?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-background rounded-xl border border-border">
              <Star className="w-8 h-8 text-amber-400 mb-3" />
              <h4 className="font-bold text-foreground">Scan & Sort</h4>
              <p className="text-sm text-muted-foreground mt-2">+10 points per correct AI classification.</p>
            </div>
            <div className="text-center p-6 bg-background rounded-xl border border-border">
              <Star className="w-8 h-8 text-amber-400 mb-3" />
              <h4 className="font-bold text-foreground">Report Issues</h4>
              <p className="text-sm text-muted-foreground mt-2">+50 points for reporting illegal dumping.</p>
            </div>
            <div className="text-center p-6 bg-background rounded-xl border border-border">
              <Star className="w-8 h-8 text-amber-400 mb-3" />
              <h4 className="font-bold text-foreground">Consistent Recycling</h4>
              <p className="text-sm text-muted-foreground mt-2">+100 points for a 4-week recycling streak.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!selectedReward} onOpenChange={(open) => !open && setSelectedReward(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Redemption</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to redeem <strong>{selectedReward?.title}</strong> for <strong>{selectedReward?.pts} points</strong>? This action is final and cannot be revoked.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRedeem} className="bg-primary text-primary-foreground hover:bg-primary/90">Confirm & Redeem</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default GreenPointsPage;