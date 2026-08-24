import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera, Loader2, RefreshCw, ChevronRight, AlertTriangle, CheckCircle2, ScanLine } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';

const ClassifyWastePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ category: string, confidence: number, isWaste: boolean } | null>(null);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        analyzeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64Img: string) => {
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      const response = await api.post('/ai/classify', { image: base64Img });
      setResult(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to analyze image. Please try again.');
      setResult({
        category: 'Error',
        confidence: 0,
        isWaste: false
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRetake = () => {
    setImage(null);
    setResult(null);
  };

  const proceedToReport = () => {
    // Navigate to report page with the analyzed data
    // In a real app, we'd pass this via state or a context store
    navigate('/citizen/report', { 
      state: { 
        image, 
        category: result?.category, 
        confidence: result?.confidence 
      } 
    });
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Classify Waste</h1>
        <p className="text-muted-foreground mt-1">Upload an image and let AI identify the waste category.</p>
      </div>

      {!image ? (
        <Card className="border-dashed border-2 bg-background/50 shadow-none">
          <CardContent className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-green-100 text-primary rounded-full flex items-center justify-center mb-6">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Upload a photo of the waste</h3>
            <p className="text-muted-foreground max-w-sm mb-8 text-sm">
              Take a clear picture of the item. Our AI will automatically categorize it to ensure proper disposal.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button onClick={() => fileInputRef.current?.click()} className="h-12 px-8 font-semibold shadow-sm">
                <Upload className="mr-2 h-4 w-4" /> Browse Files
              </Button>
              <Button variant="outline" className="h-12 px-8 font-semibold">
                <Camera className="mr-2 h-4 w-4" /> Use Camera
              </Button>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="overflow-hidden shadow-sm">
            <div className="relative aspect-square md:aspect-auto md:h-full bg-black">
              <img src={image} alt="Uploaded waste" className="w-full h-full object-contain" />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white backdrop-blur-sm transition-all">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <ScanLine className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary animate-pulse" />
                  </div>
                  <p className="mt-4 font-bold tracking-widest text-sm animate-pulse">ANALYZING IMAGE...</p>
                </div>
              )}
            </div>
          </Card>

          <Card className="shadow-sm flex flex-col">
            <CardHeader className="border-b bg-background/50">
              <CardTitle>Analysis Result</CardTitle>
              <CardDescription>AI-powered waste identification</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-6 flex flex-col justify-center">
              {isAnalyzing ? (
                <div className="text-center text-muted-foreground py-10">
                  <Loader2 className="w-8 h-8 animate-spin mb-4 text-slate-300" />
                  <p>Processing visual data...</p>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  {result.isWaste ? (
                    <>
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-green-100 text-primary rounded-2xl mb-4">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-bold text-foreground">{result.category}</h3>
                        <p className="text-sm font-medium text-muted-foreground mt-1">
                          Confidence Score: <span className={result.confidence > 0.8 ? 'text-green-600' : 'text-amber-500'}>
                            {(result.confidence * 100).toFixed(1)}%
                          </span>
                        </p>
                      </div>
                      
                      {result.confidence < 0.8 && (
                         <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-sm flex items-start gap-3">
                           <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                           <p>Classification confidence is low. Please confirm the category when submitting your report.</p>
                         </div>
                      )}
                      
                      <div className="bg-background p-4 rounded-xl border border-border">
                        <h4 className="font-semibold text-sm mb-2">Disposal Guidance</h4>
                        <p className="text-sm text-muted-foreground">
                          {result.category === 'Plastic' ? 'Ensure containers are empty and rinsed. Place in the blue recycling bin.' :
                           result.category === 'Organic' ? 'Suitable for composting. Do not include plastics or glass.' :
                           'Please follow standard recycling guidelines for your municipality.'}
                        </p>
                      </div>
                    </>
                  ) : result.category === 'Error' ? (
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center p-3 bg-red-100 text-red-600 rounded-2xl mb-4">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">API Error</h3>
                  <p className="text-muted-foreground text-sm w-full leading-relaxed">
                    There was a problem communicating with the AI. Check backend logs.
                  </p>
                </div>
              ) : !result.isWaste ? (
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center p-3 bg-red-100 text-red-600 rounded-2xl mb-4">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Not Recognized</h3>
                  <p className="text-muted-foreground text-sm w-full leading-relaxed mb-4">
                    This image doesn't appear to contain recognizable waste.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-sm flex items-start gap-3 text-left">
                     <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                     <p>If you believe this is an error and this is actually waste, you can still proceed to report it manually.</p>
                  </div>
                </div>
              ) : null}
                </div>
              ) : null}
            </CardContent>
            <CardFooter className="border-t bg-background/50 p-6 flex gap-4">
              <Button variant="outline" className="flex-1" onClick={handleRetake} disabled={isAnalyzing}>
                <RefreshCw className="mr-2 h-4 w-4" /> Retake
              </Button>
              <Button 
                className="flex-1" 
                onClick={proceedToReport} 
                disabled={isAnalyzing}
              >
                Proceed <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ClassifyWastePage;
