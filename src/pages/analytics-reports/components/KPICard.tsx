import Icon from '../../../components/AppIcon';
import { KPIMetric } from '../types';

interface KPICardProps {
  metric: KPIMetric;
}

const KPICard = ({ metric }: KPICardProps) => {
  const getTrendColor = () => {
    if (metric.trendDirection === 'up') return 'text-success';
    if (metric.trendDirection === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  const getTrendIcon = () => {
    if (metric.trendDirection === 'up') return 'TrendingUp';
    if (metric.trendDirection === 'down') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-150">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={metric.icon} size={24} strokeWidth={2} className="text-primary" />
        </div>
        <div className={`flex items-center gap-1 ${getTrendColor()}`}>
          <Icon name={getTrendIcon()} size={16} strokeWidth={2} />
          <span className="text-sm font-semibold">{Math.abs(metric.trend)}%</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{metric.label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">{metric.value.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">{metric.unit}</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{metric.description}</p>
      </div>
    </div>
  );
};

export default KPICard;