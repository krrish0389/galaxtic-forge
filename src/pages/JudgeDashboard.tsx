import React, { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  ExternalLink, 
  Clock, 
  User, 
  Star,
  MessageSquare,
  TrendingUp,
  Shield,
  AlertCircle,
  Trophy
} from 'lucide-react';

interface Submission {
  id: string;
  campaignTitle: string;
  participantName: string;
  participantEmail: string;
  twitterUrl: string;
  submissionNote?: string;
  submittedAt: string;
  engagement: {
    likes: number;
    retweets: number;
    comments: number;
  };
  status: 'pending' | 'approved' | 'rejected';
}

interface JudgeStats {
  totalReviewed: number;
  pendingReviews: number;
  approvalRate: number;
  avgReviewTime: string;
}

const JudgeDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [reviewNote, setReviewNote] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Mock data
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: '1',
      campaignTitle: 'DeFi Innovation Challenge',
      participantName: 'Alex Chen',
      participantEmail: 'alex@example.com',
      twitterUrl: 'https://twitter.com/alexchen/status/1234567890',
      submissionNote: 'Built a decentralized lending protocol with automated liquidation features.',
      submittedAt: '2024-01-22T10:30:00Z',
      engagement: { likes: 45, retweets: 12, comments: 8 },
      status: 'pending'
    },
    {
      id: '2',
      campaignTitle: 'NFT Marketplace Sprint',
      participantName: 'Sarah Johnson',
      participantEmail: 'sarah@example.com',
      twitterUrl: 'https://twitter.com/sarahj/status/1234567891',
      submissionNote: 'Created a gasless NFT minting experience with meta-transactions.',
      submittedAt: '2024-01-22T14:15:00Z',
      engagement: { likes: 67, retweets: 23, comments: 15 },
      status: 'pending'
    },
    {
      id: '3',
      campaignTitle: 'Web3 Gaming Revolution',
      participantName: 'Mike Rodriguez',
      participantEmail: 'mike@example.com',
      twitterUrl: 'https://twitter.com/mikerod/status/1234567892',
      submissionNote: 'Developed a play-to-earn racing game with NFT car ownership.',
      submittedAt: '2024-01-21T16:45:00Z',
      engagement: { likes: 89, retweets: 34, comments: 22 },
      status: 'approved'
    }
  ]);

  const judgeStats: JudgeStats = {
    totalReviewed: submissions.filter(s => s.status !== 'pending').length,
    pendingReviews: submissions.filter(s => s.status === 'pending').length,
    approvalRate: 85,
    avgReviewTime: '12 mins'
  };

  const handleApprove = (submissionId: string, note?: string) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId 
        ? { ...sub, status: 'approved' as const }
        : sub
    ));
    
    toast({
      title: "Submission Approved",
      description: "The submission has been approved and the participant will be notified.",
    });
    
    if (showReviewModal) {
      setShowReviewModal(false);
      setSelectedSubmission(null);
      setReviewNote('');
    }
  };

  const handleReject = (submissionId: string, note?: string) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId 
        ? { ...sub, status: 'rejected' as const }
        : sub
    ));
    
    toast({
      title: "Submission Rejected",
      description: "The submission has been rejected and the participant will be notified.",
      variant: "destructive"
    });
    
    if (showReviewModal) {
      setShowReviewModal(false);
      setSelectedSubmission(null);
      setReviewNote('');
    }
  };

  const openReviewModal = (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowReviewModal(true);
  };

  const getStatusColor = (status: Submission['status']) => {
    switch (status) {
      case 'approved': return 'bg-success text-success-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getEngagementScore = (engagement: Submission['engagement']) => {
    return engagement.likes + engagement.retweets * 2 + engagement.comments * 3;
  };

  const getEngagementLevel = (score: number) => {
    if (score >= 150) return { level: 'High', color: 'text-success' };
    if (score >= 75) return { level: 'Medium', color: 'text-warning' };
    return { level: 'Low', color: 'text-destructive' };
  };

  const pendingSubmissions = submissions.filter(s => s.status === 'pending');
  const completedSubmissions = submissions.filter(s => s.status !== 'pending');

  return (
    <div className="min-h-screen bg-gradient-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-destructive to-destructive-glow bg-clip-text text-transparent">
              Judge Dashboard
            </h1>
            <p className="text-muted-foreground">
              Review submissions and ensure quality standards
            </p>
          </div>
          <div className="flex space-x-3">
            <div className="glass px-4 py-2 rounded-lg">
              <p className="text-sm text-muted-foreground">Welcome back</p>
              <p className="font-semibold">{user?.name}</p>
            </div>
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
                <div className="p-2 bg-warning/20 rounded-lg">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                  <p className="text-2xl font-bold">{judgeStats.pendingReviews}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Reviewed</p>
                  <p className="text-2xl font-bold">{judgeStats.totalReviewed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-success/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Approval Rate</p>
                  <p className="text-2xl font-bold">{judgeStats.approvalRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <Star className="h-6 w-6 text-secondary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Avg Review Time</p>
                  <p className="text-2xl font-bold">{judgeStats.avgReviewTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Reviews */}
          <div className="lg:col-span-2">
            <Card className="glass border-glass-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-warning" />
                  Pending Reviews
                  {pendingSubmissions.length > 0 && (
                    <Badge className="ml-2 bg-warning text-warning-foreground">
                      {pendingSubmissions.length} new
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Review submissions and ensure they meet quality standards
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingSubmissions.length === 0 ? (
                  <div className="text-center py-8">
                    <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold">All caught up!</h3>
                    <p className="text-muted-foreground">No pending submissions to review.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingSubmissions.map((submission) => {
                      const engagementScore = getEngagementScore(submission.engagement);
                      const engagementLevel = getEngagementLevel(engagementScore);
                      
                      return (
                        <div key={submission.id} className="glass p-6 rounded-lg hover-lift">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-semibold">{submission.campaignTitle}</h3>
                                <Badge className={getStatusColor(submission.status)}>
                                  {submission.status}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                                <User className="h-3 w-3" />
                                <span>{submission.participantName}</span>
                                <span>•</span>
                                <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
                              </div>
                              
                              {submission.submissionNote && (
                                <p className="text-sm mb-3">{submission.submissionNote}</p>
                              )}
                              
                              <div className="flex items-center space-x-4 text-xs">
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3" />
                                  <span>{submission.engagement.likes} likes</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <TrendingUp className="h-3 w-3" />
                                  <span>{submission.engagement.retweets} retweets</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageSquare className="h-3 w-3" />
                                  <span>{submission.engagement.comments} comments</span>
                                </div>
                                <div className={`font-medium ${engagementLevel.color}`}>
                                  {engagementLevel.level} Engagement
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(submission.twitterUrl, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View Post
                            </Button>
                            
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openReviewModal(submission)}
                                className="hover:border-primary hover:text-primary"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Review
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleApprove(submission.id)}
                                className="hover:border-success hover:text-success"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReject(submission.id)}
                                className="hover:border-destructive hover:text-destructive"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity & Quick Stats */}
          <div className="space-y-6">
            <Card className="glass border-glass-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {completedSubmissions.slice(0, 5).map((submission) => (
                    <div key={submission.id} className="flex items-center space-x-2">
                      {submission.status === 'approved' ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                      <span className="flex-1 truncate">
                        {submission.status === 'approved' ? 'Approved' : 'Rejected'} submission from {submission.participantName}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-glass-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-warning" />
                  Review Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Check for project relevance to campaign goals</p>
                <p>• Verify Twitter post authenticity and engagement</p>
                <p>• Ensure submission meets quality standards</p>
                <p>• Look for innovation and technical merit</p>
                <p>• Consider community response and feedback</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Review Modal */}
        {showReviewModal && selectedSubmission && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="glass border-glass-border w-full max-w-2xl max-h-[90vh] overflow-auto">
              <CardHeader>
                <CardTitle>Review Submission</CardTitle>
                <CardDescription>
                  {selectedSubmission.campaignTitle} by {selectedSubmission.participantName}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="glass p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Submission Details</h4>
                  <p className="text-sm mb-2">{selectedSubmission.submissionNote}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{selectedSubmission.engagement.likes} likes</span>
                    <span>{selectedSubmission.engagement.retweets} retweets</span>
                    <span>{selectedSubmission.engagement.comments} comments</span>
                  </div>
                </div>

                <div>
                  <Button
                    variant="outline"
                    className="w-full mb-4"
                    onClick={() => window.open(selectedSubmission.twitterUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Twitter Post
                  </Button>
                </div>

                <div>
                  <label className="text-sm font-medium">Review Notes (Optional)</label>
                  <Textarea
                    placeholder="Add notes about your review decision..."
                    value={reviewNote}
                    onChange={(e) => setReviewNote(e.target.value)}
                    className="glass mt-2"
                    rows={3}
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowReviewModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleReject(selectedSubmission.id, reviewNote)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => handleApprove(selectedSubmission.id, reviewNote)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
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

export default JudgeDashboard;