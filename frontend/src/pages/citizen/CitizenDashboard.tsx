import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Upload, MapPin, ChevronRight, CheckCircle2, ScanLine, Trash2, Truck, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, subtext, icon: Icon, iconBg, iconColor, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="h-full"
  >
    <Card className="shadow-sm border-none bg-card h-full hover:shadow-md transition-shadow">
      <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-xl ${iconBg}`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <div className="text-sm font-semibold text-foreground leading-tight">
            {title}
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-foreground">{value}</div>
          <div className="text-xs text-muted-foreground mt-1 font-medium">{subtext}</div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const CitizenDashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard 
          title="Waste Items Classified" 
          value="128" 
          subtext="+12 this week" 
          icon={ScanLine} 
          iconBg="bg-purple-100" 
          iconColor="text-purple-600"
          delay={0.1}
        />
        <StatCard 
          title="Reports Submitted" 
          value="24" 
          subtext="+5 this week" 
          icon={Trash2} 
          iconBg="bg-orange-100" 
          iconColor="text-orange-500"
          delay={0.2}
        />
        <StatCard 
          title="Pickups Completed" 
          value="18" 
          subtext="+4 this week" 
          icon={Truck} 
          iconBg="bg-blue-100" 
          iconColor="text-blue-500"
          delay={0.3}
        />
        <StatCard 
          title="Green Points Earned" 
          value="1,250" 
          subtext={<span className="text-green-600">+150 this week</span>}
          icon={Leaf} 
          iconBg="bg-green-100" 
          iconColor="text-green-600"
          delay={0.4}
        />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Classify Waste Card (takes 2 columns) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-[#0F5A29] to-[#15803D] p-8 text-white relative overflow-hidden shadow-md"
        >
          <div className="relative z-10 max-w-sm space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Classify Waste</h2>
              <p className="text-green-100 text-sm leading-relaxed">
                Upload or capture an image to identify the waste type.
              </p>
            </div>
            <div className="space-y-3">
              <Button asChild className="w-full bg-card text-green-700 hover:bg-slate-100 font-semibold shadow-sm h-11" variant="secondary">
                <Link to="/citizen/classify" className="block w-full">
                  <Upload className="mr-2 h-4 w-4" /> Upload Image
                </Link>
              </Button>
              <Button asChild className="w-full bg-green-800/40 text-white hover:bg-green-800/60 border border-green-700 font-semibold shadow-sm h-11">
                <Link to="/citizen/classify" className="block w-full">
                  <Camera className="mr-2 h-4 w-4" /> Use Camera
                </Link>
              </Button>
            </div>
          </div>
          {/* Mockup of 3D bin image */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 hidden md:block opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700">
            <img src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=2070&auto=format&fit=crop" alt="Waste" className="object-cover w-full h-full opacity-60 rounded-tl-full mix-blend-overlay" />
          </div>
        </motion.div>

        {/* Recent Activity (1 column) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="h-full"
        >
          <Card className="border-none shadow-sm h-full">
            <CardHeader className="pb-3 border-b border-slate-50 mb-3 px-5 pt-5 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-foreground">Recent Activity</CardTitle>
              <Link to="/citizen/history" className="text-xs font-semibold text-green-600">View all</Link>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-5">
              {[
                { title: 'Plastic Bottle classified', time: '2 mins ago', icon: ScanLine, iconColor: 'text-blue-500', action: '+20 pts', actionColor: 'text-green-600' },
                { title: 'Garbage Reported', time: '1 hour ago', icon: Trash2, iconColor: 'text-orange-500', action: 'Reported', actionColor: 'text-orange-500' },
                { title: 'Pickup Scheduled', time: '2 hours ago', icon: Truck, iconColor: 'text-blue-500', action: 'Scheduled', actionColor: 'text-blue-500' },
                { title: 'Glass Bottle classified', time: '5 hours ago', icon: ScanLine, iconColor: 'text-green-600', action: '+20 pts', actionColor: 'text-green-600' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{activity.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{activity.time}</div>
                    </div>
                  </div>
                  <div className={`text-xs font-bold ${activity.actionColor}`}>
                    {activity.action}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nearby Collection Point */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="border-none shadow-sm flex overflow-hidden h-full">
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-4">Nearby Collection Point</h3>
                <div className="flex items-start gap-3 mb-2">
                  <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground text-sm">Green Earth Recycler</span>
                      <span className="text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded font-bold">Open</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">450 m away • Powai, Mumbai</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground ml-12">Accepts: Plastic, Paper, Glass, Metal</p>
              </div>
              <Button asChild variant="outline" className="w-max mt-4 text-xs font-semibold h-9 px-4">
                <Link to="/citizen/collection-points">
                  <MapPin className="mr-2 h-3.5 w-3.5 text-green-600" /> Navigate
                </Link>
              </Button>
            </div>
            <div className="w-1/3 bg-slate-100 relative">
               <div className="absolute inset-0 overflow-hidden">
               <iframe 
                 width="100%" 
                 height="100%" 
                 frameBorder="0" 
                 scrolling="no" 
                 marginHeight={0} 
                 marginWidth={0} 
                 src="https://www.openstreetmap.org/export/embed.html?bbox=72.85%2C19.05%2C72.95%2C19.15&amp;layer=mapnik&amp;marker=19.1197%2C72.9068" 
                 style={{ border: 0, filter: 'grayscale(100%) opacity(0.5)' }}
               ></iframe>
             </div>
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-600">
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                   <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"/>
                 </svg>
               </div>
            </div>
          </Card>
        </motion.div>

        {/* Your Impact */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="border-none shadow-sm h-full">
            <CardHeader className="pb-3 border-b border-slate-50 mb-3 px-5 pt-5 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-foreground">Your Impact</CardTitle>
              <Link to="/citizen/analytics" className="text-xs font-medium text-muted-foreground flex items-center gap-1 cursor-pointer hover:text-green-600">
                This Month <ChevronRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground font-medium">Waste Diverted</span>
                </div>
                <span className="text-sm font-bold text-foreground">12.4 kg</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <ScanLine className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground font-medium">Recyclable Items Identified</span>
                </div>
                <span className="text-sm font-bold text-foreground">86</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-muted-foreground font-medium">Reports Resolved</span>
                </div>
                <span className="text-sm font-bold text-foreground">14</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <Leaf className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground font-medium">CO₂ Reduced (Est.)</span>
                </div>
                <span className="text-sm font-bold text-foreground">18.6 kg</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
export default CitizenDashboard;
