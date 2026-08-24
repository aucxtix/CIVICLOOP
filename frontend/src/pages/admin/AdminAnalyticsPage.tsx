import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', reports: 400, resolved: 240 },
  { name: 'Feb', reports: 300, resolved: 139 },
  { name: 'Mar', reports: 200, resolved: 980 },
  { name: 'Apr', reports: 278, resolved: 390 },
  { name: 'May', reports: 189, resolved: 480 },
  { name: 'Jun', reports: 239, resolved: 380 },
];

const AdminAnalyticsPage = () => {
  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">System Analytics</h1>
        <p className="text-muted-foreground mt-1">Platform-wide data and insights.</p>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Issue Resolution Trends</CardTitle>
          <CardDescription>Reports vs. resolutions over the last 6 months.</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="reports" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Reports" />
                <Bar dataKey="resolved" fill="#16a34a" radius={[4, 4, 0, 0]} name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalyticsPage;
