import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, Clock, Users, IndianRupee } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Layout from '@/components/Layout';
import { useApp } from '@/contexts/AppContext';

const AdminDashboard = () => {
  const { user } = useApp();

  const stats = [
    { 
      title: 'Total Budget', 
      value: '₹82.5L', 
      change: '+12%', 
      period: 'vs last year',
      icon: IndianRupee, 
      color: 'text-blue-600' 
    },
    { 
      title: 'Issues Resolved', 
      value: '1,847', 
      change: '+15%', 
      period: 'this year',
      icon: CheckCircle, 
      color: 'text-green-600' 
    },
    { 
      title: 'Avg Response Time', 
      value: '2.3', 
      suffix: 'days',
      change: '+18%', 
      period: 'improvement',
      icon: Clock, 
      color: 'text-orange-600' 
    },
    { 
      title: 'Citizen Satisfaction', 
      value: '87%', 
      change: '+5%', 
      period: 'this quarter',
      icon: Users, 
      color: 'text-purple-600' 
    },
  ];

  const performanceMetrics = [
    { 
      label: 'Response Time', 
      current: '2.3 days', 
      target: '< 3 days', 
      status: 'Good',
      progress: 77
    },
    { 
      label: 'Resolution Rate', 
      current: '86%', 
      target: '> 80%', 
      status: 'Excellent',
      progress: 86
    },
    { 
      label: 'Citizen Satisfaction', 
      current: '87%', 
      target: '> 85%', 
      status: 'Good',
      progress: 87
    },
    { 
      label: 'Budget Efficiency', 
      current: '78%', 
      target: '> 75%', 
      status: 'Good',
      progress: 78
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'Good': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-orange-600 bg-orange-50 border-orange-200';
    }
  };

  return (
    <Layout searchPlaceholder="Search issues, analytics, or reports...">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <h1 className="text-3xl font-bold text-foreground">
              Government Transparency Portal
            </h1>
          </div>
          <p className="text-muted-foreground">
            Complete transparency in civic administration, budget utilization, and performance metrics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="card-gradient">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <IconComponent className={`w-5 h-5 ${stat.color}`} />
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-2">
                      <p className="text-3xl font-bold">
                        {stat.value}
                      </p>
                      {stat.suffix && (
                        <span className="text-lg text-muted-foreground">
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${stat.color} bg-transparent`}
                      >
                        {stat.change}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {stat.period}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Performance Against Targets */}
        <Card className="card-gradient">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <CardTitle>Performance Against Targets</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{metric.label}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(metric.status)}`}
                    >
                      {metric.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current</span>
                      <span className="font-medium">{metric.current}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Target</span>
                      <span className="font-medium">{metric.target}</span>
                    </div>
                    <Progress value={metric.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Budget Utilization */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Budget Utilization (2024)</CardTitle>
              <CardDescription>
                Department-wise spending breakdown
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { dept: 'Road Maintenance', budget: '₹32.5L', used: '₹28.2L', percent: 87 },
                { dept: 'Sanitation', budget: '₹25.0L', used: '₹22.1L', percent: 88 },
                { dept: 'Street Lighting', budget: '₹15.5L', used: '₹12.8L', percent: 83 },
                { dept: 'Drainage', budget: '₹9.5L', used: '₹7.2L', percent: 76 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.dept}</span>
                    <span className="text-muted-foreground">
                      {item.used} / {item.budget}
                    </span>
                  </div>
                  <Progress value={item.percent} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{item.percent}% utilized</span>
                    <span>₹{(parseFloat(item.budget.replace('₹', '').replace('L', '')) - parseFloat(item.used.replace('₹', '').replace('L', ''))).toFixed(1)}L remaining</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Recent Administrative Actions</CardTitle>
              <CardDescription>
                Latest updates from civic departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: 'Road repair completed',
                    location: 'MG Road Junction',
                    time: '2 hours ago',
                    status: 'completed',
                    cost: '₹1.2L'
                  },
                  {
                    action: 'Garbage collection optimized',
                    location: 'Jayanagar Ward',
                    time: '5 hours ago',
                    status: 'ongoing',
                    cost: '₹85K'
                  },
                  {
                    action: 'Street lights installed',
                    location: 'Koramangala 4th Block',
                    time: '1 day ago',
                    status: 'completed',
                    cost: '₹2.1L'
                  },
                  {
                    action: 'Drainage cleaning',
                    location: 'BTM Layout',
                    time: '2 days ago',
                    status: 'completed',
                    cost: '₹65K'
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border bg-card">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{activity.action}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            activity.status === 'completed' 
                              ? 'text-green-600 bg-green-50 border-green-200' 
                              : 'text-orange-600 bg-orange-50 border-orange-200'
                          }`}
                        >
                          {activity.cost}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.location} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;