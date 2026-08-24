import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Activity, Database, Server } from 'lucide-react';

const ForgotPasswordPage = () => {
  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">ForgotPassword</h1>
        <p className="text-muted-foreground mt-1">Comprehensive management and oversight module.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <Activity className="w-8 h-8 text-primary mb-4 opacity-80" />
            <h3 className="text-2xl font-black text-foreground">1,248</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">Total Entries</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <Database className="w-8 h-8 text-blue-500 mb-4 opacity-80" />
            <h3 className="text-2xl font-black text-foreground">Active</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">System Status</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <Server className="w-8 h-8 text-amber-500 mb-4 opacity-80" />
            <h3 className="text-2xl font-black text-foreground">99.9%</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">Uptime</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Data Overview</CardTitle>
          <CardDescription>Detailed information for ForgotPassword</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm text-left text-muted-foreground">
              <thead className="text-xs text-foreground uppercase bg-background">
                <tr>
                  <th className="px-6 py-4 font-bold">ID</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Date updated</th>
                  <th className="px-6 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-card border-b border-slate-50 hover:bg-background">
                  <td className="px-6 py-4 font-medium text-foreground">#REQ-4921</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold">Active</span></td>
                  <td className="px-6 py-4">Today, 10:24 AM</td>
                  <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm" className="font-semibold text-primary">View</Button></td>
                </tr>
                <tr className="bg-card border-b border-slate-50 hover:bg-background">
                  <td className="px-6 py-4 font-medium text-foreground">#REQ-4920</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-slate-100 text-foreground rounded-md text-xs font-bold">Pending</span></td>
                  <td className="px-6 py-4">Yesterday, 04:12 PM</td>
                  <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm" className="font-semibold text-primary">View</Button></td>
                </tr>
                <tr className="bg-card hover:bg-background">
                  <td className="px-6 py-4 font-medium text-foreground">#REQ-4919</td>
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
};

export default ForgotPasswordPage;
