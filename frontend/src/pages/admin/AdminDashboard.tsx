import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, ShieldCheck, AlertTriangle, Users, Truck, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';

interface Report {
  id: string;
  category: string;
  status: string;
  address: string;
  imageUrl: string;
  afterImageUrl: string;
  createdAt: string;
  citizen?: { name: string, email: string };
  worker?: { name: string, email: string };
}

const AdminDashboard = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/admin/reports');
      setReports(response.data);
    } catch (error) {
      toast.error('Failed to load city data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (id: string, isApproved: boolean) => {
    setVerifyingId(id);
    try {
      await api.put(`/admin/reports/${id}/verify`, { 
        isApproved,
        civicTrustScore: isApproved ? 95 : 0 
      });
      toast.success(isApproved ? 'Cleanup Verified & Credits Awarded!' : 'Verification Rejected');
      fetchData();
    } catch (error) {
      toast.error('Verification failed');
    } finally {
      setVerifyingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const pendingVerification = reports.filter(r => r.status === 'COMPLETED');
  const activeReports = reports.filter(r => ['REPORTED', 'ASSIGNED', 'EN_ROUTE', 'ARRIVED', 'IN_PROGRESS'].includes(r.status));

  return (
    <div className="w-full space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">City Command Center</h1>
        <p className="text-muted-foreground mt-1">Live operational intelligence and verification queue.</p>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 flex flex-col justify-between space-y-2">
            <div className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" /> Active Issues
            </div>
            <div className="text-3xl font-bold">{activeReports.length}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-blue-50">
          <CardContent className="p-6 flex flex-col justify-between space-y-2">
            <div className="text-sm font-semibold text-blue-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> Pending Verification
            </div>
            <div className="text-3xl font-bold text-blue-900">{pendingVerification.length}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 flex flex-col justify-between space-y-2">
            <div className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <Truck className="w-4 h-4 text-slate-400" /> Active Workers
            </div>
            <div className="text-3xl font-bold">12 <span className="text-xs font-normal text-slate-400">/ 45</span></div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 flex flex-col justify-between space-y-2">
            <div className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> Total Verified
            </div>
            <div className="text-3xl font-bold text-green-700">
              {reports.filter(r => r.status === 'VERIFIED').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* VERIFICATION QUEUE */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            Verification Queue
          </h2>
          
          {pendingVerification.length === 0 ? (
            <Card className="border-dashed bg-background shadow-none border-2">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="w-12 h-12 text-slate-300 mb-4" />
                <h3 className="font-bold text-foreground">Queue Empty</h3>
                <p className="text-sm text-muted-foreground mt-1">All cleanups have been verified.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {pendingVerification.map((report) => (
                <Card key={report.id} className="overflow-hidden shadow-sm border-border">
                  <div className="p-4 bg-background border-b border-border flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-100 text-blue-700">NEEDS VERIFICATION</Badge>
                      <span className="text-sm font-semibold text-foreground">{report.category} Waste</span>
                    </div>
                    <div className="text-xs font-mono text-slate-400">ID: {report.id.split('-')[0]}</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Before Image */}
                    <div className="relative aspect-video md:aspect-auto h-48 bg-black">
                      <img src={report.imageUrl} className="w-full h-full object-cover opacity-90" />
                      <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md">BEFORE</div>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md flex items-center gap-1">
                        <Users className="w-3 h-3" /> Citizen: {report.citizen?.name || 'Unknown'}
                      </div>
                    </div>
                    {/* After Image */}
                    <div className="relative aspect-video md:aspect-auto h-48 bg-black border-l border-slate-700">
                      <img src={report.afterImageUrl} className="w-full h-full object-cover opacity-90" />
                      <div className="absolute top-2 left-2 bg-green-500/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md">AFTER EVIDENCE</div>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md flex items-center gap-1">
                        <Truck className="w-3 h-3" /> Worker: {report.worker?.name || 'Unknown'}
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-start gap-2 bg-background p-2.5 rounded-lg border border-border w-full md:w-auto">
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground font-medium">{report.address || 'GPS Location'}</span>
                    </div>
                    
                    <div className="flex gap-3 w-full md:w-auto">
                      <Button 
                        variant="outline" 
                        className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        onClick={() => handleVerify(report.id, false)}
                        disabled={verifyingId !== null}
                      >
                        {verifyingId === report.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <><XCircle className="w-4 h-4 mr-2" /> Reject</>}
                      </Button>
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white shadow-sm"
                        onClick={() => handleVerify(report.id, true)}
                        disabled={verifyingId !== null}
                      >
                        {verifyingId === report.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShieldCheck className="w-4 h-4 mr-2" /> Verify & Award</>}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* RECENT REPORTS LOG */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
            City Operations Log
          </h2>
          
          <div className="bg-card border border-border rounded-2xl p-4 h-[calc(100vh-220px)] overflow-y-auto space-y-4 shadow-sm">
            {reports.slice(0, 20).map((report) => (
              <div key={report.id} className="pb-4 border-b border-border last:border-0 last:pb-0 flex gap-3">
                <div className="mt-1">
                  {report.status === 'VERIFIED' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> :
                   report.status === 'REPORTED' ? <AlertTriangle className="w-5 h-5 text-orange-500" /> :
                   <Truck className="w-5 h-5 text-blue-500" />}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{report.category} <span className="text-muted-foreground font-normal ml-1">• {report.status.replace('_', ' ')}</span></div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-1">{report.address || 'Location Captured'}</div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">{new Date(report.createdAt).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
