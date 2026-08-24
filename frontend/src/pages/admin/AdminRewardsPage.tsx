import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Edit, Trash2 } from 'lucide-react';

const AdminRewardsPage = () => {
  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Rewards Catalog</h1>
          <p className="text-muted-foreground mt-1">Manage green point redemption items and partners.</p>
        </div>
        <Button className="bg-green-600 text-white hover:bg-green-700">Add Reward</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: '$5 Transit Pass', points: '500 pts', partner: 'City Transit' },
          { title: 'Free Coffee', points: '200 pts', partner: 'Local Cafe' },
          { title: 'Reusable Water Bottle', points: '1200 pts', partner: 'EcoStore' },
        ].map((reward, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 border-b border-slate-50 mb-3">
              <CardTitle className="flex justify-between items-start">
                <span>{reward.title}</span>
                <Gift className="w-5 h-5 text-green-500" />
              </CardTitle>
              <CardDescription>{reward.partner}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-foreground">{reward.points}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50"><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminRewardsPage;
