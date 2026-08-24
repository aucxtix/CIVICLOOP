import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Truck, Leaf, Gift } from 'lucide-react';

const NotificationsPage = () => {
  const notifications = [
    { id: 1, type: 'pickup', title: 'Pickup Scheduled', message: 'Your waste pickup is scheduled for tomorrow between 8am and 10am.', time: '2 hours ago', icon: Truck, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 2, type: 'reward', title: 'Green Points Earned', message: 'You earned 50 green points for correctly sorting recyclables!', time: '1 day ago', icon: Leaf, color: 'text-green-500', bg: 'bg-green-100' },
    { id: 3, type: 'alert', title: 'New Reward Available', message: 'A new reward from City Transit has been added to the catalog.', time: '3 days ago', icon: Gift, color: 'text-purple-500', bg: 'bg-purple-100' },
  ];

  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">Updates on your activity and community events.</p>
        </div>
        <Button variant="outline" className="text-muted-foreground">Mark all as read</Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex gap-4 p-4 border rounded-xl hover:bg-background transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.bg} ${notif.color}`}>
                  <notif.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-foreground">{notif.title}</h4>
                    <span className="text-xs text-slate-400 font-medium">{notif.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;