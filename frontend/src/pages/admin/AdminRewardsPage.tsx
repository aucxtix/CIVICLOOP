import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Edit, Trash2, Loader2, Plus, Star } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';

interface Reward {
  id: string;
  name: string;
  description: string;
  creditsRequired: number;
  stock: number;
  partner: string;
  isActive: boolean;
}

const AdminRewardsPage = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const response = await api.get('/rewards/all');
      setRewards(response.data);
    } catch (error) {
      toast.error('Failed to load rewards');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this reward?')) return;
    try {
      await api.delete(`/rewards/${id}`);
      toast.success('Reward deleted');
      fetchRewards();
    } catch (error) {
      toast.error('Failed to delete reward');
    }
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReward, setNewReward] = useState({ name: '', credits: '', stock: '', partner: '' });

  const handleAddReward = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReward.name || !newReward.credits || !newReward.stock) return;
    
    try {
      await api.post('/rewards', {
        name: newReward.name,
        description: `Get ${newReward.name} from ${newReward.partner || 'our partners'}.`,
        creditsRequired: newReward.credits,
        stock: newReward.stock,
        partner: newReward.partner || 'Internal'
      });
      toast.success('Reward added successfully');
      setNewReward({ name: '', credits: '', stock: '', partner: '' });
      setIsDialogOpen(false);
      fetchRewards();
    } catch (error) {
      toast.error('Failed to add reward');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Rewards Catalog</h1>
          <p className="text-muted-foreground mt-1">Manage green point redemption items and partners.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm font-bold">
              <Plus className="w-4 h-4 mr-2" /> Add Reward
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] overflow-hidden p-0 border-none bg-card shadow-2xl">
            <div className="bg-gradient-to-r from-amber-500/20 to-amber-500/5 p-6 border-b border-border/50 relative overflow-hidden">
              <div className="absolute top-[-20px] right-[-20px] opacity-10 rotate-12 scale-150">
                <Gift className="w-40 h-40 text-amber-500" />
              </div>
              <DialogHeader className="relative z-10">
                <DialogTitle className="text-2xl font-black text-foreground flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  New Reward
                </DialogTitle>
                <DialogDescription className="text-muted-foreground font-medium">
                  Create a new incentive for citizens to redeem with Green Points.
                </DialogDescription>
              </DialogHeader>
            </div>
            
            <form onSubmit={handleAddReward} className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2 group">
                  <label htmlFor="name" className="text-sm font-bold text-foreground group-focus-within:text-amber-500 transition-colors">
                    Reward Name
                  </label>
                  <Input 
                    id="name"
                    placeholder="e.g., Free Coffee" 
                    value={newReward.name}
                    onChange={(e) => setNewReward({...newReward, name: e.target.value})}
                    className="bg-background/50 border-border/60 focus:border-amber-500 focus:ring-amber-500/20 transition-all shadow-sm h-11"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 group">
                    <label htmlFor="credits" className="text-sm font-bold text-foreground group-focus-within:text-amber-500 transition-colors">
                      Points Cost
                    </label>
                    <Input 
                      id="credits"
                      type="number"
                      placeholder="e.g., 500" 
                      value={newReward.credits}
                      onChange={(e) => setNewReward({...newReward, credits: e.target.value})}
                      className="bg-background/50 border-border/60 focus:border-amber-500 focus:ring-amber-500/20 transition-all font-mono shadow-sm h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label htmlFor="stock" className="text-sm font-bold text-foreground group-focus-within:text-amber-500 transition-colors">
                      Initial Stock
                    </label>
                    <Input 
                      id="stock"
                      type="number"
                      placeholder="e.g., 100" 
                      value={newReward.stock}
                      onChange={(e) => setNewReward({...newReward, stock: e.target.value})}
                      className="bg-background/50 border-border/60 focus:border-amber-500 focus:ring-amber-500/20 transition-all font-mono shadow-sm h-11"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label htmlFor="partner" className="text-sm font-bold text-foreground group-focus-within:text-amber-500 transition-colors">
                    Partner / Sponsor
                  </label>
                  <Input 
                    id="partner"
                    placeholder="e.g., Local Cafe" 
                    value={newReward.partner}
                    onChange={(e) => setNewReward({...newReward, partner: e.target.value})}
                    className="bg-background/50 border-border/60 focus:border-amber-500 focus:ring-amber-500/20 transition-all shadow-sm h-11"
                  />
                </div>
              </div>
              
              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1 font-bold">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 font-bold shadow-md bg-amber-500 hover:bg-amber-600 text-white">
                  Create Reward
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {rewards.length === 0 ? (
        <Card className="border-dashed bg-background shadow-none">
          <CardContent className="flex flex-col items-center justify-center py-24 text-center">
             <div className="w-16 h-16 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center mb-4">
                <Gift className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-bold text-foreground mb-2">No rewards yet</h3>
             <p className="text-muted-foreground text-sm max-w-sm mb-4">
               Add your first reward to incentivize citizens.
             </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <Card key={reward.id} className={`border-none shadow-sm hover:shadow-md transition-shadow ${!reward.isActive ? 'opacity-60 grayscale' : ''}`}>
              <CardHeader className="pb-3 border-b border-border mb-3">
                <CardTitle className="flex justify-between items-start">
                  <span>{reward.name}</span>
                  <Gift className="w-5 h-5 text-primary" />
                </CardTitle>
                <CardDescription>{reward.partner}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-muted-foreground">Stock: {reward.stock}</span>
                  <span className="text-xs font-semibold text-muted-foreground">{reward.isActive ? 'Active' : 'Inactive'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-foreground">{reward.creditsRequired} pts</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(reward.id)} className="h-8 w-8 text-red-600 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRewardsPage;
