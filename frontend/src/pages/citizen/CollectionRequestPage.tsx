import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Truck, Calendar, MapPin, CheckCircle2, Navigation } from 'lucide-react';
import { toast } from 'sonner';

const CollectionRequestPage = () => {
  const [address, setAddress] = useState("123 Civic Way, Apartment 4B");
  const [isLocating, setIsLocating] = useState(false);

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    // Simulate geolocation delay
    setTimeout(() => {
      setAddress("456 Park Avenue, Downtown Cityville");
      setIsLocating(false);
      toast.success("Location updated successfully!");
    }, 800);
  };

  return (
    <div className="max-w-5xl space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Request Collection</h1>
        <p className="text-muted-foreground mt-2">Schedule a special pickup for bulky waste, electronics, or large volumes.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Pickup Details</CardTitle>
              <CardDescription>Fill out the information below to schedule your pickup.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Waste Category</label>
                <select className="w-full p-3 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option>Furniture & Bulky Items</option>
                  <option>Electronic Waste (E-Waste)</option>
                  <option>Construction Debris</option>
                  <option>Large Volumes of Recyclables</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Estimated Weight/Volume</label>
                <Input placeholder="e.g. 2 large sofas, approx 50kg" className="bg-background border-border" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Preferred Date</label>
                  <Input type="date" className="bg-background border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Preferred Time</label>
                  <select className="w-full p-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option>Morning (8AM - 12PM)</option>
                    <option>Afternoon (12PM - 4PM)</option>
                    <option>Evening (4PM - 8PM)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-foreground">Pickup Address</label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 text-xs text-primary px-2 hover:bg-primary/10" 
                    onClick={handleUseCurrentLocation}
                    disabled={isLocating}
                  >
                    <Navigation className={`w-3 h-3 mr-1 ${isLocating ? 'animate-spin' : ''}`} /> 
                    {isLocating ? 'Locating...' : 'Use Current Location'}
                  </Button>
                </div>
                <Input 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address manually"
                  className="bg-background border-border" 
                />
              </div>
              <Button className="w-full mt-4 h-12 font-bold shadow-sm" size="lg">Submit Request</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <Truck className="w-10 h-10 mb-4 opacity-80" />
              <h3 className="text-lg font-bold mb-2">How it works</h3>
              <ul className="space-y-3 text-sm opacity-90">
                <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 shrink-0" /> Submit your request with details.</li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 shrink-0" /> We assign the nearest available truck.</li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 shrink-0" /> Track the truck in real-time on pickup day.</li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 shrink-0" /> Earn Green Points for responsible disposal!</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-background rounded-lg border border-border">
                <div>
                  <p className="text-sm font-bold text-foreground">E-Waste</p>
                  <p className="text-xs text-muted-foreground">Oct 12, 2023</p>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 shadow-none">Completed</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-background rounded-lg border border-border">
                <div>
                  <p className="text-sm font-bold text-foreground">Old Mattress</p>
                  <p className="text-xs text-muted-foreground">Pending Date</p>
                </div>
                <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Pending</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default CollectionRequestPage;