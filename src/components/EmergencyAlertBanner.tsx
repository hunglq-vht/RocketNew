import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './AppIcon';

interface EmergencyAlert {
  id: string;
  severity: 'critical' | 'high' | 'medium';
  title: string;
  description: string;
  timestamp: Date;
  location?: string;
}

interface EmergencyAlertBannerProps {
  alerts?: EmergencyAlert[];
  onDismiss?: (alertId: string) => void;
}

const EmergencyAlertBanner = ({ alerts = [], onDismiss }: EmergencyAlertBannerProps) => {
  const navigate = useNavigate();
  const [activeAlerts, setActiveAlerts] = useState<EmergencyAlert[]>(alerts);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setActiveAlerts(alerts);
  }, [alerts]);

  useEffect(() => {
    if (activeAlerts.length > 1) {
      const interval = setInterval(() => {
        setCurrentAlertIndex((prev) => (prev + 1) % activeAlerts.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeAlerts.length]);

  const handleDismiss = (alertId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveAlerts(prev => prev.filter(alert => alert.id !== alertId));
    if (onDismiss) {
      onDismiss(alertId);
    }
  };

  const handleNavigateToIncidents = () => {
    navigate('/incident-management');
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-error text-error-foreground border-error';
      case 'high':
        return 'bg-warning text-warning-foreground border-warning';
      case 'medium':
        return 'bg-accent text-accent-foreground border-accent';
      default:
        return 'bg-muted text-muted-foreground border-border';
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

  if (activeAlerts.length === 0) return null;

  const currentAlert = activeAlerts[currentAlertIndex];

  return (
    <div className={`fixed top-20 left-0 right-0 z-[1100] border-b-2 ${getSeverityStyles(currentAlert.severity)} shadow-lg`}>
      <div className="max-w-screen-2xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <Icon 
                name={getSeverityIcon(currentAlert.severity)} 
                size={24} 
                strokeWidth={2}
                className="animate-pulse"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm uppercase tracking-wide">
                  {currentAlert.severity} Alert
                </span>
                {currentAlert.location && (
                  <>
                    <span className="text-xs opacity-70">•</span>
                    <span className="text-xs opacity-90">{currentAlert.location}</span>
                  </>
                )}
              </div>
              
              <div className="flex items-start gap-2">
                <p className="font-medium text-base leading-tight">
                  {currentAlert.title}
                </p>
                {!isExpanded && activeAlerts.length > 1 && (
                  <span className="flex-shrink-0 text-xs opacity-70 mt-0.5">
                    ({currentAlertIndex + 1}/{activeAlerts.length})
                  </span>
                )}
              </div>
              
              {isExpanded && (
                <p className="text-sm opacity-90 mt-1 leading-snug">
                  {currentAlert.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {activeAlerts.length > 1 && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 rounded-md hover:bg-black/10 transition-colors duration-150"
                aria-label={isExpanded ? 'Collapse alerts' : 'Expand alerts'}
              >
                <Icon 
                  name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
                  size={20} 
                  strokeWidth={2}
                />
              </button>
            )}
            
            <button
              type="button"
              onClick={handleNavigateToIncidents}
              className="px-4 py-2 bg-black/20 hover:bg-black/30 rounded-md text-sm font-medium transition-colors duration-150"
            >
              View Details
            </button>
            
            <button
              type="button"
              onClick={(e) => handleDismiss(currentAlert.id, e)}
              className="p-2 rounded-md hover:bg-black/10 transition-colors duration-150"
              aria-label="Dismiss alert"
            >
              <Icon name="X" size={20} strokeWidth={2} />
            </button>
          </div>
        </div>

        {isExpanded && activeAlerts.length > 1 && (
          <div className="mt-3 pt-3 border-t border-current/20 space-y-2">
            {activeAlerts.slice(1).map((alert) => (
              <div key={alert.id} className="flex items-center justify-between gap-4 py-2">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Icon 
                    name={getSeverityIcon(alert.severity)} 
                    size={18} 
                    strokeWidth={2}
                    className="flex-shrink-0 opacity-70"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-tight truncate">
                      {alert.title}
                    </p>
                    {alert.location && (
                      <p className="text-xs opacity-70 mt-0.5">{alert.location}</p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleDismiss(alert.id, e)}
                  className="p-1.5 rounded-md hover:bg-black/10 transition-colors duration-150 flex-shrink-0"
                  aria-label="Dismiss alert"
                >
                  <Icon name="X" size={16} strokeWidth={2} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyAlertBanner;