import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, AlertTriangle } from 'lucide-react';

const AdminHotspotsPage = () => {
  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Waste Hotspots</h1>
        <p className="text-muted-foreground mt-1">Identify and manage areas with frequent illegal dumping or waste accumulation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden h-[600px] relative">
           <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900 overflow-hidden">
             <iframe 
               width="100%" 
               height="100%" 
               frameBorder="0" 
               scrolling="no" 
               marginHeight={0} 
               marginWidth={0} 
               className="w-full h-full border-0 grayscale dark:invert opacity-80"
               src="https://www.openstreetmap.org/export/embed.html?bbox=-74.05%2C40.65%2C-73.95%2C40.75&amp;layer=mapnik&amp;marker=40.7128%2C-74.0060" 
             ></iframe>
           </div>
           <div className="absolute top-4 left-4 bg-card/90 backdrop-blur p-4 rounded-xl shadow-lg border border-border">
             <div className="flex items-center gap-2 text-red-600 font-bold mb-2">
               <AlertTriangle className="w-5 h-5" /> High Priority Zones
             </div>
             <ul className="text-sm space-y-1 text-foreground">
               <li>1. Downtown Alley (12 reports)</li>
               <li>2. Westside Park (8 reports)</li>
             </ul>
           </div>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Latest hotspot identifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 items-start pb-4 border-b">
                <div className="p-2 bg-red-100 text-red-600 rounded-lg"><AlertTriangle className="w-4 h-4" /></div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">Industrial Park Blvd</h4>
                  <p className="text-xs text-muted-foreground">Multiple large item dumping reported.</p>
                  <Button variant="link" className="h-auto p-0 text-xs text-blue-600 mt-1">Dispatch Cleanup</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminHotspotsPage;
