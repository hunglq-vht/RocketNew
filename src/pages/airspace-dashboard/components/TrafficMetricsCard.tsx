import { FC } from 'react';
import Icon from '../../../components/AppIcon';
import { TrafficMetric } from '../types';

interface TrafficMetricsCardProps {
  metrics: TrafficMetric[];
}

const TrafficMetricsCard: FC<TrafficMetricsCardProps> = ({ metrics }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-150"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${metric.color}`}>
              <Icon name={metric.icon} size={20} strokeWidth={2} className="text-white" />
            </div>
            <div className={`flex items-center gap-1 ${getTrendColor(metric.trend)}`}>
              <Icon name={getTrendIcon(metric.trend)} size={16} strokeWidth={2} />
              <span className="text-xs font-medium">{metric.trendValue}%</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {metric.value.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrafficMetricsCard;