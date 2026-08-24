import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Truck, Clock, ShieldCheck } from 'lucide-react';

const data = [
  { name: 'Mon', completed: 12, pending: 2 },
  { name: 'Tue', completed: 15, pending: 1 },
  { name: 'Wed', completed: 18, pending: 0 },
  { name: 'Thu', completed: 14, pending: 3 },
  { name: 'Fri', completed: 20, pending: 1 },
  { name: 'Sat', completed: 10, pending: 0 },
  { name: 'Sun', completed: 8, pending: 0 },
];

const WorkerPerformancePage = () => {
  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Performance Metrics</h1>
        <p className="text-muted-foreground mt-1">Review your weekly task completion and efficiency stats.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <TrendingUp className="w-8 h-8 text-primary mb-4 opacity-80" />
            <h3 className="text-2xl font-black text-foreground">97</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">Tasks Completed</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <Truck className="w-8 h-8 text-blue-500 mb-4 opacity-80" />
            <h3 className="text-2xl font-black text-foreground">324 km</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">Distance Driven</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <Clock className="w-8 h-8 text-amber-500 mb-4 opacity-80" />
            <h3 className="text-2xl font-black text-foreground">14 min</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">Avg. Resolution Time</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mb-4 opacity-80" />
            <h3 className="text-2xl font-black text-foreground">99.8%</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">Safety Score</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Weekly Output</CardTitle>
          <CardDescription>Number of tasks completed per day over the last week.</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="completed" fill="#16a34a" radius={[4, 4, 0, 0]} name="Completed" />
                <Bar dataKey="pending" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkerPerformancePage;
