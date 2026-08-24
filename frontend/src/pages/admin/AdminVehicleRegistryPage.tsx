import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Users, Activity, Navigation, Settings } from 'lucide-react';
import { toast } from 'sonner';

const AdminVehicleRegistryPage = () => {
  const [vehicles, setVehicles] = useState([
    { id: 'V-001', model: 'Volvo FL Electric', plate: 'MH 01 EA 1234', status: 'Active', assignedTo: 'Michael Scott', capacity: '80%', location: 'Zone 4A' },
    { id: 'V-002', model: 'Tata Ultra E.9', plate: 'MH 02 EB 5678', status: 'Idle', assignedTo: 'Unassigned', capacity: '0%', location: 'Depot' },
    { id: 'V-003', model: 'Ashok Leyland Boss', plate: 'MH 03 EC 9012', status: 'Maintenance', assignedTo: 'Unassigned', capacity: '-', location: 'Garage' },
    { id: 'V-004', model: 'Volvo FL Electric', plate: 'MH 01 EA 3456', status: 'Active', assignedTo: 'Dwight Schrute', capacity: '45%', location: 'Zone 2B' },
  ]);

  const handleAssign = (id: string) => {
    toast.success(`Assigned worker to vehicle ${id} successfully!`);
    setVehicles(vehicles.map(v => v.id === id ? { ...v, status: 'Active', assignedTo: 'New Worker', location: 'Dispatch' } : v));
  };

  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Vehicle Registry</h1>
          <p className="text-muted-foreground mt-1">Manage fleet, assign vehicles to workers, and track status.</p>
        </div>
        <Button className="font-bold shadow-sm">
          <Truck className="mr-2 h-4 w-4" /> Add New Vehicle
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <Truck className="w-8 h-8 text-primary mb-4 opacity-80" />
            <h3 className="text-2xl font-black text-foreground">42</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">Total Vehicles</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <Activity className="w-8 h-8 text-blue-500 mb-4 opacity-80" />
            <h3 className="text-2xl font-black text-foreground">28</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">Active on Route</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <Users className="w-8 h-8 text-amber-500 mb-4 opacity-80" />
            <h3 className="text-2xl font-black text-foreground">5</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">Unassigned</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <Settings className="w-8 h-8 text-red-500 mb-4 opacity-80" />
            <h3 className="text-2xl font-black text-foreground">3</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">In Maintenance</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Fleet Management</CardTitle>
          <CardDescription>Assign and dispatch available vehicles to waiting workers.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm text-left text-muted-foreground">
              <thead className="text-xs text-foreground uppercase bg-background">
                <tr>
                  <th className="px-6 py-4 font-bold">Vehicle ID</th>
                  <th className="px-6 py-4 font-bold">Model & Plate</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Current Driver</th>
                  <th className="px-6 py-4 font-bold">Capacity / Loc</th>
                  <th className="px-6 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.id} className="bg-card border-b border-slate-50 hover:bg-background">
                    <td className="px-6 py-4 font-bold text-foreground">{v.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{v.model}</div>
                      <div className="text-xs text-slate-400 font-mono">{v.plate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={
                        v.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-100 shadow-none' : 
                        v.status === 'Idle' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100 shadow-none' : 
                        'bg-red-100 text-red-700 hover:bg-red-100 shadow-none'
                      }>
                        {v.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 font-medium">{v.assignedTo}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{v.capacity} Full</div>
                      <div className="text-xs flex items-center gap-1 mt-0.5 text-muted-foreground"><Navigation className="w-3 h-3" /> {v.location}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {v.status === 'Idle' ? (
                        <Button size="sm" onClick={() => handleAssign(v.id)} className="font-semibold">Assign</Button>
                      ) : (
                        <Button variant="ghost" size="sm" className="font-semibold text-slate-400" disabled>Assigned</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVehicleRegistryPage;
