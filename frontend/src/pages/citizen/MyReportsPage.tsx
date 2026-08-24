import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, Calendar, Clock, Image as ImageIcon } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

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

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">My Reports</h1>
        <p className="text-muted-foreground mt-1">Track the status of your reported waste issues.</p>
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
