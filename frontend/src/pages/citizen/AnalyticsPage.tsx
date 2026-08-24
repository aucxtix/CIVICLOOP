import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart2, PieChart, TrendingUp, Activity } from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Your Analytics</h1>
        <p className="text-muted-foreground mt-2">Track your environmental impact and classification history over time.</p>
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
            <div className="flex justify-between mt-4 text-xs font-semibold text-muted-foreground px-2">
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
                 <span className="text-2xl font-black text-foreground">342</span>
                 <p className="text-[10px] uppercase font-bold text-slate-400">Total Items</p>
               </div>
             </div>
          </CardContent>
          <div className="px-6 pb-6 flex flex-wrap justify-center gap-4 text-sm font-medium text-muted-foreground">
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
export default AnalyticsPage;