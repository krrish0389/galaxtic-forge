import React, { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Trophy, 
  Zap, 
  Star, 
  Send, 
  ExternalLink, 
  Clock, 
  DollarSign,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Wallet
} from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  sponsor: string;
  reward: number;
  description: string;
  deadline: string;
  participants: number;
  status: 'active' | 'ending_soon';
  category: string;
}

interface UserStats {
  totalRewards: number;
  participations: number;
  rank: number;
  xp: number;
  badges: string[];
}

const ParticipantDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [twitterUrl, setTwitterUrl] = useState('');
  const [submissionNote, setSubmissionNote] = useState('');

  // Mock data
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'DeFi Innovation Challenge',
      sponsor: 'Ethereum Foundation',
      reward: 5000,
      description: 'Build innovative DeFi solutions that solve real-world problems. Focus on user experience and security.',
      deadline: '2024-02-15',
      participants: 142,
      status: 'active',
      category: 'DeFi'
    },
    {
      id: '2',
      title: 'NFT Marketplace Sprint',
      sponsor: 'OpenSea Labs',
      reward: 3000,
      description: 'Create unique NFT marketplace features or entirely new marketplace concepts.',
      deadline: '2024-02-10',
      participants: 89,
      status: 'ending_soon',
      category: 'NFT'
    },
    {
      id: '3',
      title: 'Web3 Gaming Revolution',
      sponsor: 'Polygon Studios',
      reward: 7500,
      description: 'Design and build the next generation of Web3 gaming experiences.',
      deadline: '2024-02-20',
      participants: 203,
      status: 'active',
      category: 'Gaming'
    }
  ]);

  const userStats: UserStats = {
    totalRewards: 12500,
    participations: 8,
    rank: 127,
    xp: 2840,
    badges: ['First Place', 'Speed Demon', 'Innovation Master']
  };

  const handleJoinCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowSubmissionForm(true);
  };

  const handleSubmission = async () => {
    if (!twitterUrl.trim()) {
      toast({
        title: "Missing Twitter URL",
        description: "Please provide a Twitter URL for your submission.",
        variant: "destructive"
      });
      return;
    }

    // Validate Twitter URL format
    const twitterRegex = /^https?:\/\/(www\.)?(twitter|x)\.com\/\w+\/status\/\d+/;
    if (!twitterRegex.test(twitterUrl)) {
      toast({
        title: "Invalid Twitter URL",
        description: "Please provide a valid Twitter post URL.",
        variant: "destructive"
      });
      return;
    }

    // Simulate submission
    toast({
      title: "Submission Successful!",
      description: `Your submission for "${selectedCampaign?.title}" has been submitted for review.`,
    });

    setShowSubmissionForm(false);
    setSelectedCampaign(null);
    setTwitterUrl('');
    setSubmissionNote('');
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'First Place': return 'bg-accent text-accent-foreground';
      case 'Speed Demon': return 'bg-primary text-primary-foreground';
      case 'Innovation Master': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: Campaign['status']) => {
    return status === 'ending_soon' 
      ? 'bg-warning text-warning-foreground animate-pulse' 
      : 'bg-success text-success-foreground';
  };

  return (
    <div className="min-h-screen bg-gradient-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Participant Hub
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Ready to compete?
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Wallet className="h-4 w-4 mr-2" />
              {user?.walletAddress ? 
                `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}` 
                : 'Connect Wallet'
              }
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass border-glass-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-accent" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Earned</p>
                  <p className="text-2xl font-bold">${userStats.totalRewards.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Participations</p>
                  <p className="text-2xl font-bold">{userStats.participations}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Global Rank</p>
                  <p className="text-2xl font-bold">#{userStats.rank}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-warning/20 rounded-lg">
                  <Zap className="h-6 w-6 text-warning" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">XP Points</p>
                  <p className="text-2xl font-bold">{userStats.xp.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Campaigns */}
          <div className="lg:col-span-2">
            <Card className="glass border-glass-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-primary" />
                  Active Campaigns
                </CardTitle>
                <CardDescription>
                  Join these exciting hackathons and earn rewards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="glass p-6 rounded-lg hover-lift">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold">{campaign.title}</h3>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status === 'ending_soon' ? 'Ending Soon!' : 'Active'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Sponsored by {campaign.sponsor}
                        </p>
                        <p className="text-sm mb-3">{campaign.description}</p>
                        
                        <div className="flex items-center space-x-6 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <DollarSign className="h-3 w-3 mr-1" />
                            ${campaign.reward.toLocaleString()} AVAX
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {campaign.participants} participants
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Deadline: {campaign.deadline}
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        variant="participant" 
                        size="sm"
                        onClick={() => handleJoinCampaign(campaign)}
                        className="ml-4"
                      >
                        Join Campaign
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard & Badges */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card className="glass border-glass-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-accent" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userStats.badges.map((badge, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="p-2 bg-accent/20 rounded-lg">
                        <Trophy className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <Badge className={getBadgeColor(badge)}>
                          {badge}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="glass border-glass-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Submission approved for DeFi Challenge</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-warning" />
                    <span>Earned 250 XP points</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-accent" />
                    <span>Ranked #3 in last hackathon</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submission Modal */}
        {showSubmissionForm && selectedCampaign && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="glass border-glass-border w-full max-w-md">
              <CardHeader>
                <CardTitle>Submit to {selectedCampaign.title}</CardTitle>
                <CardDescription>
                  Submit your Twitter post showcasing your project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="twitter-url">Twitter Post URL *</Label>
                  <Input
                    id="twitter-url"
                    placeholder="https://twitter.com/username/status/..."
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                    className="glass"
                  />
                </div>
                
                <div>
                  <Label htmlFor="note">Additional Notes (Optional)</Label>
                  <Textarea
                    id="note"
                    placeholder="Describe your project or any additional information..."
                    value={submissionNote}
                    onChange={(e) => setSubmissionNote(e.target.value)}
                    className="glass"
                    rows={3}
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowSubmissionForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="participant"
                    className="flex-1"
                    onClick={handleSubmission}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantDashboard;