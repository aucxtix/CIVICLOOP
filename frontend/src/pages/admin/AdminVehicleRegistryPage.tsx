import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Users, Activity, Navigation, Settings, Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ id: '', model: '', plate: '' });

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicle.id || !newVehicle.model || !newVehicle.plate) return;

    try {
      await api.post('/vehicles', {
        vehicleId: newVehicle.id,
        modelAndPlate: `${newVehicle.model} (${newVehicle.plate})`
      });
      toast.success('Vehicle added successfully!');
      setNewVehicle({ id: '', model: '', plate: '' });
      setIsDialogOpen(false);
      fetchVehicles();
    } catch (error) {
      toast.error('Failed to add vehicle');
    }
  };

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    let formatted = '';
    if (val.length > 0) formatted += val.substring(0, 2);
    if (val.length > 2) formatted += '-' + val.substring(2, 4);
    if (val.length > 4) formatted += '-' + val.substring(4, 6);
    if (val.length > 6) formatted += '-' + val.substring(6, 10);
    
    setNewVehicle(prev => ({ ...prev, plate: formatted }));
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="font-bold shadow-sm bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Add New Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] overflow-hidden p-0 border-none bg-card shadow-2xl">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-border/50 relative overflow-hidden">
              <div className="absolute top-[-20px] right-[-20px] opacity-10 rotate-12 scale-150">
                <Truck className="w-40 h-40 text-primary" />
              </div>
              <DialogHeader className="relative z-10">
                <DialogTitle className="text-2xl font-black text-foreground flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  Register Vehicle
                </DialogTitle>
                <DialogDescription className="text-muted-foreground font-medium">
                  Add a new vehicle to the municipal fleet dispatch.
                </DialogDescription>
              </DialogHeader>
            </div>
            
            <form onSubmit={handleAddVehicle} className="p-6 space-y-5">
              <div className="space-y-4">
                <div className="space-y-2 group">
                  <label htmlFor="vid" className="text-sm font-bold text-foreground group-focus-within:text-primary transition-colors">
                    Vehicle ID
                  </label>
                  <div className="relative">
                    <Input 
                      id="vid"
                      type="text"
                      placeholder="e.g., V-005" 
                      value={newVehicle.id}
                      onChange={(e) => setNewVehicle({...newVehicle, id: e.target.value})}
                      className="bg-background/50 border-border/60 focus:border-primary focus:ring-primary/20 transition-all font-mono pl-3 shadow-sm h-11"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 group">
                    <label htmlFor="model" className="text-sm font-bold text-foreground group-focus-within:text-primary transition-colors">
                      Vehicle Model
                    </label>
                    <Input 
                      id="model"
                      type="text"
                      placeholder="e.g., Volvo FL" 
                      value={newVehicle.model}
                      onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                      className="bg-background/50 border-border/60 focus:border-primary focus:ring-primary/20 transition-all shadow-sm h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label htmlFor="plate" className="text-sm font-bold text-foreground group-focus-within:text-primary transition-colors">
                      Number Plate
                    </label>
                    <Input 
                      id="plate"
                      type="text"
                      placeholder="XX-00-XX-0000" 
                      value={newVehicle.plate}
                      onChange={handlePlateChange}
                      maxLength={13}
                      className="bg-background/50 border-border/60 focus:border-primary focus:ring-primary/20 transition-all font-mono shadow-sm h-11 tracking-wider"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1 font-bold">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 font-bold shadow-md bg-primary hover:bg-primary/90 text-white">
                  Confirm Registry
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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
