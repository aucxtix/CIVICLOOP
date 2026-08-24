import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Clock, CheckCircle2, AlertTriangle, Upload, Camera, Loader2, Play, Route, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';

interface Task {
  id: string;
  category: string;
  status: string;
  address: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  description: string;
  priority: string;
  createdAt: string;
  citizen?: { name: string };
}

const WorkerDashboard = () => {
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Photo Evidence State
  const [showEvidenceUpload, setShowEvidenceUpload] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const [activeRes, pendingRes] = await Promise.all([
        api.get('/reports/my-tasks'),
        api.get('/reports/pending')
      ]);
      setActiveTasks(activeRes.data);
      setPendingTasks(pendingRes.data);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (taskId: string, newStatus: string) => {
    if (newStatus === 'COMPLETED' && !afterImage) {
      setShowEvidenceUpload(taskId);
      return;
    }

    setIsUpdating(true);
    try {
      await api.put(`/reports/${taskId}/status`, { 
        status: newStatus,
        ...(afterImage && { afterImageUrl: afterImage })
      });
      
      toast.success(`Task status updated to ${newStatus.replace('_', ' ')}`);
      if (newStatus === 'COMPLETED') {
        setAfterImage(null);
        setShowEvidenceUpload(null);
      }
      fetchTasks();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEvidenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAfterImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getNextStatusAction = (currentStatus: string) => {
    switch (currentStatus) {
      case 'REPORTED': return { label: 'Accept Task', next: 'ASSIGNED', icon: CheckCircle2, color: 'bg-primary hover:bg-primary/90 text-white' };
      case 'ASSIGNED': return { label: 'Start Route', next: 'EN_ROUTE', icon: Navigation, color: 'bg-blue-600 hover:bg-blue-700 text-white' };
      case 'EN_ROUTE': return { label: 'Mark Arrived', next: 'ARRIVED', icon: MapPin, color: 'bg-indigo-600 hover:bg-indigo-700 text-white' };
      case 'ARRIVED': return { label: 'Start Cleanup', next: 'IN_PROGRESS', icon: Play, color: 'bg-amber-500 hover:bg-amber-600 text-white' };
      case 'IN_PROGRESS': return { label: 'Complete Task', next: 'COMPLETED', icon: ShieldCheck, color: 'bg-green-600 hover:bg-green-700 text-white' };
      default: return null;
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
    <div className="w-full space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Task Command Center</h1>
          <p className="text-muted-foreground mt-1">Manage your active operations and pending pickups.</p>
        </div>
        <div className="flex items-center gap-4 bg-card p-2 rounded-xl shadow-sm border border-border">
          <div className="text-center px-4 border-r border-border">
            <div className="text-2xl font-black text-foreground">{activeTasks.length}</div>
            <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Active</div>
          </div>
          <div className="text-center px-4">
            <div className="text-2xl font-black text-foreground">{pendingTasks.length}</div>
            <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Pending</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ACTIVE TASKS SECTION */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
            Active Tasks
          </h2>
          
          {activeTasks.length === 0 ? (
            <Card className="border-dashed bg-background shadow-none border-2">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="w-12 h-12 text-slate-300 mb-4" />
                <h3 className="font-bold text-foreground">No active tasks</h3>
                <p className="text-sm text-muted-foreground mt-1">Accept a pending task from the queue to start.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {activeTasks.map((task) => {
                const action = getNextStatusAction(task.status);
                const isUploadingEvidence = showEvidenceUpload === task.id;

                return (
                  <Card key={task.id} className="overflow-hidden shadow-sm border-border border-l-4 border-l-blue-500">
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="w-full sm:w-48 h-48 sm:h-auto bg-black relative flex-shrink-0">
                        <img 
                          src={task.imageUrl} 
                          alt="Task" 
                          className="w-full h-full object-cover opacity-80"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x300' }}
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-blue-600 text-white font-bold tracking-widest text-[10px] uppercase shadow-sm">
                            {task.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-xl text-foreground">{task.category} Waste</h3>
                            {task.priority === 'HIGH' && (
                              <Badge className="bg-red-100 text-red-700 hover:bg-red-100">HIGH PRIORITY</Badge>
                            )}
                          </div>
                          
                          <div className="flex items-start gap-2 bg-background p-2.5 rounded-lg border border-border mb-3">
                            <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground font-medium">{task.address || 'Location Captured via GPS'}</span>
                          </div>
                          
                          {task.description && (
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{task.description}</p>
                          )}
                        </div>

                        {/* Evidence Upload Section */}
                        {isUploadingEvidence && (
                          <div className="mb-4 p-4 bg-green-50 rounded-xl border border-green-100">
                            <h4 className="font-bold text-green-900 text-sm mb-2">Required: Cleanup Evidence</h4>
                            
                            {!afterImage ? (
                              <div className="flex gap-3">
                                <Button onClick={() => fileInputRef.current?.click()} className="flex-1 bg-card text-green-700 border border-green-200 hover:bg-green-100">
                                  <Upload className="mr-2 h-4 w-4" /> Upload
                                </Button>
                                <Button className="flex-1 bg-green-600 text-white hover:bg-green-700">
                                  <Camera className="mr-2 h-4 w-4" /> Camera
                                </Button>
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleEvidenceUpload} />
                              </div>
                            ) : (
                              <div className="flex gap-4 items-center">
                                <img src={afterImage} className="w-20 h-20 rounded-lg object-cover border-2 border-green-500" />
                                <div className="flex-1">
                                  <div className="text-sm font-bold text-green-700 flex items-center gap-1 mb-2">
                                    <CheckCircle2 className="w-4 h-4" /> Evidence Ready
                                  </div>
                                  <Button 
                                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => handleUpdateStatus(task.id, 'COMPLETED')}
                                    disabled={isUpdating}
                                  >
                                    {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Completion'}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Action Buttons */}
                        {!isUploadingEvidence && action && (
                          <div className="flex gap-3 mt-4 sm:mt-0 pt-4 border-t border-border">
                            <Button 
                              variant="outline"
                              className="flex-1 text-muted-foreground"
                              onClick={() => window.open(`https://maps.google.com/?q=${task.latitude},${task.longitude}`, '_blank')}
                            >
                              <Route className="mr-2 h-4 w-4" /> Map
                            </Button>
                            
                            <Button 
                              className={`flex-[2] ${action.color} font-semibold transition-all`}
                              onClick={() => handleUpdateStatus(task.id, action.next)}
                              disabled={isUpdating}
                            >
                              {isUpdating ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <><action.icon className="mr-2 h-4 w-4" /> {action.label}</>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* PENDING TASKS (QUEUE) */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
            <Clock className="w-5 h-5 text-slate-400" />
            Open Queue
          </h2>
          
          <div className="bg-background border border-border rounded-2xl p-4 h-[calc(100vh-220px)] overflow-y-auto space-y-4">
            {pendingTasks.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <p>No pending tasks available.</p>
              </div>
            ) : (
              pendingTasks.map((task) => (
                <Card key={task.id} className="shadow-sm hover:shadow-md transition-shadow border-border cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-foreground">{task.category}</h4>
                      <span className="text-xs text-muted-foreground font-medium">
                        {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    
                    <div className="text-xs text-muted-foreground flex items-start gap-1.5 mb-3 line-clamp-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                      {task.address || 'GPS Location'}
                    </div>

                    <Button 
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs h-9"
                      onClick={() => handleUpdateStatus(task.id, 'ASSIGNED')}
                      disabled={isUpdating}
                    >
                      {isUpdating ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Accept Task'}
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default WorkerDashboard;
