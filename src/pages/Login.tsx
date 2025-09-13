import React, { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Wallet, Mail, Lock, Zap, Shield, Users, Trophy } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isWalletMode, setIsWalletMode] = useState(false);
  const { login, connectWallet, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }

    const success = await login(email, password);
    if (success) {
      toast({
        title: "Welcome to HackChain!",
        description: "Login successful. Redirecting to your dashboard...",
      });
      // Navigation will be handled by the auth state change
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleWalletConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletAddress) {
      toast({
        title: "Missing Wallet Address",
        description: "Please enter your wallet address.",
        variant: "destructive"
      });
      return;
    }

    if (!walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      toast({
        title: "Invalid Wallet Address",
        description: "Please enter a valid Ethereum wallet address.",
        variant: "destructive"
      });
      return;
    }

    const success = await connectWallet(walletAddress);
    if (success) {
      toast({
        title: "Wallet Connected!",
        description: "Successfully connected to HackChain.",
      });
    } else {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive"
      });
    }
  };

  const mockWalletConnect = () => {
    const mockAddress = '0x742d35Cc6438C4532EbB3df0f662e8b6E86D7abC';
    setWalletAddress(mockAddress);
    setIsWalletMode(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden floating-particles">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-hero">
        <div className="absolute top-20 left-20 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-40 right-40 w-48 h-48 bg-primary/10 rounded-full blur-2xl animate-pulse delay-3000"></div>
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-6">
            <h1 className="text-6xl lg:text-8xl font-display font-black bg-gradient-primary bg-clip-text text-transparent animate-pulse">
              MICRO-TIPPING
            </h1>
            <p className="text-2xl lg:text-3xl text-foreground/90 font-medium">
              Next-Generation Professional Platform
            </p>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Experience the most advanced, secure, and intuitive platform designed for modern professionals. 
              Where innovation meets excellence in every interaction.
            </p>
          </div>

          {/* Enhanced Feature Cards */}
          <div className="grid grid-cols-2 gap-6 mt-16">
            <div className="glass p-6 rounded-2xl text-center hover-lift hover-glow group">
              <div className="p-3 bg-primary/20 rounded-xl inline-block mb-4 group-hover:bg-primary/30 transition-all">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Enterprise Security</h3>
              <p className="text-sm text-muted-foreground">Military-grade encryption</p>
            </div>
            <div className="glass p-6 rounded-2xl text-center hover-lift hover-glow group">
              <div className="p-3 bg-secondary/20 rounded-xl inline-block mb-4 group-hover:bg-secondary/30 transition-all">
                <Users className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Global Network</h3>
              <p className="text-sm text-muted-foreground">Worldwide collaboration</p>
            </div>
            <div className="glass p-6 rounded-2xl text-center hover-lift hover-glow group">
              <div className="p-3 bg-accent/20 rounded-xl inline-block mb-4 group-hover:bg-accent/30 transition-all">
                <Trophy className="h-10 w-10 text-accent" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Premium Experience</h3>
              <p className="text-sm text-muted-foreground">Unmatched performance</p>
            </div>
            <div className="glass p-6 rounded-2xl text-center hover-lift hover-glow group">
              <div className="p-3 bg-warning/20 rounded-xl inline-block mb-4 group-hover:bg-warning/30 transition-all">
                <Zap className="h-10 w-10 text-warning" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Instant responsiveness</p>
            </div>
          </div>
        </div>

        {/* Enhanced Login Card */}
        <div className="w-full max-w-lg mx-auto">
          <Card className="glass border-glass-border shadow-elegant hover-lift">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-display font-bold">
                {isWalletMode ? 'Connect Wallet' : 'Professional Access'}
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                {isWalletMode 
                  ? 'Secure blockchain authentication'
                  : 'Enter your professional credentials'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isWalletMode ? (
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 glass"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 glass"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    variant="neon" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In with Email'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleWalletConnect} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="wallet">Wallet Address</Label>
                    <div className="relative">
                      <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="wallet"
                        type="text"
                        placeholder="0x..."
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        className="pl-10 glass font-mono text-sm"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    variant="neon" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Connecting...' : 'Connect Wallet'}
                  </Button>
                </form>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-glass-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">OR</span>
                </div>
              </div>

              <div className="space-y-3">
                {!isWalletMode ? (
                  <>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full" 
                      size="lg"
                      onClick={() => setIsWalletMode(true)}
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet Instead
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="w-full" 
                      size="sm"
                      onClick={mockWalletConnect}
                    >
                      Use Demo Wallet
                    </Button>
                  </>
                ) : (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full" 
                    size="lg"
                    onClick={() => setIsWalletMode(false)}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Sign In with Email Instead
                  </Button>
                )}
              </div>

              {/* Demo Credentials */}
              <div className="glass p-6 rounded-xl text-sm space-y-3">
                <p className="font-display font-bold text-center mb-4 text-lg">Demo Access Levels:</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-semibold">Executive:</span>
                    <span className="text-xs text-muted-foreground">admin@platform.pro / admin123</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary font-semibold">Professional:</span>
                    <span className="text-xs text-muted-foreground">participant@platform.pro / participant123</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-accent font-semibold">Enterprise:</span>
                    <span className="text-xs text-muted-foreground">sponsor@platform.pro / sponsor123</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-destructive font-semibold">Specialist:</span>
                    <span className="text-xs text-muted-foreground">judge@platform.pro / judge123</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;