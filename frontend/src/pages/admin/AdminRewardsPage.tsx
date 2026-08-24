import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Edit, Trash2, Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';
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

  const handleAddReward = async () => {
    const name = prompt('Enter Reward Name:');
    if (!name) return;
    const credits = prompt('Enter Credits Required (e.g., 500):');
    if (!credits) return;
    const stock = prompt('Enter Stock Quantity:');
    if (!stock) return;
    const partner = prompt('Enter Partner Name:');
    
    try {
      await api.post('/rewards', {
        name,
        description: `Get ${name} from ${partner || 'our partners'}.`,
        creditsRequired: credits,
        stock: stock,
        partner: partner || 'Internal'
      });
      toast.success('Reward added successfully');
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
        <Button onClick={handleAddReward} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> Add Reward
        </Button>
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
