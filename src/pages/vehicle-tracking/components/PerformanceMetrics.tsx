import Icon from '../../../components/AppIcon';
import { PerformanceMetric } from '../types';

interface PerformanceMetricsProps {
  metrics: PerformanceMetric[];
}

const PerformanceMetrics = ({ metrics }: PerformanceMetricsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      case 'stable':
        return 'Minus';
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
      case 'stable':
        return 'text-accent';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Icon name="BarChart3" size={16} strokeWidth={2} className="text-primary" />
          Performance Metrics
        </h3>
        <span className="text-xs text-muted-foreground">{metrics.length} indicators</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {metrics.map((metric, index) => (
          <div key={index} className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-foreground">{metric.name}</span>
              <div className={`flex items-center gap-1 ${getTrendColor(metric.trend)}`}>
                <Icon name={getTrendIcon(metric.trend)} size={14} strokeWidth={2} />
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <span className={`text-2xl font-bold font-mono ${getStatusColor(metric.status)}`}>
                  {metric.value}
                </span>
                <span className="text-xs text-muted-foreground ml-1">{metric.unit}</span>
              </div>
              <span className={`text-xs font-medium uppercase ${getStatusColor(metric.status)}`}>
                {metric.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-start gap-2 p-3 bg-success/10 rounded-lg">
          <Icon name="CheckCircle" size={16} strokeWidth={2} className="text-success flex-shrink-0 mt-0.5" />
          <p className="text-xs text-foreground leading-relaxed">
            All performance metrics are within normal operational parameters. Vehicle is operating efficiently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;