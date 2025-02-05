import { DollarSign, Users, FileText, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

export default function BillingDashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      icon: DollarSign,
      trend: "+20.1% from last month"
    },
    {
      title: "Active Customers",
      value: "2,345",
      icon: Users,
      trend: "+15.2% from last month"
    },
    {
      title: "Pending Invoices",
      value: "23",
      icon: FileText,
      trend: "-5.1% from last month"
    },
    {
      title: "Monthly Growth",
      value: "+12.5%",
      icon: TrendingUp,
      trend: "+2.3% from last month"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-black">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} variant="outlined" sx={{ p: 2 }}>
            <CardHeader
              title={
                <Typography variant="subtitle1" color="textSecondary">
                  {stat.title}
                </Typography>
              }
              action={<stat.icon className="w-4 h-4 text-gray-500" />}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {stat.value}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {stat.trend}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card variant="outlined" sx={{ p: 2 }}>
          <CardHeader title="Recent Invoices" />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              Loading recent invoices...
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ p: 2 }}>
          <CardHeader title="Revenue Overview" />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              Loading revenue chart...
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
