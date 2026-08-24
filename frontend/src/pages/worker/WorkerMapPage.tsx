import { Card } from '@/components/ui/card';
import { MapPin, Truck, AlertTriangle } from 'lucide-react';

const WorkerMapPage = () => {
  return (
    <div className="w-full h-[calc(100vh-120px)] space-y-6 flex flex-col animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Live Map</h1>
        <p className="text-muted-foreground mt-1">Real-time overview of your route, tasks, and hotspots.</p>
      </div>
      <Card className="flex-1 border-none shadow-sm overflow-hidden bg-slate-100 dark:bg-slate-900 relative rounded-2xl">
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
          <h3 className="font-bold text-foreground dark:text-white text-sm">Map Legend</h3>
          <div className="flex items-center gap-2 text-sm text-foreground dark:text-slate-300"><MapPin className="w-4 h-4 text-blue-500" /> Pending Tasks (5)</div>
          <div className="flex items-center gap-2 text-sm text-foreground dark:text-slate-300"><Truck className="w-4 h-4 text-green-500" /> Your Vehicle</div>
          <div className="flex items-center gap-2 text-sm text-foreground dark:text-slate-300"><AlertTriangle className="w-4 h-4 text-orange-500" /> Hazard Zones (1)</div>
        </div>
      </Card>
    </div>
  );
};

export default WorkerMapPage;
