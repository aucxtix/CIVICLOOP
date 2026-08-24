import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AdminSettingsPage = () => {
  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">System Settings</h1>
        <p className="text-muted-foreground mt-1">Configure global application settings and API integrations.</p>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>AI Classification Settings</CardTitle>
          <CardDescription>Manage the Gemini AI model parameters used for waste classification.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 max-w-xl">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">API Key</label>
              <Input type="password" value="************************" readOnly className="bg-background border-border" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Model Version</label>
              <Input value="gemini-1.5-flash" readOnly className="bg-background border-border" />
            </div>
            <div className="pt-2">
              <Button type="button" className="font-bold bg-slate-900 hover:bg-slate-800 text-white">Update Configuration</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettingsPage;
