import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Truck } from 'lucide-react';

const PickupSchedulePage = () => {
  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Pickup Schedule</h1>
          <p className="text-muted-foreground mt-1">Track your upcoming waste collection appointments.</p>
        </div>
        <Button className="bg-green-600 text-white hover:bg-green-700">Request Special Pickup</Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Upcoming Collections</CardTitle>
          <CardDescription>Your regular and requested waste pickups.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-xl p-4 bg-green-50/50 border-green-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">Standard Recycling</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Tomorrow</div>
                    <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 08:00 AM - 10:00 AM</div>
                    <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Home Address</div>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="shrink-0 text-green-700 border-green-200 hover:bg-green-100">Reschedule</Button>
            </div>

            <div className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-muted-foreground flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">General Waste</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Friday, Oct 27</div>
                    <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 08:00 AM - 10:00 AM</div>
                    <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Home Address</div>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="shrink-0">Modify</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PickupSchedulePage;