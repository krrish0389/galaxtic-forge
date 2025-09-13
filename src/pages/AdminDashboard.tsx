import React, { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Plus, 
  Eye, 
  Users, 
  UserCheck, 
  Bell, 
  BarChart3, 
  CheckCircle, 
  XCircle, 
  Clock,
  DollarSign,
  Shield,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  sponsor: string;
  budget: number;
  status: 'draft' | 'pending' | 'active' | 'closed' | 'archived';
  submissions: number;
  engagement: number;
  createdAt: string;
}

interface AnalyticsData {
  totalCampaigns: number;
  totalUsers: number;
  totalPayouts: number;
  fraudAlerts: number;
}

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [selectedTab, setSelectedTab] = useState('overview');
  
  // Mock data - in real app, this would come from your backend
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'DeFi Innovation Challenge',
      sponsor: 'Ethereum Foundation',
      budget: 50000,
      status: 'active',
      submissions: 142,
      engagement: 89,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'NFT Marketplace Sprint',
      sponsor: 'OpenSea Labs',
      budget: 25000,
      status: 'pending',
      submissions: 0,
      engagement: 0,
      createdAt: '2024-01-20'
    },
    {
      id: '3',
      title: 'Web3 Gaming Hackathon',
      sponsor: 'Polygon Studios',
      budget: 75000,
      status: 'closed',
      submissions: 203,
      engagement: 94,
      createdAt: '2024-01-10'
    }
  ]);

  const analytics: AnalyticsData = {
    totalCampaigns: campaigns.length,
    totalUsers: 1247,
    totalPayouts: 150000,
    fraudAlerts: 3
  };

  const approveCampaign = (campaignId: string) => {
    toast({
      title: "Campaign Approved",
      description: "Campaign has been approved and is now active.",
    });
  };

  const rejectCampaign = (campaignId: string) => {
    toast({
      title: "Campaign Rejected",
      description: "Campaign has been rejected and sponsor has been notified.",
      variant: "destructive"
    });
  };

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'closed': return 'bg-muted text-muted-foreground';
      case 'draft': return 'bg-secondary text-secondary-foreground';
      case 'archived': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'campaigns', label: 'Campaigns', icon: Eye },
    { id: 'submissions', label: 'Submissions', icon: Plus },
    { id: 'sponsors', label: 'Manage Sponsors', icon: Users },
    { id: 'judges', label: 'Manage Judges', icon: UserCheck },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 glass border-r border-glass-border p-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Control Tower
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Admin Dashboard</p>
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={selectedTab === item.id ? 'admin' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedTab(item.id)}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <div className="glass p-4 rounded-lg">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">Admin Access</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3"
                onClick={logout}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage hackathon campaigns and oversee the platform
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="admin" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="glass border-glass-border">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <Eye className="h-6 w-6 text-primary" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-muted-foreground">Total Campaigns</p>
                        <p className="text-2xl font-bold">{analytics.totalCampaigns}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-glass-border">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-secondary/20 rounded-lg">
                        <Users className="h-6 w-6 text-secondary" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                        <p className="text-2xl font-bold">{analytics.totalUsers.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-glass-border">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-accent/20 rounded-lg">
                        <DollarSign className="h-6 w-6 text-accent" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-muted-foreground">Total Payouts</p>
                        <p className="text-2xl font-bold">${analytics.totalPayouts.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-glass-border border-destructive/30">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-destructive/20 rounded-lg">
                        <AlertTriangle className="h-6 w-6 text-destructive" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-muted-foreground">Fraud Alerts</p>
                        <p className="text-2xl font-bold text-destructive">{analytics.fraudAlerts}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Campaigns */}
              <Card className="glass border-glass-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    Campaign Management
                  </CardTitle>
                  <CardDescription>
                    Review and approve pending campaigns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="flex items-center justify-between p-4 glass rounded-lg hover-lift">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold">{campaign.title}</h3>
                            <Badge className={getStatusColor(campaign.status)}>
                              {campaign.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Sponsor: {campaign.sponsor} • Budget: ${campaign.budget.toLocaleString()} AVAX
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span>{campaign.submissions} submissions</span>
                            <span>{campaign.engagement}% engagement</span>
                            <span>Created: {campaign.createdAt}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          {campaign.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => approveCampaign(campaign.id)}
                                className="hover:border-success hover:text-success"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => rejectCampaign(campaign.id)}
                                className="hover:border-destructive hover:text-destructive"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          {campaign.status === 'active' && (
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4 mr-1" />
                              Monitor
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Other tabs placeholder */}
          {selectedTab !== 'overview' && (
            <div className="flex items-center justify-center h-96">
              <Card className="glass border-glass-border p-8 text-center">
                <CardContent>
                  <div className="text-4xl mb-4">🚧</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {sidebarItems.find(item => item.id === selectedTab)?.label} Panel
                  </h3>
                  <p className="text-muted-foreground">
                    This section is under development. Full functionality coming soon!
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
