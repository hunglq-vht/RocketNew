import { FC } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { CriticalAlert } from '../types';

interface CriticalAlertsListProps {
  alerts: CriticalAlert[];
  onAcknowledge: (alertId: string) => void;
  onViewDetails: (alertId: string) => void;
}

const CriticalAlertsList: FC<CriticalAlertsListProps> = ({
  alerts,
  onAcknowledge,
  onViewDetails
}) => {
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-error bg-error/5';
      case 'high':
        return 'border-warning bg-warning/5';
      case 'medium':
        return 'border-accent bg-accent/5';
      default:
        return 'border-border bg-muted/5';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'AlertOctagon';
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      default:
        return 'Info';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'collision':
        return 'Zap';
      case 'violation':
        return 'ShieldAlert';
      case 'emergency':
        return 'Siren';
      case 'weather':
        return 'Cloud';
      default:
        return 'Settings';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Icon name="Bell" size={20} strokeWidth={2} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Critical Alerts</h2>
          <span className="px-2 py-0.5 bg-error text-error-foreground rounded-full text-xs font-medium">
            {alerts.filter(a => !a.acknowledged).length}
          </span>
        </div>
        <Button variant="ghost" size="sm" iconName="Filter">
          Filter
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
              <Icon name="CheckCircle2" size={32} strokeWidth={2} className="text-success" />
            </div>
            <p className="text-lg font-semibold text-foreground mb-2">All Clear</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              No critical alerts at this time. All systems operating normally.
            </p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`
                border-2 rounded-lg p-4 transition-all duration-150
                ${getSeverityStyles(alert.severity)}
                ${!alert.acknowledged ? 'shadow-md' : 'opacity-60'}
              `}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Icon
                    name={getSeverityIcon(alert.severity)}
                    size={20}
                    strokeWidth={2}
                    className={
                      alert.severity === 'critical' ? 'text-error animate-pulse' :
                      alert.severity === 'high'? 'text-warning' : 'text-accent'
                    }
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name={getTypeIcon(alert.type)} size={14} strokeWidth={2} className="text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground uppercase">
                      {alert.type}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(alert.timestamp)}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {alert.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    {alert.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="MapPin" size={12} strokeWidth={2} />
                    <span>{alert.location}</span>
                    {alert.vehicleId && (
                      <>
                        <span>•</span>
                        <span>Vehicle: {alert.vehicleId}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {!alert.acknowledged && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAcknowledge(alert.id)}
                    iconName="Check"
                    iconPosition="left"
                  >
                    Acknowledge
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(alert.id)}
                  iconName="ExternalLink"
                  iconPosition="right"
                >
                  Details
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CriticalAlertsList;