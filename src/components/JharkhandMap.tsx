import React, { useState } from 'react';
import { MapPin, Filter, BarChart3, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface IssueMarker {
  id: number;
  lat: number;
  lng: number;
  title: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'reported' | 'in-progress' | 'resolved';
  reportCount: number;
  district: string;
}

interface JharkhandMapProps {
  className?: string;
}

const JharkhandMap: React.FC<JharkhandMapProps> = ({ className }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [heatmapMode, setHeatmapMode] = useState(false);

  // Mock data for Jharkhand districts and issues
  const issueMarkers: IssueMarker[] = [
    { id: 1, lat: 23.6102, lng: 85.2799, title: 'Pothole cluster on NH-33', category: 'Roads', priority: 'high', status: 'reported', reportCount: 15, district: 'Ranchi' },
    { id: 2, lat: 23.3441, lng: 85.3096, title: 'Street light outage', category: 'Lighting', priority: 'medium', status: 'in-progress', reportCount: 8, district: 'Ranchi' },
    { id: 3, lat: 22.8046, lng: 86.2029, title: 'Garbage accumulation', category: 'Sanitation', priority: 'high', status: 'reported', reportCount: 22, district: 'Jamshedpur' },
    { id: 4, lat: 24.7914, lng: 85.0002, title: 'Water logging', category: 'Drainage', priority: 'medium', status: 'resolved', reportCount: 5, district: 'Daltonganj' },
    { id: 5, lat: 23.7957, lng: 86.4304, title: 'Broken road divider', category: 'Roads', priority: 'high', status: 'in-progress', reportCount: 12, district: 'Dhanbad' },
    { id: 6, lat: 24.4869, lng: 84.9349, title: 'Park maintenance needed', category: 'Parks', priority: 'low', status: 'reported', reportCount: 3, district: 'Garhwa' },
    { id: 7, lat: 23.0793, lng: 87.2847, title: 'Traffic signal malfunction', category: 'Traffic', priority: 'high', status: 'reported', reportCount: 18, district: 'Deoghar' },
    { id: 8, lat: 24.0735, lng: 86.0122, title: 'Open drain safety', category: 'Drainage', priority: 'medium', status: 'in-progress', reportCount: 9, district: 'Hazaribagh' },
  ];

  const districts = [
    'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 
    'Hazaribagh', 'Giridih', 'Ramgarh', 'Daltonganj', 'Garhwa'
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return '#3b82f6';
      case 'in-progress': return '#f59e0b';
      case 'resolved': return '#10b981';
      default: return '#6b7280';
    }
  };

  const filteredIssues = selectedFilter === 'all' 
    ? issueMarkers 
    : issueMarkers.filter(issue => 
        selectedFilter === 'category' ? true :
        selectedFilter === 'high-priority' ? issue.priority === 'high' :
        selectedFilter === 'in-progress' ? issue.status === 'in-progress' :
        issue.district.toLowerCase() === selectedFilter.toLowerCase()
      );

  const heatmapData = districts.map(district => {
    const districtIssues = issueMarkers.filter(issue => issue.district === district);
    const totalReports = districtIssues.reduce((sum, issue) => sum + issue.reportCount, 0);
    const highPriorityCount = districtIssues.filter(issue => issue.priority === 'high').length;
    
    return {
      district,
      totalReports,
      highPriorityCount,
      issueCount: districtIssues.length,
      intensity: Math.min(totalReports / 5, 10) // Scale for visual intensity
    };
  });

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Map Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Jharkhand State Issue Map</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant={heatmapMode ? "default" : "outline"}
                size="sm"
                onClick={() => setHeatmapMode(!heatmapMode)}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {heatmapMode ? 'Show Markers' : 'Heatmap View'}
              </Button>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter issues..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Issues</SelectItem>
                  <SelectItem value="high-priority">High Priority</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="ranchi">Ranchi District</SelectItem>
                  <SelectItem value="jamshedpur">Jamshedpur District</SelectItem>
                  <SelectItem value="dhanbad">Dhanbad District</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Mock Interactive Map Display */}
          <div className="relative w-full h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border overflow-hidden">
            {/* Map Background (representing Jharkhand state outline) */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 opacity-50">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                {/* Simplified Jharkhand state outline */}
                <path
                  d="M50 180 L120 150 L180 140 L240 135 L290 145 L320 165 L340 190 L350 220 L320 250 L280 260 L220 255 L160 250 L100 240 L60 220 Z"
                  fill="rgba(34, 197, 94, 0.2)"
                  stroke="rgba(34, 197, 94, 0.4)"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Issue Markers or Heatmap */}
            {heatmapMode ? (
              // Heatmap visualization
              <div className="absolute inset-0 p-4">
                {heatmapData.map((data, index) => (
                  <div
                    key={data.district}
                    className="absolute rounded-full transition-all duration-300 hover:scale-110"
                    style={{
                      left: `${20 + (index % 3) * 30}%`,
                      top: `${20 + Math.floor(index / 3) * 25}%`,
                      width: `${20 + data.intensity * 2}px`,
                      height: `${20 + data.intensity * 2}px`,
                      backgroundColor: `rgba(239, 68, 68, ${0.3 + data.intensity * 0.05})`,
                      border: '2px solid rgba(239, 68, 68, 0.8)'
                    }}
                    title={`${data.district}: ${data.totalReports} reports`}
                  />
                ))}
              </div>
            ) : (
              // Issue markers
              <div className="absolute inset-0 p-4">
                {filteredIssues.map((issue, index) => (
                  <div
                    key={issue.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform group"
                    style={{
                      left: `${25 + (index % 4) * 20}%`,
                      top: `${25 + Math.floor(index / 4) * 20}%`,
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                      style={{ backgroundColor: getPriorityColor(issue.priority) }}
                    />
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      <div className="font-semibold">{issue.title}</div>
                      <div>{issue.district} - {issue.reportCount} reports</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 border">
              <h4 className="text-xs font-semibold mb-2">
                {heatmapMode ? 'Report Density' : 'Issue Priority'}
              </h4>
              {heatmapMode ? (
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-red-200" />
                    <span>Low density</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <span>Medium density</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-red-600" />
                    <span>High density</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span>High Priority</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span>Medium Priority</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>Low Priority</span>
                  </div>
                </div>
              )}
            </div>

            {/* Real-time indicator */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border">
              <Zap className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-medium">Live Updates</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* District Summary Stats */}
      {heatmapMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {heatmapData.slice(0, 6).map((data) => (
            <Card key={data.district} className="card-gradient">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{data.district}</h3>
                  <Badge variant="outline">{data.issueCount} issues</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Reports:</span>
                    <span className="font-medium">{data.totalReports}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">High Priority:</span>
                    <span className="font-medium text-red-600">{data.highPriorityCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Live Issue Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Live Issue Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {filteredIssues.slice(0, 5).map((issue) => (
              <div key={issue.id} className="flex items-center justify-between p-3 border rounded-lg bg-card/50">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getPriorityColor(issue.priority) }}
                  />
                  <div>
                    <h4 className="font-medium text-sm">{issue.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {issue.district} • {issue.reportCount} reports
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {issue.category}
                  </Badge>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getStatusColor(issue.status) }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JharkhandMap;