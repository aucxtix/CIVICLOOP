import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Truck } from 'lucide-react';

const workers = [
  { id: 'W-01', name: 'Mike Ross', role: 'Driver', zone: 'Zone 4A', status: 'Active', vehicle: 'TRK-204' },
  { id: 'W-02', name: 'Rachel Zane', role: 'Loader', zone: 'Zone 4A', status: 'Active', vehicle: 'TRK-204' },
  { id: 'W-03', name: 'Harvey Specter', role: 'Driver', zone: 'Zone 1B', status: 'Off Duty', vehicle: 'None' },
];

const AdminWorkersPage = () => {
  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Worker Management</h1>
          <p className="text-muted-foreground mt-1">Manage field staff, schedules, and zone assignments.</p>
        </div>
        <Button className="bg-green-600 text-white hover:bg-green-700">Add Worker</Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Active Roster</CardTitle>
          <CardDescription>Current shift staff and assignments.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workers.map((worker) => (
              <div key={worker.id} className="border rounded-xl p-4 hover:border-green-200 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{worker.name}</h3>
                      <p className="text-xs text-muted-foreground">{worker.role}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={worker.status === 'Active' ? 'text-green-600 border-green-200 bg-green-50' : ''}>
                    {worker.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" /> {worker.zone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-slate-400" /> {worker.vehicle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminWorkersPage;
