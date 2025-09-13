import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-destructive/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Card className="glass border-glass-border max-w-md w-full text-center">
        <CardContent className="p-8">
          <div className="mb-6">
            <AlertTriangle className="h-16 w-16 mx-auto text-destructive mb-4" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-destructive to-destructive-glow bg-clip-text text-transparent mb-2">
              404
            </h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist in the HackChain universe.
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Attempted to access: <code className="bg-muted px-2 py-1 rounded text-xs">{location.pathname}</code>
            </p>
            
            <Link to="/">
              <Button variant="neon" size="lg" className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Return to HackChain
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
