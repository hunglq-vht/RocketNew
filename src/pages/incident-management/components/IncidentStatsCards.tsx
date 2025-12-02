import Icon from '../../../components/AppIcon';
import { IncidentStats } from '../types';

interface IncidentStatsCardsProps {
  stats: IncidentStats;
}

const IncidentStatsCards = ({ stats }: IncidentStatsCardsProps) => {
  const statCards = [
    {
      id: 'total',
      label: 'Total Incidents',
      value: stats.total,
      icon: 'AlertCircle',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      trend: '+12%',
      trendUp: true
    },
    {
      id: 'active',
      label: 'Active Incidents',
      value: stats.active,
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      trend: '+5%',
      trendUp: true
    },
    {
      id: 'critical',
      label: 'Critical Events',
      value: stats.critical,
      icon: 'AlertOctagon',
      color: 'text-error',
      bgColor: 'bg-error/10',
      trend: '-8%',
      trendUp: false
    },
    {
      id: 'response',
      label: 'Avg Response Time',
      value: `${stats.averageResponseTime}m`,
      icon: 'Clock',
      color: 'text-success',
      bgColor: 'bg-success/10',
      trend: '-15%',
      trendUp: false
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card) => (
        <div
          key={card.id}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-150"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={card.icon} size={24} strokeWidth={2} className={card.color} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${card.trendUp ? 'text-success' : 'text-error'}`}>
              <Icon name={card.trendUp ? 'TrendingUp' : 'TrendingDown'} size={14} strokeWidth={2} />
              <span>{card.trend}</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
            <p className="text-sm text-muted-foreground">{card.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncidentStatsCards;