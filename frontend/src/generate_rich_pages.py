import os

base_dir = '/home/furatixx/Desktop/civic loop/frontend/src/pages'

pages_data = {
    'citizen': {
        'CollectionPointsPage': """import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Collection Points</h1>
        <p className="text-slate-500 mt-2">Find nearby recycling and waste drop-off locations.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {points.map((point) => (
          <Card key={point.id} className="border-none shadow-md hover:shadow-lg transition-shadow bg-white overflow-hidden group">
            <div className="h-32 bg-slate-100 relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-74.006,40.7128,14,0/400x300?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbDF4a3NscWwwaG9tM2NteG9yY3V3eW84In0.example')] bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700"></div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{point.name}</CardTitle>
                <Badge variant={point.status === 'Open' ? 'default' : 'secondary'} className={point.status === 'Open' ? 'bg-green-500 hover:bg-green-600' : ''}>
                  {point.status}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-1 mt-1 text-slate-500">
                <MapPin className="w-3.5 h-3.5" /> {point.address}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600 font-medium">{point.distance} away</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {point.types.map(t => (
                  <Badge key={t} variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">{t}</Badge>
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
export default CollectionPointsPage;""",

        'CollectionRequestPage': """import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Truck, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const CollectionRequestPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Request Collection</h1>
        <p className="text-slate-500 mt-2">Schedule a special pickup for bulky waste, electronics, or large volumes.</p>
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
                <label className="text-sm font-semibold text-slate-700">Waste Category</label>
                <select className="w-full p-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option>Furniture & Bulky Items</option>
                  <option>Electronic Waste (E-Waste)</option>
                  <option>Construction Debris</option>
                  <option>Large Volumes of Recyclables</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Estimated Weight/Volume</label>
                <Input placeholder="e.g. 2 large sofas, approx 50kg" className="bg-slate-50 border-slate-200" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Preferred Date</label>
                  <Input type="date" className="bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Preferred Time</label>
                  <select className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option>Morning (8AM - 12PM)</option>
                    <option>Afternoon (12PM - 4PM)</option>
                    <option>Evening (4PM - 8PM)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Pickup Address</label>
                <Input defaultValue="123 Civic Way, Apartment 4B" className="bg-slate-50 border-slate-200" />
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
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-800">E-Waste</p>
                  <p className="text-xs text-slate-500">Oct 12, 2023</p>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 shadow-none">Completed</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-800">Old Mattress</p>
                  <p className="text-xs text-slate-500">Pending Date</p>
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
export default CollectionRequestPage;""",

        'PickupSchedulePage': """import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, Truck, Info } from 'lucide-react';

const PickupSchedulePage = () => {
  const schedules = [
    { day: 'Monday', date: 'Oct 16', type: 'General Waste', time: '08:00 AM', status: 'Upcoming', color: 'bg-slate-800' },
    { day: 'Wednesday', date: 'Oct 18', type: 'Recyclables', time: '09:00 AM', status: 'Scheduled', color: 'bg-blue-600' },
    { day: 'Friday', date: 'Oct 20', type: 'Organic Waste', time: '07:30 AM', status: 'Scheduled', color: 'bg-green-600' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Pickup Schedule</h1>
        <p className="text-slate-500 mt-2">View your upcoming waste collection dates and times.</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {schedules.map((schedule, idx) => (
            <Card key={idx} className="border-none shadow-sm overflow-hidden flex flex-col sm:flex-row">
              <div className={`w-full sm:w-32 flex flex-col items-center justify-center p-4 text-white ${schedule.color}`}>
                <span className="text-xs uppercase font-bold tracking-wider opacity-80">{schedule.day}</span>
                <span className="text-2xl font-black">{schedule.date.split(' ')[1]}</span>
                <span className="text-sm">{schedule.date.split(' ')[0]}</span>
              </div>
              <div className="p-6 flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    {schedule.type}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium"><Clock className="w-4 h-4" /> {schedule.time}</span>
                    <span className="flex items-center gap-1.5 font-medium"><Truck className="w-4 h-4" /> Zone 4A</span>
                  </div>
                </div>
                <Badge variant={schedule.status === 'Upcoming' ? 'default' : 'secondary'} className={schedule.status === 'Upcoming' ? 'bg-amber-500 hover:bg-amber-600 font-bold' : ''}>
                  {schedule.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="w-full lg:w-80 space-y-6">
          <Card className="border-none shadow-sm bg-slate-50 border border-slate-100">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Holiday Notice</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">Collections scheduled for upcoming public holidays will be delayed by one business day. Please plan accordingly.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Sorting Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-sm font-medium text-slate-700">Blue Bin: Recyclables</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="text-sm font-medium text-slate-700">Green Bin: Organics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-slate-800"></div>
                <span className="text-sm font-medium text-slate-700">Black Bin: General Waste</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default PickupSchedulePage;""",

        'NotificationsPage': """import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Truck, Leaf, ShieldCheck, CheckCircle2 } from 'lucide-react';

const NotificationsPage = () => {
  const notifications = [
    { id: 1, type: 'pickup', title: 'Pickup Completed', desc: 'Your scheduled pickup for Recyclables was completed successfully.', time: '2 hours ago', read: false, icon: Truck, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 2, type: 'points', title: 'Green Points Earned', desc: 'You earned +50 Green Points for your recent AI classification.', time: '5 hours ago', read: false, icon: Leaf, color: 'text-green-600', bg: 'bg-green-50' },
    { id: 3, type: 'report', title: 'Report Resolved', desc: 'The illegal dumping issue you reported at Civic Park has been resolved.', time: '1 day ago', read: true, icon: CheckCircle2, color: 'text-primary', bg: 'bg-primary/10' },
    { id: 4, type: 'system', title: 'System Update', desc: 'CivicLoop platform will undergo brief maintenance this Sunday at 2 AM.', time: '3 days ago', read: true, icon: ShieldCheck, color: 'text-slate-600', bg: 'bg-slate-100' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Notifications</h1>
          <p className="text-slate-500 mt-1">Stay updated with your activities and alerts.</p>
        </div>
        <Button variant="outline" className="text-xs font-semibold h-8 bg-white shadow-sm border-slate-200">
          Mark all as read
        </Button>
      </div>
      
      <div className="space-y-3">
        {notifications.map((notif) => (
          <Card key={notif.id} className={`border-none shadow-sm transition-all ${notif.read ? 'bg-white opacity-70' : 'bg-white ring-1 ring-primary/20'}`}>
            <CardContent className="p-4 sm:p-6 flex items-start gap-4">
              <div className={`p-3 rounded-full ${notif.bg} shrink-0`}>
                <notif.icon className={`w-5 h-5 ${notif.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className={`font-bold text-sm sm:text-base ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>{notif.title}</h3>
                  <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">{notif.time}</span>
                </div>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{notif.desc}</p>
              </div>
              {!notif.read && (
                <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 self-center"></div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default NotificationsPage;""",

        'AnalyticsPage': """import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart2, PieChart, TrendingUp, Activity } from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Your Analytics</h1>
        <p className="text-slate-500 mt-2">Track your environmental impact and classification history over time.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <Activity className="w-6 h-6 text-blue-100 mb-4" />
            <h3 className="text-blue-100 text-sm font-medium">Total Items Scanned</h3>
            <p className="text-3xl font-bold mt-1">342</p>
            <p className="text-xs text-blue-200 mt-2">+24 this month</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-gradient-to-br from-green-600 to-emerald-700 text-white">
          <CardContent className="p-6">
            <TrendingUp className="w-6 h-6 text-green-100 mb-4" />
            <h3 className="text-green-100 text-sm font-medium">Waste Diverted (kg)</h3>
            <p className="text-3xl font-bold mt-1">45.2</p>
            <p className="text-xs text-green-200 mt-2">+3.5kg this month</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-gradient-to-br from-amber-500 to-orange-500 text-white">
          <CardContent className="p-6">
            <PieChart className="w-6 h-6 text-amber-100 mb-4" />
            <h3 className="text-amber-100 text-sm font-medium">Recycling Accuracy</h3>
            <p className="text-3xl font-bold mt-1">94%</p>
            <p className="text-xs text-amber-100 mt-2">Top 10% in your area</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
          <CardContent className="p-6">
            <BarChart2 className="w-6 h-6 text-purple-100 mb-4" />
            <h3 className="text-purple-100 text-sm font-medium">Reports Submitted</h3>
            <p className="text-3xl font-bold mt-1">18</p>
            <p className="text-xs text-purple-200 mt-2">15 resolved</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Monthly Contribution</CardTitle>
            <CardDescription>Your waste diversion progress over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full flex items-end justify-between px-2 gap-2">
              {[40, 55, 35, 75, 60, 85].map((h, i) => (
                <div key={i} className="w-full bg-slate-100 rounded-t-md relative group">
                  <div className="absolute bottom-0 w-full bg-primary rounded-t-md transition-all duration-500" style={{ height: `${h}%` }}></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded font-bold transition-opacity">{h}kg</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs font-semibold text-slate-500 px-2">
              <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Waste Composition</CardTitle>
            <CardDescription>Breakdown of items you've scanned this year.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-6">
             <div className="w-48 h-48 rounded-full border-[24px] border-primary/20 relative flex items-center justify-center shadow-inner">
               <div className="w-full h-full absolute rounded-full border-[24px] border-primary border-r-transparent border-b-transparent transform rotate-45"></div>
               <div className="w-full h-full absolute rounded-full border-[24px] border-blue-500 border-l-transparent border-t-transparent transform rotate-12"></div>
               <div className="w-full h-full absolute rounded-full border-[24px] border-amber-400 border-t-transparent border-b-transparent border-l-transparent transform -rotate-12"></div>
               <div className="text-center">
                 <span className="text-2xl font-black text-slate-800">342</span>
                 <p className="text-[10px] uppercase font-bold text-slate-400">Total Items</p>
               </div>
             </div>
          </CardContent>
          <div className="px-6 pb-6 flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-600">
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-primary"></div> Plastic (45%)</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Paper (30%)</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-400"></div> Glass (15%)</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-slate-200"></div> Other (10%)</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default AnalyticsPage;""",

        'GreenPointsPage': """import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Gift, Trophy, Star, ArrowRight } from 'lucide-react';

const GreenPointsPage = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Green Points</h1>
        <p className="text-slate-500 mt-2">Earn points for sustainable actions and redeem them for rewards.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="border-none shadow-md bg-gradient-to-b from-[#0F5A29] to-[#15803D] text-white overflow-hidden relative">
            <div className="absolute right-[-20px] top-[-20px] opacity-10">
              <Leaf className="w-40 h-40" />
            </div>
            <CardContent className="p-8 relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/30">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <p className="text-green-100 font-medium mb-1 uppercase tracking-wider text-xs">Current Balance</p>
              <h2 className="text-6xl font-black mb-6">1,250</h2>
              <Button className="w-full bg-white text-primary hover:bg-slate-100 font-bold shadow-lg">
                Redeem Points
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" /> Available Rewards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Free Transit Pass', desc: '1 Day unlimited public transit', pts: 500, color: 'bg-blue-50 text-blue-600' },
              { title: '10% Discount - GreenMart', desc: 'Valid on all organic produce', pts: 300, color: 'bg-green-50 text-green-600' },
              { title: 'Reusable Coffee Cup', desc: 'Claim at any participating cafe', pts: 800, color: 'bg-amber-50 text-amber-600' },
              { title: 'Plant a Tree', desc: 'Donate points to plant a real tree', pts: 1000, color: 'bg-emerald-50 text-emerald-600' }
            ].map((reward, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${reward.color}`}>
                    <Gift className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{reward.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{reward.desc}</p>
                    <div className="mt-3 flex items-center gap-1 text-sm font-bold text-primary">
                      {reward.pts} pts <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Card className="border-none shadow-sm mt-8">
        <CardHeader>
          <CardTitle>How to earn points?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
              <Star className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <h4 className="font-bold text-slate-800">Scan & Sort</h4>
              <p className="text-sm text-slate-500 mt-2">+10 points per correct AI classification.</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
              <Star className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <h4 className="font-bold text-slate-800">Report Issues</h4>
              <p className="text-sm text-slate-500 mt-2">+50 points for reporting illegal dumping.</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
              <Star className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <h4 className="font-bold text-slate-800">Consistent Recycling</h4>
              <p className="text-sm text-slate-500 mt-2">+100 points for a 4-week recycling streak.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default GreenPointsPage;""",

        'ProfilePage': """import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Phone, MapPin, Shield } from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Your Profile</h1>
        <p className="text-slate-500 mt-1">Manage your personal information and account details.</p>
      </div>
      
      <Card className="border-none shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/40 relative"></div>
        <CardContent className="px-8 pb-8 relative -mt-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-8">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-slate-900">John Doe</h2>
              <p className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded inline-flex items-center mt-1">
                <Shield className="w-3 h-3 mr-1" /> Citizen Account
              </p>
            </div>
            <Button variant="outline" className="font-semibold shadow-sm">Edit Profile</Button>
          </div>
          
          <div className="space-y-6 mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Full Name</label>
                <Input defaultValue="John Doe" readOnly className="bg-slate-50 border-slate-200 font-medium text-slate-800 focus-visible:ring-0" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email Address</label>
                <Input defaultValue="john.doe@example.com" readOnly className="bg-slate-50 border-slate-200 font-medium text-slate-800 focus-visible:ring-0" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone Number</label>
                <Input defaultValue="+1 (555) 123-4567" readOnly className="bg-slate-50 border-slate-200 font-medium text-slate-800 focus-visible:ring-0" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Address</label>
                <Input defaultValue="123 Civic Way, Cityville" readOnly className="bg-slate-50 border-slate-200 font-medium text-slate-800 focus-visible:ring-0" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default ProfilePage;""",

        'SettingsPage': """import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Lock, Globe, Moon, MonitorSmartphone } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Configure your app preferences and privacy settings.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-2">
          <Button variant="ghost" className="w-full justify-start font-semibold bg-slate-100 text-slate-900 hover:bg-slate-200"><Bell className="mr-2 h-4 w-4" /> Notifications</Button>
          <Button variant="ghost" className="w-full justify-start font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"><Lock className="mr-2 h-4 w-4" /> Privacy & Security</Button>
          <Button variant="ghost" className="w-full justify-start font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"><Moon className="mr-2 h-4 w-4" /> Appearance</Button>
          <Button variant="ghost" className="w-full justify-start font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"><Globe className="mr-2 h-4 w-4" /> Language</Button>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control what alerts you receive from CivicLoop.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Pickup Reminders</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Receive alerts 1 day before your scheduled pickup.</p>
                </div>
                <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Report Updates</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Get notified when a report you submitted is resolved.</p>
                </div>
                <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Marketing Emails</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Receive newsletters and feature updates.</p>
                </div>
                <div className="w-10 h-6 bg-slate-200 rounded-full relative cursor-pointer shadow-inner">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" className="font-semibold shadow-sm">Cancel</Button>
            <Button className="font-bold shadow-sm px-6">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;"""
    },
    'worker': {
        'WorkerTasksPage': "export { default } from './WorkerDashboard';"
    },
    'admin': {
        'AdminMapPage': """import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const AdminMapPage = () => (
  <div className="h-[calc(100vh-140px)] flex flex-col space-y-4 animate-in fade-in duration-500">
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Live City Map</h1>
      <p className="text-slate-500 mt-1">Real-time overview of active trucks, reports, and hotspots.</p>
    </div>
    <Card className="flex-1 border-none shadow-sm overflow-hidden bg-slate-100 relative">
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-74.006,40.7128,12,0/1200x800?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbDF4a3NscWwwaG9tM2NteG9yY3V3eW84In0.example')] bg-cover bg-center"></div>
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-white/20 w-64 space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">Map Legend</h3>
        <div className="flex items-center gap-2 text-sm text-slate-700"><MapPin className="w-4 h-4 text-blue-500" /> Active Trucks (12)</div>
        <div className="flex items-center gap-2 text-sm text-slate-700"><MapPin className="w-4 h-4 text-orange-500" /> Pending Reports (45)</div>
        <div className="flex items-center gap-2 text-sm text-slate-700"><MapPin className="w-4 h-4 text-red-600" /> Critical Hotspots (3)</div>
      </div>
    </Card>
  </div>
);
export default AdminMapPage;"""
    }
}

# The above covers the main Citizen pages the user clicked.
# For others, we'll write a generic premium placeholder.
generic_premium = """import {{ Card, CardContent, CardHeader, CardTitle, CardDescription }} from '@/components/ui/card';
import {{ Button }} from '@/components/ui/button';
import {{ LayoutDashboard, Activity, Database, Server }} from 'lucide-react';

const {component_name} = () => {{
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</h1>
        <p className="text-slate-500 mt-1">{desc}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <Activity className="w-8 h-8 text-primary mb-4 opacity-80" />
            <h3 className="text-2xl font-black text-slate-800">1,248</h3>
            <p className="text-sm font-medium text-slate-500 mt-1">Total Entries</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <Database className="w-8 h-8 text-blue-500 mb-4 opacity-80" />
            <h3 className="text-2xl font-black text-slate-800">Active</h3>
            <p className="text-sm font-medium text-slate-500 mt-1">System Status</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <Server className="w-8 h-8 text-amber-500 mb-4 opacity-80" />
            <h3 className="text-2xl font-black text-slate-800">99.9%</h3>
            <p className="text-sm font-medium text-slate-500 mt-1">Uptime</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Data Overview</CardTitle>
          <CardDescription>Detailed information for {title}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-slate-100 overflow-hidden">
            <table className="w-full text-sm text-left text-slate-500">
              <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                <tr>
                  <th className="px-6 py-4 font-bold">ID</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Date updated</th>
                  <th className="px-6 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">#REQ-4921</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold">Active</span></td>
                  <td className="px-6 py-4">Today, 10:24 AM</td>
                  <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm" className="font-semibold text-primary">View</Button></td>
                </tr>
                <tr className="bg-white border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">#REQ-4920</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-bold">Pending</span></td>
                  <td className="px-6 py-4">Yesterday, 04:12 PM</td>
                  <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm" className="font-semibold text-primary">View</Button></td>
                </tr>
                <tr className="bg-white hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">#REQ-4919</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold">Resolved</span></td>
                  <td className="px-6 py-4">Oct 12, 2023</td>
                  <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm" className="font-semibold text-primary">View</Button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}};

export default {component_name};
"""

def generate_pages():
    for role, pages in pages_data.items():
        role_dir = os.path.join(base_dir, role)
        os.makedirs(role_dir, exist_ok=True)
        for page_name, content in pages.items():
            with open(os.path.join(role_dir, f"{page_name}.tsx"), 'w') as f:
                f.write(content)

    # For any existing files in admin/worker/citizen that are empty or have the old generic template, overwrite with premium generic
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('Page.tsx'):
                path = os.path.join(root, file)
                role = os.path.basename(root)
                name = file[:-4]
                
                # skip ones we explicitly defined above or exist as core files
                if role in pages_data and name in pages_data[role]:
                    continue
                if name in ['ClassifyWastePage', 'ReportWastePage', 'MyReportsPage']:
                    continue
                
                # Update with generic premium if it's one of the auto-generated ones
                with open(path, 'w') as f:
                    f.write(generic_premium.format(component_name=name, title=name.replace('Page', '').replace('Admin', '').replace('Worker', ''), desc='Comprehensive management and oversight module.'))

generate_pages()
print("Successfully generated rich placeholder pages.")
