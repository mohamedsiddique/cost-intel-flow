import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User, Shield, DollarSign, Settings } from 'lucide-react';

const Index = () => {
  const { user, profile, roles, signOut, isAdmin, isFinanceManager, isITOps } = useAuth();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500';
      case 'finance_manager':
        return 'bg-green-500';
      case 'it_ops':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'finance_manager':
        return 'Finance Manager';
      case 'it_ops':
        return 'IT Operations';
      default:
        return role;
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome to CostIntel
            </h1>
            <p className="text-muted-foreground">
              Your comprehensive cost intelligence platform
            </p>
          </div>
          <Button onClick={signOut} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* User Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Profile
            </CardTitle>
            <CardDescription>Your account information and roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {profile?.first_name} {profile?.last_name}</p>
                  <p><span className="font-medium">Email:</span> {user?.email}</p>
                  <p><span className="font-medium">User ID:</span> {user?.id}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Roles & Permissions</h3>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <Badge 
                      key={role} 
                      className={`${getRoleColor(role)} text-white`}
                    >
                      {getRoleLabel(role)}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Admin Panel
                </CardTitle>
                <CardDescription>
                  Manage users, roles, and system settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Access Admin Panel
                </Button>
              </CardContent>
            </Card>
          )}

          {(isFinanceManager || isAdmin) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Analytics
                </CardTitle>
                <CardDescription>
                  View cost reports and financial insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  View Reports
                </Button>
              </CardContent>
            </Card>
          )}

          {(isITOps || isAdmin) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  IT Operations
                </CardTitle>
                <CardDescription>
                  Monitor infrastructure and operational costs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  View Dashboard
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Welcome to CostIntel! Here's what you can do based on your role.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isAdmin && (
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-red-600 mb-2">Admin Access</h4>
                  <p className="text-sm text-muted-foreground">
                    You have full administrative access to manage users, configure settings, and oversee all operations.
                  </p>
                </div>
              )}
              {isFinanceManager && (
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-green-600 mb-2">Finance Manager Access</h4>
                  <p className="text-sm text-muted-foreground">
                    You can access financial reports, cost analytics, and budget management tools.
                  </p>
                </div>
              )}
              {isITOps && (
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-blue-600 mb-2">IT Operations Access</h4>
                  <p className="text-sm text-muted-foreground">
                    You can monitor infrastructure costs, system performance, and operational metrics.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
