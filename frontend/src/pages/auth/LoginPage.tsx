import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Leaf, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', data);
      const { user, token } = response.data;
      
      login(user, token);
      toast.success('Successfully logged in!');
      
      // Navigate based on role
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else if (user.role === 'WORKER') {
        navigate('/worker');
      } else {
        navigate('/citizen');
      }
    } catch (error: any) {
      if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
        const role = data.email.includes('admin') ? 'ADMIN' : data.email.includes('worker') ? 'WORKER' : 'CITIZEN';
        const mockUser = {
          id: 'demo-id',
          name: data.email.split('@')[0],
          email: data.email,
          role,
          civicCredits: 1250,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        login(mockUser as any, 'demo-token');
        toast.success('Backend Unreachable: Logged in via Hackathon Demo Mode!');
        if (role === 'ADMIN') navigate('/admin');
        else if (role === 'WORKER') navigate('/worker');
        else navigate('/citizen');
        return;
      }
      toast.error(error.response?.data?.error || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden font-sans selection:bg-green-200">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-green-200/40 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-200/40 blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-[0.03] mix-blend-multiply"></div>
      </div>

      <div className="w-full max-w-5xl z-10 flex shadow-2xl rounded-3xl overflow-hidden bg-card/70 backdrop-blur-2xl border border-white m-4">
        
        {/* Left Side - Image/Branding */}
        <div className="hidden md:flex md:w-1/2 relative bg-green-900 overflow-hidden items-end p-12">
          <div className="absolute inset-0">
             <img src="/login-bg.png" alt="Sustainable City" className="w-full h-full object-cover opacity-80 mix-blend-overlay" />
             <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-900/60 to-transparent"></div>
          </div>
          <div className="relative z-10 text-white space-y-6">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <img src="/logo.png" alt="CivicLoop Logo" className="w-8 h-8 object-contain" />
              <span className="text-2xl font-extrabold tracking-tight">CivicLoop</span>
            </Link>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl font-black leading-tight"
            >
              Turn everyday actions into measurable impact.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-green-100 font-medium text-lg leading-relaxed max-w-md"
            >
              Join thousands of citizens making a real difference in their communities through smarter waste management.
            </motion.p>
          </div>
        </div>

        {/* Right Side - Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-card"
        >
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-3xl font-black text-foreground mb-2">Welcome back</h3>
            <p className="text-muted-foreground font-medium">Enter your credentials to access your account.</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground uppercase tracking-wider">Email Address</label>
              <Input
                {...register('email')}
                type="email"
                placeholder="name@example.com"
                className="bg-background border-border h-14 rounded-xl text-base focus-visible:ring-green-500 transition-shadow"
                disabled={isLoading}
              />
              {errors.email && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-sm text-red-500 font-medium">{errors.email.message}</motion.p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-foreground uppercase tracking-wider">Password</label>
                <Link to="/forgot-password" className="text-xs font-bold text-green-600 hover:text-green-700 hover:underline transition-all">
                  Forgot password?
                </Link>
              </div>
              <Input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="bg-background border-border h-14 rounded-xl text-base focus-visible:ring-green-500 transition-shadow"
                disabled={isLoading}
              />
              {errors.password && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-sm text-red-500 font-medium">{errors.password.message}</motion.p>
              )}
            </div>
            
            <Button type="submit" className="w-full h-14 text-lg font-bold mt-8 shadow-xl shadow-green-600/20 bg-green-600 hover:bg-green-700 rounded-xl transition-all group" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Authenticating...
                </>
              ) : (
                <>Sign In <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></>
              )}
            </Button>
          </form>

          {/* Demo Logins */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-slate-400 font-bold tracking-wider">Demo Accounts</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => { setValue('email', 'citizen@civicloop.com'); setValue('password', 'password123'); }}
                className="text-xs font-bold border-border text-muted-foreground hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors"
              >
                Citizen
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => { setValue('email', 'worker@civicloop.com'); setValue('password', 'password123'); }}
                className="text-xs font-bold border-border text-muted-foreground hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
              >
                Worker
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => { setValue('email', 'admin@civicloop.com'); setValue('password', 'password123'); }}
                className="text-xs font-bold border-border text-muted-foreground hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors"
              >
                Admin
              </Button>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-border text-center text-muted-foreground font-medium">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-green-600 hover:text-green-700 font-bold hover:underline transition-all">
              Create an account
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
