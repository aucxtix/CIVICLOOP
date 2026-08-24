import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

const verifications = [
  { id: 'VER-001', user: 'Sarah Jenkins', type: 'Reward Claim', amount: '500 pts', status: 'pending', date: '2 hours ago' },
  { id: 'VER-002', user: 'Michael Chen', type: 'AI Classification Override', amount: '-', status: 'pending', date: '5 hours ago' },
  { id: 'VER-003', user: 'Emma Wilson', type: 'New Collection Point', amount: '-', status: 'approved', date: '1 day ago' },
];

const AdminVerificationsPage = () => {
  const handleAction = (id: string, action: string) => {
    toast.success(`Verification ${id} ${action} successfully`);
  };

  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Verifications</h1>
        <p className="text-muted-foreground mt-1">Review pending user claims and manual overrides.</p>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Pending Queue</CardTitle>
          <CardDescription>Items awaiting administrative review.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {verifications.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-background transition-colors">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-foreground">{item.id}</span>
                    <Badge variant={item.status === 'pending' ? 'outline' : 'default'} className={item.status === 'pending' ? 'text-amber-600 bg-amber-50 border-amber-200' : 'bg-green-100 text-green-700'}>
                      {item.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{item.user}</span> • {item.type} {item.amount !== '-' && `(${item.amount})`}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" /> {item.date}
                  </div>
                </div>
                {item.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleAction(item.id, 'rejected')}>
                      <XCircle className="w-4 h-4 mr-1" /> Reject
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleAction(item.id, 'approved')}>
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Approve
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVerificationsPage;
