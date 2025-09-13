import React, { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Eye, 
  BarChart3, 
  DollarSign, 
  Users, 
  TrendingUp,
  Calendar,
  Target,
  Briefcase,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  description: string;
  budget: number;
  timeline: string;
  status: 'draft' | 'pending' | 'active' | 'completed';
  submissions: number;
  approvalRate: number;
  impressions: number;
  createdAt: string;
}

const SponsorDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    timeline: '',
    goals: ''
  });

  // Mock data
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'DeFi Innovation Challenge',
      description: 'Build innovative DeFi solutions that solve real-world problems',
      budget: 50000,
      timeline: '30 days',
      status: 'active',
      submissions: 142,
      approvalRate: 78,
      impressions: 45000,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'NFT Marketplace Features',
      description: 'Create unique features for NFT marketplaces',
      budget: 25000,
      timeline: '21 days',
      status: 'pending',
      submissions: 0,
      approvalRate: 0,
      impressions: 0,
      createdAt: '2024-01-20'
    }
  ]);

  const totalStats = {
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSubmissions: campaigns.reduce((sum, c) => sum + c.submissions, 0),
    avgApprovalRate: campaigns.length > 0 ? 
      Math.round(campaigns.reduce((sum, c) => sum + c.approvalRate, 0) / campaigns.length) : 0,
    totalImpressions: campaigns.reduce((sum, c) => sum + c.impressions, 0)
  };

  const handleCreateCampaign = () => {
    if (!formData.title || !formData.description || !formData.budget) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Campaign Created!",
      description: "Your campaign has been submitted for admin approval.",
    });

    setShowCreateForm(false);
    setFormData({
      title: '',
      description: '',
      budget: '',
      timeline: '',
      goals: ''
    });
  };

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'completed': return 'bg-primary text-primary-foreground';
      case 'draft': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: Campaign['status']) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'completed': return <Target className="h-4 w-4" />;
      case 'draft': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'create', label: 'Create Campaign', icon: Plus },
    { id: 'campaigns', label: 'My Campaigns', icon: Eye },
    { id: 'submissions', label: 'Submissions', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero floating-particles">
      <div className="flex">
        {/* Enhanced Sidebar */}
        <div className="w-72 glass border-r border-glass-border p-8">
          <div className="mb-10">
            <h2 className="text-2xl font-display font-black bg-gradient-secondary bg-clip-text text-transparent">
              ENTERPRISE HUB
            </h2>
            <p className="text-sm text-muted-foreground mt-2 font-medium">Business Command Center</p>
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={selectedTab === item.id ? 'sponsor' : 'ghost'}
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
              <p className="text-xs text-muted-foreground">Sponsor Access</p>
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
          {/* Enhanced Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-display font-black bg-gradient-secondary bg-clip-text text-transparent">
                Enterprise Command Center
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Strategic campaign management and community engagement
              </p>
            </div>
            <Button 
              variant="sponsor" 
              size="lg"
              onClick={() => setShowCreateForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </div>

          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="glass border-glass-border">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-accent/20 rounded-lg">
                        <DollarSign className="h-6 w-6 text-accent" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                        <p className="text-2xl font-bold">${totalStats.totalBudget.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-glass-border">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-muted-foreground">Total Submissions</p>
                        <p className="text-2xl font-bold">{totalStats.totalSubmissions}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-glass-border">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-success/20 rounded-lg">
                        <Target className="h-6 w-6 text-success" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-muted-foreground">Approval Rate</p>
                        <p className="text-2xl font-bold">{totalStats.avgApprovalRate}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-glass-border">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-secondary/20 rounded-lg">
                        <Eye className="h-6 w-6 text-secondary" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-muted-foreground">Impressions</p>
                        <p className="text-2xl font-bold">{totalStats.totalImpressions.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Campaign Performance */}
              <Card className="glass border-glass-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-accent" />
                    Campaign Performance
                  </CardTitle>
                  <CardDescription>
                    Monitor your active campaigns and their engagement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="flex items-center justify-between p-4 glass rounded-lg hover-lift">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold">{campaign.title}</h3>
                            <Badge className={getStatusColor(campaign.status)}>
                              {getStatusIcon(campaign.status)}
                              <span className="ml-1 capitalize">{campaign.status}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {campaign.description}
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                            <div>
                              <span className="text-muted-foreground">Budget:</span>
                              <p className="font-medium">${campaign.budget.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Submissions:</span>
                              <p className="font-medium">{campaign.submissions}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Approval Rate:</span>
                              <p className="font-medium">{campaign.approvalRate}%</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Impressions:</span>
                              <p className="font-medium">{campaign.impressions.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                        
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Create Campaign Tab */}
          {selectedTab === 'create' && (
            <Card className="glass border-glass-border max-w-2xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2 text-accent" />
                  Create New Campaign
                </CardTitle>
                <CardDescription>
                  Launch a new hackathon campaign to engage developers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Campaign Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., DeFi Innovation Challenge"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="glass"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your campaign goals, requirements, and what you're looking for..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="glass"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budget">Budget (AVAX) *</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="50000"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="glass"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeline">Timeline</Label>
                    <Input
                      id="timeline"
                      placeholder="e.g., 30 days"
                      value={formData.timeline}
                      onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                      className="glass"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="goals">Campaign Goals</Label>
                  <Textarea
                    id="goals"
                    placeholder="What specific outcomes are you hoping to achieve?"
                    value={formData.goals}
                    onChange={(e) => setFormData({...formData, goals: e.target.value})}
                    className="glass"
                    rows={3}
                  />
                </div>

                <Button 
                  variant="sponsor" 
                  size="lg" 
                  className="w-full"
                  onClick={handleCreateCampaign}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Other tabs placeholder */}
          {!['overview', 'create'].includes(selectedTab) && (
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

      {/* Create Campaign Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="glass border-glass-border w-full max-w-2xl max-h-[90vh] overflow-auto">
            <CardHeader>
              <CardTitle>Quick Campaign Creator</CardTitle>
              <CardDescription>
                Create a campaign quickly with essential details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="quick-title">Title *</Label>
                <Input
                  id="quick-title"
                  placeholder="Campaign title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="glass"
                />
              </div>
              
              <div>
                <Label htmlFor="quick-description">Description *</Label>
                <Textarea
                  id="quick-description"
                  placeholder="Brief description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="glass"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="quick-budget">Budget (AVAX) *</Label>
                <Input
                  id="quick-budget"
                  type="number"
                  placeholder="Amount"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="glass"
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="sponsor"
                  className="flex-1"
                  onClick={handleCreateCampaign}
                >
                  Create Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SponsorDashboard;
