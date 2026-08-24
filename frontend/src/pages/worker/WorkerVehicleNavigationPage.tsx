import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, MapPin, Navigation2, ShieldCheck, Route, Clock, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const WorkerVehicleNavigationPage = () => {
  const [vehicle, setVehicle] = useState<{ id: string, model: string, plate: string, status: string } | null>(null);
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    // Simulate fetching assigned vehicle
    setTimeout(() => {
      setVehicle({
        id: 'V-001',
        model: 'Volvo FL Electric',
        plate: 'MH 01 EA 1234',
        status: 'Assigned',
      });
    }, 800);
  }, []);

  const handleStartNavigation = () => {
    setNavigating(true);
    toast.success("Navigation started. Route calculated.");
  };

  const handleArrived = () => {
    setNavigating(false);
    toast.success("You have arrived at the destination.");
  };

  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Vehicle Navigation</h1>
        <p className="text-muted-foreground mt-1">View your assigned vehicle and navigate to your next task.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-sm overflow-hidden relative">
            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
               <div className="absolute inset-0 opacity-20"><Truck className="w-48 h-48 absolute -bottom-10 -right-10" /></div>
            </div>
            <CardContent className="px-6 pb-6 relative -mt-8">
              {vehicle ? (
                <div className="bg-card rounded-xl shadow-md border border-border p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                      <Truck className="w-6 h-6" />
                    </div>
                    <Badge className="bg-green-100 text-green-700 shadow-none font-bold tracking-wider uppercase text-[10px]">{vehicle.status}</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{vehicle.model}</h3>
                  <div className="text-sm font-mono text-muted-foreground bg-slate-100 inline-block px-2 py-1 rounded mt-2 border border-border">
                    {vehicle.plate}
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-medium">Vehicle ID</span>
                      <span className="font-bold text-foreground">{vehicle.id}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-medium">Battery</span>
                      <span className="font-bold text-green-600 flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> 84%</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-card rounded-xl shadow-md border border-border p-5 flex items-center justify-center min-h-[200px]">
                  <div className="text-center text-slate-400">Loading vehicle assignment...</div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-background">
            <CardContent className="p-5">
              <h4 className="font-bold text-foreground flex items-center gap-2 mb-4"><Route className="w-4 h-4 text-primary" /> Next Destination</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 relative">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 z-10 relative"></div>
                  <div className="absolute top-2 left-[3px] w-0.5 h-12 bg-slate-300"></div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Current Location</p>
                    <p className="text-sm font-semibold text-foreground">Depot 4, Zone A</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary shrink-0 -ml-1 z-10 bg-background" />
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Drop-off Point</p>
                    <p className="text-sm font-semibold text-foreground">123 Civic Way, Apartment 4B</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <div className="flex-1 bg-card p-3 rounded-lg border border-border text-center">
                  <div className="text-lg font-black text-foreground">14</div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Mins</div>
                </div>
                <div className="flex-1 bg-card p-3 rounded-lg border border-border text-center">
                  <div className="text-lg font-black text-foreground">4.2</div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Km</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="border-none shadow-sm h-full flex flex-col overflow-hidden relative group">
            <div className="absolute inset-0 overflow-hidden">
               <iframe 
                 width="100%" 
                 height="100%" 
                 frameBorder="0" 
                 scrolling="no" 
                 marginHeight={0} 
                 marginWidth={0} 
                 src="https://www.openstreetmap.org/export/embed.html?bbox=-74.05%2C40.65%2C-73.95%2C40.75&amp;layer=mapnik&amp;marker=40.7128%2C-74.0060" 
                 style={{ border: 0, filter: 'opacity(0.7)' }}
               ></iframe>
            </div>
            
            <div className="mt-auto relative z-10 p-6 bg-gradient-to-t from-white via-white to-transparent pt-32">
              <div className="bg-card rounded-2xl shadow-xl border border-border p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  {navigating ? (
                    <>
                      <div className="flex items-center gap-2 text-primary font-bold mb-1">
                        <Navigation2 className="w-5 h-5 animate-pulse" /> Navigating to destination...
                      </div>
                      <p className="text-sm text-muted-foreground">Follow the highlighted route on the map.</p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-foreground font-bold mb-1">
                        <MapPin className="w-5 h-5 text-slate-400" /> Ready for dispatch
                      </div>
                      <p className="text-sm text-muted-foreground">Start navigation when you are ready to depart.</p>
                    </>
                  )}
                </div>
                
                <div className="w-full md:w-auto">
                  {!navigating ? (
                    <Button 
                      size="lg" 
                      className="w-full md:w-auto h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
                      onClick={handleStartNavigation}
                      disabled={!vehicle}
                    >
                      <Navigation2 className="w-5 h-5 mr-2" /> Start Navigation
                    </Button>
                  ) : (
                    <Button 
                      size="lg" 
                      className="w-full md:w-auto h-14 px-8 text-lg font-bold bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/30"
                      onClick={handleArrived}
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2" /> Mark Arrived
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkerVehicleNavigationPage;
