import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Loader2, Navigation, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/lib/api';

const ReportWastePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [image, setImage] = useState<string | null>(location.state?.image || null);
  const [category, setCategory] = useState<string>(location.state?.category || 'Unknown');
  const [confidence, setConfidence] = useState<number>(location.state?.confidence || 0);
  
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!image) {
      toast.error("No image provided. Please classify waste first.");
      navigate('/citizen/classify');
    }
  }, [image, navigate]);

  const handleRetake = () => {
    navigate('/citizen/classify');
  };

  const captureLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          // Mock reverse geocoding for now
          setTimeout(() => {
            setAddress('123 Green Avenue, Sector 4');
            setIsLocating(false);
            toast.success("Location captured successfully");
          }, 800);
        },
        (error) => {
          setIsLocating(false);
          toast.error("Failed to get location. Please enter address manually.");
        }
      );
    } else {
      setIsLocating(false);
      toast.error("Geolocation is not supported by your browser");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coords && !address) {
      return toast.error('Please provide a location');
    }

    setIsSubmitting(true);
    try {
      // Create Report via API
      await api.post('/reports', {
        imageUrl: image, // Ideally this would be uploaded to S3 first, passing base64 for MVP
        category,
        aiConfidence: confidence,
        description,
        address,
        latitude: coords?.lat || 0,
        longitude: coords?.lng || 0
      });

      setIsSuccess(true);
      
      // Navigate to dashboard after short delay
      setTimeout(() => {
        navigate('/citizen');
      }, 2000);
    } catch (error) {
      toast.error('Failed to submit report. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!image) return null;

  if (isSuccess) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 text-primary rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Report Submitted!</h2>
        <p className="text-muted-foreground max-w-sm">
          Thank you for making your community cleaner. We are assigning a worker to this location.
        </p>
        <div className="text-sm font-bold text-primary bg-green-50 px-4 py-2 rounded-lg">
          +50 Civic Credits Earned (Pending Verification)
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Report Waste</h1>
        <p className="text-muted-foreground mt-1">Provide location details to dispatch a worker.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Image & AI Data */}
        <div className="md:col-span-1 space-y-4">
          <Card className="overflow-hidden border-none shadow-sm bg-slate-100">
            <div className="aspect-square bg-black">
              <img src={image} alt="Waste" className="w-full h-full object-contain" />
            </div>
            <div className="p-4 bg-card border-t border-border">
              <div className="flex justify-between items-center mb-3">
                <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">AI Classification</div>
                <div className="text-xs flex items-center gap-1">
                  <span className="text-muted-foreground">Confidence:</span>
                  <span className={confidence > 0.8 ? 'text-primary font-bold' : 'text-amber-500 font-bold'}>
                    {(confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Verify Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full bg-background border-border">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Plastic">Plastic Waste</SelectItem>
                    <SelectItem value="Organic">Organic Waste</SelectItem>
                    <SelectItem value="Metal">Metal / Cans</SelectItem>
                    <SelectItem value="Glass">Glass</SelectItem>
                    <SelectItem value="Electronic">E-Waste</SelectItem>
                    <SelectItem value="Hazardous">Hazardous Material</SelectItem>
                    <SelectItem value="Illegal Dumping">Illegal Dumping (Furniture, bulk, etc)</SelectItem>
                    <SelectItem value="Other">Other / Unknown</SelectItem>
                  </SelectContent>
                </Select>
                {category !== location.state?.category && (
                  <p className="text-xs text-blue-600 mt-1">You have overridden the AI classification. Thank you for your feedback!</p>
                )}
              </div>
              
              <Button variant="outline" className="w-full mt-6 bg-background hover:bg-slate-100" onClick={handleRetake}>
                <RefreshCw className="w-4 h-4 mr-2" /> Retake Photo
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card className="shadow-sm">
              <CardHeader className="border-b bg-background/50">
                <CardTitle>Location & Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                
                {/* Location Section */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">Where is this?</label>
                  
                  {coords ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                      <div className="p-2 bg-card rounded-lg text-primary shadow-sm mt-0.5">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground text-sm">{address || 'Location Captured'}</div>
                        <div className="text-xs text-muted-foreground mt-1 font-mono">
                          {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={captureLocation} type="button" className="text-xs">
                        Update
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full h-12 bg-background hover:bg-slate-100 border-border font-semibold"
                        onClick={captureLocation}
                        disabled={isLocating}
                      >
                        {isLocating ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Locating...</>
                        ) : (
                          <><Navigation className="mr-2 h-4 w-4 text-blue-500" /> Use Current Location</>
                        )}
                      </Button>
                      
                      <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-border"></div>
                        <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-medium uppercase">Or enter address</span>
                        <div className="flex-grow border-t border-border"></div>
                      </div>
                      
                      <Input 
                        placeholder="e.g. Near Central Park entrance" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="h-11 bg-background border-border"
                      />
                    </div>
                  )}
                </div>

                {/* Description Section */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">Additional Details (Optional)</label>
                  <textarea 
                    className="flex min-h-[100px] w-full rounded-xl border border-border bg-background px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    placeholder="E.g., Heavy items, blocking the road, sharp glass..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {confidence < 0.8 && (
                   <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-xs flex items-start gap-3 mt-4">
                     <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                     <p>AI confidence is low. By submitting, you confirm the waste category ({category}) is generally correct.</p>
                   </div>
                )}
                
              </CardContent>
              <CardFooter className="border-t bg-background/50 p-6">
                <Button 
                  type="submit" 
                  className="w-full h-12 font-semibold bg-[#15803D] hover:bg-[#166534] transition-all"
                  disabled={isSubmitting || (!coords && !address)}
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting Report...</>
                  ) : (
                    'Submit Report'
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportWastePage;
