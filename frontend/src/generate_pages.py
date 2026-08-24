import os

# Define the pages to create
citizen_pages = {
    'CollectionPointsPage': {'title': 'Collection Points', 'desc': 'Find nearby recycling and waste drop-off locations.', 'data': '3 active points nearby.'},
    'CollectionRequestPage': {'title': 'Request Collection', 'desc': 'Schedule a special pickup for bulky waste.', 'data': 'No active requests.'},
    'PickupSchedulePage': {'title': 'Pickup Schedule', 'desc': 'View your upcoming waste collection dates.', 'data': 'Next pickup: Tomorrow at 8 AM.'},
    'NotificationsPage': {'title': 'Notifications', 'desc': 'Your alerts and updates from CivicLoop.', 'data': 'You have 2 unread notifications.'},
    'AnalyticsPage': {'title': 'Your Analytics', 'desc': 'Track your environmental impact over time.', 'data': 'You recycled 12kg this month.'},
    'GreenPointsPage': {'title': 'Green Points', 'desc': 'Redeem your earned points for rewards.', 'data': 'Current Balance: 1,250 points.'},
    'ProfilePage': {'title': 'Profile', 'desc': 'Manage your personal information.', 'data': 'Profile is 80% complete.'},
    'SettingsPage': {'title': 'Settings', 'desc': 'Configure your account preferences.', 'data': 'All systems operational.'}
}

worker_pages = {
    'WorkerTasksPage': {'title': 'Active Tasks', 'desc': 'Your assigned routes and pickups.', 'data': '5 pending tasks.'},
    'WorkerHistoryPage': {'title': 'Work History', 'desc': 'Past completed pickups and routes.', 'data': '42 tasks completed this week.'},
    'WorkerMapPage': {'title': 'Live Map', 'desc': 'Real-time navigation and routing.', 'data': 'GPS signal strong.'},
    'WorkerPerformancePage': {'title': 'Performance', 'desc': 'Your efficiency and metrics.', 'data': '98% on-time completion rate.'},
    'WorkerProfilePage': {'title': 'Profile', 'desc': 'Worker details and ID.', 'data': 'Active status: On Duty.'},
    'WorkerSettingsPage': {'title': 'Settings', 'desc': 'App preferences and notifications.', 'data': 'Notifications enabled.'}
}

admin_pages = {
    'AdminMapPage': {'title': 'Live City Map', 'desc': 'City-wide real-time view of operations.', 'data': 'All zones covered.'},
    'AdminReportsPage': {'title': 'Reports Management', 'desc': 'Review and assign citizen reports.', 'data': '15 new reports today.'},
    'AdminTicketsPage': {'title': 'Support Tickets', 'desc': 'Handle user inquiries and issues.', 'data': '3 open tickets.'},
    'AdminWorkersPage': {'title': 'Worker Fleet', 'desc': 'Manage active workforce and assignments.', 'data': '12 workers currently on duty.'},
    'AdminVerificationsPage': {'title': 'Verifications', 'desc': 'Verify AI classifications and worker completion photos.', 'data': '8 items pending manual verification.'},
    'AdminHotspotsPage': {'title': 'Waste Hotspots', 'desc': 'Identify areas with high illegal dumping.', 'data': '2 critical hotspots identified.'},
    'AdminAnalyticsPage': {'title': 'City Analytics', 'desc': 'Overall system performance and metrics.', 'data': 'Waste diversion up 15% this quarter.'},
    'AdminRewardsPage': {'title': 'Rewards Program', 'desc': 'Manage partnerships and reward redemptions.', 'data': 'New partnership with GreenMart active.'},
    'AdminSettingsPage': {'title': 'System Settings', 'desc': 'Global platform configuration.', 'data': 'System running optimally.'}
}

template = """import {{ Card, CardContent, CardHeader, CardTitle, CardDescription }} from '@/components/ui/card';
import {{ Button }} from '@/components/ui/button';

const {component_name} = () => {{
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
        <p className="text-slate-500 mt-1">{desc}</p>
      </div>
      
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Sample data for this module</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <p className="text-slate-600 font-medium">{data}</p>
              <Button className="mt-4" variant="outline">Action Button</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}};

export default {component_name};
"""

base_dir = '/home/furatixx/Desktop/civic loop/frontend/src/pages'

def create_pages(pages_dict, folder):
    os.makedirs(os.path.join(base_dir, folder), exist_ok=True)
    for name, data in pages_dict.items():
        filepath = os.path.join(base_dir, folder, f"{name}.tsx")
        if not os.path.exists(filepath):
            with open(filepath, 'w') as f:
                f.write(template.format(component_name=name, title=data['title'], desc=data['desc'], data=data['data']))
            print(f"Created {filepath}")

create_pages(citizen_pages, 'citizen')
create_pages(worker_pages, 'worker')
create_pages(admin_pages, 'admin')

print("All pages created successfully.")
