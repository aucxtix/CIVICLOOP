import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Users, Activity, Navigation, Settings, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';

interface Vehicle {
  id: string;
  vehicleId: string;
  modelAndPlate: string;
  status: string;
  driver?: { name: string };
  capacity: string;
  location: string;
}

const AdminVehicleRegistryPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await api.get('/vehicles');
      setVehicles(response.data);
    } catch (error) {
      toast.error('Failed to load vehicles');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddVehicle = async () => {
    const id = prompt('Enter Vehicle ID (e.g., V-005):');
    if (!id) return;
    const model = prompt('Enter Model & Plate:');
    if (!model) return;

    try {
      await api.post('/vehicles', {
        vehicleId: id,
        modelAndPlate: model
      });
      toast.success('Vehicle added successfully!');
      fetchVehicles();
    } catch (error) {
      toast.error('Failed to add vehicle');
    }
  };

  const handleAssign = async (id: string) => {
    try {
      await api.put(`/vehicles/${id}`, {
        status: 'Active',
        location: 'Dispatch'
      });
      toast.success(`Vehicle assigned successfully!`);
      fetchVehicles();
    } catch (error) {
      toast.error('Failed to assign vehicle');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const total = vehicles.length;
  const active = vehicles.filter(v => v.status === 'Active').length;
  const idle = vehicles.filter(v => v.status === 'Idle').length;
  const maintenance = vehicles.filter(v => v.status === 'Maintenance').length;

  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Vehicle Registry</h1>
          <p className="text-muted-foreground mt-1">Manage fleet, assign vehicles to workers, and track status.</p>
        </div>
        <Button className="font-bold shadow-sm" onClick={handleAddVehicle}>
          <Truck className="mr-2 h-4 w-4" /> Add New Vehicle
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <Truck className="w-8 h-8 text-primary mb-4 opacity-80" />
            <h3 className="text-2xl font-black text-foreground">{total}</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">Total Vehicles</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <Activity className="w-8 h-8 text-blue-500 mb-4 opacity-80" />
            <h3 className="text-2xl font-black text-foreground">{active}</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">Active on Route</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <Users className="w-8 h-8 text-amber-500 mb-4 opacity-80" />
            <h3 className="text-2xl font-black text-foreground">{idle}</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">Unassigned</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <Settings className="w-8 h-8 text-red-500 mb-4 opacity-80" />
            <h3 className="text-2xl font-black text-foreground">{maintenance}</h3>
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
                {vehicles.map((v) => {
                  const [modelName, plateNum] = v.modelAndPlate.split('(');
                  
                  return (
                  <tr key={v.id} className="bg-card border-b border-border hover:bg-background">
                    <td className="px-6 py-4 font-bold text-foreground">{v.vehicleId}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{modelName?.trim()}</div>
                      <div className="text-xs text-muted-foreground font-mono">{plateNum ? `(${plateNum}` : ''}</div>
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
                    <td className="px-6 py-4 font-medium">{v.driver?.name || 'Unassigned'}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{v.capacity}</div>
                      <div className="text-xs flex items-center gap-1 mt-0.5 text-muted-foreground"><Navigation className="w-3 h-3" /> {v.location}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {v.status === 'Idle' ? (
                        <Button size="sm" onClick={() => handleAssign(v.id)} className="font-semibold">Assign</Button>
                      ) : (
                        <Button variant="ghost" size="sm" className="font-semibold text-muted-foreground" disabled>Assigned</Button>
                      )}
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVehicleRegistryPage;
