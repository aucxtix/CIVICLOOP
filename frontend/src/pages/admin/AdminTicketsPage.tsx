import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, AlertTriangle, ArrowRight } from 'lucide-react';

const tickets = [
  { id: 'TKT-1042', user: 'David Smith', subject: 'Missed Pickup on 5th Ave', priority: 'high', status: 'open', date: '1 hour ago' },
  { id: 'TKT-1041', user: 'System', subject: 'API Rate Limit Warning', priority: 'medium', status: 'investigating', date: '3 hours ago' },
  { id: 'TKT-1040', user: 'Maria Garcia', subject: 'App Crashing on Login', priority: 'high', status: 'resolved', date: '1 day ago' },
];

const AdminTicketsPage = () => {
  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Support Tickets</h1>
          <p className="text-muted-foreground mt-1">Manage user reports and system alerts.</p>
        </div>
        <Button className="bg-slate-900 text-white hover:bg-slate-800">New Ticket</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Active Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-xl hover:bg-background transition-colors gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg mt-1 ${ticket.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                        {ticket.priority === 'high' ? <AlertTriangle className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground">{ticket.subject}</span>
                          <Badge variant="outline" className="text-xs">
                            {ticket.id}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Reported by <span className="font-medium text-foreground">{ticket.user}</span> • {ticket.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={
                        ticket.status === 'open' ? 'bg-red-100 text-red-700 hover:bg-red-200' : 
                        ticket.status === 'investigating' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 
                        'bg-green-100 text-green-700 hover:bg-green-200'
                      }>
                        {ticket.status.toUpperCase()}
                      </Badge>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-foreground">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card className="border-none shadow-sm bg-slate-900 text-white">
            <CardHeader>
              <CardTitle className="text-slate-100">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-slate-400">Open Tickets</span>
                <span className="font-bold text-xl">12</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-slate-400">Avg Resolution</span>
                <span className="font-bold text-xl">4.2 hrs</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-slate-400">Satisfaction</span>
                <span className="font-bold text-xl text-green-400">94%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminTicketsPage;
