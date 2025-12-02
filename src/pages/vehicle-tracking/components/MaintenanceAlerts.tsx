import Icon from '../../../components/AppIcon';
import { MaintenanceAlert } from '../types';

interface MaintenanceAlertsProps {
  alerts: MaintenanceAlert[];
  onAlertClick?: (alertId: string) => void;
}

const MaintenanceAlerts = ({ alerts, onAlertClick }: MaintenanceAlertsProps) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return 'AlertOctagon';
      case 'urgent':
        return 'AlertTriangle';
      case 'routine':
        return 'Wrench';
      default:
        return 'Tool';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-error/10 border-error/20 text-error';
      case 'urgent':
        return 'bg-warning/10 border-warning/20 text-warning';
      case 'routine':
        return 'bg-accent/10 border-accent/20 text-accent';
      default:
        return 'bg-muted/50 border-border text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-error text-error-foreground';
      case 'scheduled':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDaysUntil = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Icon name="Wrench" size={16} strokeWidth={2} className="text-primary" />
          Maintenance Alerts
        </h3>
        <span className="text-xs text-muted-foreground">{alerts.length} active</span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} strokeWidth={1.5} className="text-success mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No maintenance alerts</p>
            <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const daysUntil = getDaysUntil(alert.dueDate);
            return (
              <div
                key={alert.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all duration-150 hover:shadow-md ${getAlertColor(alert.type)}`}
                onClick={() => onAlertClick && onAlertClick(alert.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background flex items-center justify-center">
                    <Icon name={getAlertIcon(alert.type)} size={16} strokeWidth={2} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                        {alert.type}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(alert.status)}`}>
                        {alert.status}
                      </span>
                    </div>

                    <p className="text-sm font-medium text-foreground mb-1">{alert.component}</p>
                    <p className="text-xs text-foreground/80 leading-relaxed mb-2">{alert.description}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-current/10">
                      <div className="flex items-center gap-1 text-xs text-foreground/70">
                        <Icon name="Calendar" size={12} strokeWidth={2} />
                        <span>Due: {formatDate(alert.dueDate)}</span>
                      </div>
                      {daysUntil <= 7 && (
                        <span className={`text-xs font-medium ${daysUntil <= 0 ? 'text-error' : 'text-warning'}`}>
                          {daysUntil <= 0 ? 'Overdue' : `${daysUntil} days left`}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MaintenanceAlerts;