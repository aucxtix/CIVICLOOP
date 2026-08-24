import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const AdminMapPage = () => (
  <div className="h-[calc(100vh-140px)] flex flex-col space-y-4 animate-in fade-in duration-500">
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Live City Map</h1>
      <p className="text-muted-foreground mt-1">Real-time overview of active trucks, reports, and hotspots.</p>
    </div>
    <Card className="flex-1 border-none shadow-sm overflow-hidden bg-slate-100 relative">
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
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur p-4 rounded-xl shadow-lg border border-border w-64 space-y-3">
        <h3 className="font-bold text-foreground text-sm">Map Legend</h3>
        <div className="flex items-center gap-2 text-sm text-foreground"><MapPin className="w-4 h-4 text-blue-500" /> Active Trucks (12)</div>
        <div className="flex items-center gap-2 text-sm text-foreground"><MapPin className="w-4 h-4 text-orange-500" /> Pending Reports (45)</div>
        <div className="flex items-center gap-2 text-sm text-foreground"><MapPin className="w-4 h-4 text-red-600" /> Critical Hotspots (3)</div>
      </div>
    </Card>
  </div>
);
export default AdminMapPage;