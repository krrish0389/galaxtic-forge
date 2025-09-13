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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MICRO-TIPPING
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground">
              The Future of Decentralized Hackathons
            </p>
            <p className="text-lg text-muted-foreground max-w-md">
              Join the most innovative hackathon platform where creativity meets blockchain technology. 
              Build, compete, and earn in the Web3 ecosystem.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-4 mt-12">
            <div className="glass p-4 rounded-lg text-center hover-lift">
              <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Secure</h3>
              <p className="text-sm text-muted-foreground">Blockchain-verified submissions</p>
            </div>
            <div className="glass p-4 rounded-lg text-center hover-lift">
              <Users className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <h3 className="font-semibold">Community</h3>
              <p className="text-sm text-muted-foreground">Global developer network</p>
            </div>
            <div className="glass p-4 rounded-lg text-center hover-lift">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-accent" />
              <h3 className="font-semibold">Rewards</h3>
              <p className="text-sm text-muted-foreground">Crypto prize pools</p>
            </div>
            <div className="glass p-4 rounded-lg text-center hover-lift">
              <Zap className="h-8 w-8 mx-auto mb-2 text-warning" />
              <h3 className="font-semibold">Fast</h3>
              <p className="text-sm text-muted-foreground">Instant verification</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md mx-auto">
          <Card className="glass border-glass-border shadow-glass">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                {isWalletMode ? 'Connect Wallet' : 'Sign In'}
              </CardTitle>
              <CardDescription>
                {isWalletMode 
                  ? 'Connect your Web3 wallet to access HackChain'
                  : 'Enter your credentials to access your dashboard'
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
              <div className="glass p-4 rounded-lg text-xs space-y-2">
                <p className="font-semibold text-center mb-2">Demo Credentials:</p>
                <div className="space-y-1">
                  <p><span className="text-primary">Admin:</span> admin@hackathon.app / admin123</p>
                  <p><span className="text-secondary">Participant:</span> participant@hackathon.app / participant123</p>
                  <p><span className="text-accent">Sponsor:</span> sponsor@hackathon.app / sponsor123</p>
                  <p><span className="text-destructive">Judge:</span> judge@hackathon.app / judge123</p>
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