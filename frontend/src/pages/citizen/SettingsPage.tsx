import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Lock, Smartphone, Globe } from 'lucide-react';
import { toast } from 'sonner';

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings saved successfully');
  };

  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Account Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your preferences and security settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-2">
          <Button variant="ghost" className="w-full justify-start bg-accent text-accent-foreground font-bold">
            <Bell className="w-4 h-4 mr-2" /> Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground font-semibold">
            <Lock className="w-4 h-4 mr-2" /> Security
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground font-semibold">
            <Smartphone className="w-4 h-4 mr-2" /> Mobile App
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground font-semibold">
            <Globe className="w-4 h-4 mr-2" /> Language
          </Button>
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what updates you want to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-foreground text-sm">Pickup Reminders</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Receive a reminder the night before your scheduled pickup.</p>
                </div>
                <div 
                  className={`w-12 h-6 rounded-full cursor-pointer transition-colors relative ${notifications ? 'bg-green-600' : 'bg-slate-200'}`}
                  onClick={() => setNotifications(!notifications)}
                >
                  <div className={`w-5 h-5 bg-card rounded-full absolute top-0.5 transition-transform ${notifications ? 'left-6' : 'left-0.5'}`}></div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-6">
                <div>
                  <h4 className="font-bold text-foreground text-sm">Reward Alerts</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Alerts when new rewards are added or you reach a milestone.</p>
                </div>
                <div className="w-12 h-6 rounded-full cursor-pointer transition-colors relative bg-green-600">
                  <div className="w-5 h-5 bg-card rounded-full absolute top-0.5 transition-transform left-6"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Ensure your account remains secure.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Current Password</label>
                  <Input type="password" placeholder="Enter current password" className="bg-background border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">New Password</label>
                  <Input type="password" placeholder="Enter new password" className="bg-background border-border" />
                </div>
                <div className="pt-2">
                  <Button type="submit" className="font-bold bg-green-600 hover:bg-green-700 text-white">Update Password</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;