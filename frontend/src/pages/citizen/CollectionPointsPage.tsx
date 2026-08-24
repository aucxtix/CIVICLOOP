import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Clock } from 'lucide-react';

const CollectionPointsPage = () => {
  const points = [
    { id: 1, name: 'Downtown Recycling Center', address: '120 Main St, Cityville', distance: '1.2 km', status: 'Open', types: ['Plastic', 'Glass', 'Paper'] },
    { id: 2, name: 'Westside E-Waste Hub', address: '45 Tech Blvd, Cityville', distance: '3.5 km', status: 'Closed', types: ['Electronics', 'Batteries'] },
    { id: 3, name: 'Green Earth Drop-off', address: '88 Park Ave, Cityville', distance: '0.8 km', status: 'Open', types: ['Organic', 'Paper'] },
  ];

  return (
    <div className="w-full space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Collection Points</h1>
        <p className="text-muted-foreground mt-2">Find nearby recycling and waste drop-off locations.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {points.map((point) => (
          <Card key={point.id} className="border-none shadow-md hover:shadow-lg transition-shadow bg-card overflow-hidden group">
            <div className="h-32 bg-slate-100 relative overflow-hidden">
               <div className="absolute inset-0 overflow-hidden group-hover:scale-105 transition-transform duration-700">
                 <iframe 
                   width="100%" 
                   height="100%" 
                   frameBorder="0" 
                   scrolling="no" 
                   marginHeight={0} 
                   marginWidth={0} 
                   src="https://www.openstreetmap.org/export/embed.html?bbox=-74.05%2C40.65%2C-73.95%2C40.75&amp;layer=mapnik&amp;marker=40.7128%2C-74.0060" 
                   style={{ border: 0, filter: 'grayscale(50%) opacity(0.8)' }}
                 ></iframe>
               </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{point.name}</CardTitle>
                <Badge variant={point.status === 'Open' ? 'default' : 'secondary'} className={point.status === 'Open' ? 'bg-green-500 hover:bg-green-600' : ''}>
                  {point.status}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-1 mt-1 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" /> {point.address}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-muted-foreground font-medium">{point.distance} away</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {point.types.map(t => (
                  <Badge key={t} variant="outline" className="bg-background text-muted-foreground border-border">{t}</Badge>
                ))}
              </div>
              <Button className="w-full bg-primary/10 text-primary hover:bg-primary/20 font-semibold shadow-none border-0">
                <Navigation className="w-4 h-4 mr-2" /> Get Directions
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default CollectionPointsPage;