import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, Calendar, Clock, Image as ImageIcon, Headset, AlertTriangle } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Report {
  id: string;
  category: string;
  status: string;
  address: string;
  imageUrl: string;
  createdAt: string;
  civicTrustScore: number | null;
}

const MyReportsPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSupportDialogOpen, setIsSupportDialogOpen] = useState(false);
  const [supportIssue, setSupportIssue] = useState('');
  const [supportName, setSupportName] = useState('');
  const [supportPhone, setSupportPhone] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await api.get('/reports/my-reports');
      setReports(response.data);
    } catch (error) {
      toast.error('Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REPORTED': return 'bg-amber-100 text-amber-700 hover:bg-amber-100';
      case 'ASSIGNED':
      case 'EN_ROUTE':
      case 'ARRIVED':
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'COMPLETED': return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
      case 'VERIFIED': return 'bg-green-100 text-green-700 hover:bg-green-100';
      default: return 'bg-slate-100 text-foreground hover:bg-slate-100';
    }
  };

  const handleContactSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportIssue || !supportName || !supportPhone) return;
    toast.success('Your support request has been submitted. Our team will contact you shortly.');
    setIsSupportDialogOpen(false);
    setSupportIssue('');
    setSupportName('');
    setSupportPhone('');
  };

  const pendingReportsCount = reports.filter(r => r.status === 'REPORTED').length;

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My Reports</h1>
          <p className="text-muted-foreground mt-1">Track the status of your reported waste issues.</p>
        </div>
        
        {pendingReportsCount > 0 && (
          <Dialog open={isSupportDialogOpen} onOpenChange={setIsSupportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="font-bold shadow-sm group">
                <Headset className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Reports Ignored? Contact Support
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] overflow-hidden p-0 border-none bg-card shadow-2xl">
              <div className="bg-gradient-to-r from-red-500/20 to-red-500/5 p-6 border-b border-border/50 relative overflow-hidden">
                <div className="absolute top-[-20px] right-[-20px] opacity-10 rotate-12 scale-150">
                  <Headset className="w-40 h-40 text-destructive" />
                </div>
                <DialogHeader className="relative z-10">
                  <DialogTitle className="text-2xl font-black text-foreground flex items-center gap-2">
                    <Headset className="w-5 h-5 text-destructive" />
                    Customer Support
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground font-medium">
                    Are your reports being ignored? Connect with our support team to escalate the issue.
                  </DialogDescription>
                </DialogHeader>
              </div>
              
              <form onSubmit={handleContactSupport} className="p-6 space-y-4">
                <div className="space-y-4">
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600 font-medium">
                      You have {pendingReportsCount} pending report(s). Our support team can help escalate these issues with the local municipality.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 group">
                      <label htmlFor="name" className="text-sm font-bold text-foreground group-focus-within:text-destructive transition-colors">
                        Full Name
                      </label>
                      <input 
                        id="name"
                        type="text"
                        placeholder="John Doe" 
                        value={supportName}
                        onChange={(e) => setSupportName(e.target.value)}
                        className="w-full bg-background/50 border border-border/60 rounded-md p-3 focus:outline-none focus:border-destructive focus:ring-1 focus:ring-destructive/20 transition-all shadow-sm text-sm"
                        required
                      />
                    </div>
                    <div className="space-y-2 group">
                      <label htmlFor="phone" className="text-sm font-bold text-foreground group-focus-within:text-destructive transition-colors">
                        Phone Number
                      </label>
                      <input 
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000" 
                        value={supportPhone}
                        onChange={(e) => setSupportPhone(e.target.value)}
                        className="w-full bg-background/50 border border-border/60 rounded-md p-3 focus:outline-none focus:border-destructive focus:ring-1 focus:ring-destructive/20 transition-all shadow-sm text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <label htmlFor="issue" className="text-sm font-bold text-foreground group-focus-within:text-destructive transition-colors">
                      Briefly Describe the Issue
                    </label>
                    <textarea 
                      id="issue"
                      rows={3}
                      placeholder="e.g., Construction company dumping toxic waste for 3 weeks straight with no city response..." 
                      value={supportIssue}
                      onChange={(e) => setSupportIssue(e.target.value)}
                      className="w-full bg-background/50 border border-border/60 rounded-md p-3 focus:outline-none focus:border-destructive focus:ring-1 focus:ring-destructive/20 transition-all shadow-sm text-sm"
                      required
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsSupportDialogOpen(false)} className="flex-1 font-bold">
                    Cancel
                  </Button>
                  <Button type="submit" variant="destructive" className="flex-1 font-bold shadow-md">
                    Contact Support
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {reports.length === 0 ? (
        <Card className="border-dashed bg-background shadow-none">
          <CardContent className="flex flex-col items-center justify-center py-24 text-center">
             <div className="w-16 h-16 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-bold text-foreground mb-2">No reports yet</h3>
             <p className="text-muted-foreground text-sm max-w-sm">
               You haven't reported any waste yet. When you do, you can track its operational status here.
             </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <Card key={report.id} className="overflow-hidden flex flex-col shadow-sm border-border hover:shadow-md transition-shadow">
              <div className="h-48 bg-black relative">
                <img 
                  src={report.imageUrl} 
                  alt={report.category} 
                  className="w-full h-full object-cover opacity-90"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x300?text=No+Image' }}
                />
                <div className="absolute top-3 right-3">
                  <Badge className={getStatusColor(report.status)}>
                    {report.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
              <CardContent className="flex-1 p-5 space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-foreground">{report.category} Waste</h3>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    {new Date(report.createdAt).toLocaleDateString()}
                    <Clock className="w-3.5 h-3.5 ml-3 mr-1" />
                    {new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                
                <div className="flex items-start gap-2 bg-background p-3 rounded-lg border border-border">
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground leading-relaxed font-medium">
                    {report.address || 'GPS Location Captured'}
                  </span>
                </div>

                {report.status === 'VERIFIED' && report.civicTrustScore && (
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">CivicTrust Score</span>
                      <span className="text-sm font-black text-primary">{report.civicTrustScore} / 100</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReportsPage;
