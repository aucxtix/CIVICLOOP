import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react';
import { toast } from 'sonner';

const ProfilePage = () => {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };

  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information and contact details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="relative mb-4 group cursor-pointer">
                <div className="w-32 h-32 rounded-full bg-slate-200 border-4 border-white shadow-lg overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Citizen" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground">Jane Citizen</h2>
              <p className="text-sm font-medium text-muted-foreground">Eco Champion</p>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="border-none shadow-sm h-full">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input defaultValue="Jane Citizen" className="pl-10 bg-background h-11" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input defaultValue="jane@example.com" type="email" className="pl-10 bg-background h-11" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input defaultValue="+1 (555) 987-6543" className="pl-10 bg-background h-11" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Home Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input defaultValue="456 Eco Avenue, NY" className="pl-10 bg-background h-11" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end border-t border-border pt-6">
                  <Button type="submit" className="px-8 font-bold h-11 bg-green-600 hover:bg-green-700 text-white shadow-sm">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;