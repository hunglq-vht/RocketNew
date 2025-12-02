import { useState, useEffect } from 'react';
import Icon from './AppIcon';

interface SystemStatus {
  connection: 'connected' | 'disconnected' | 'degraded';
  dataStream: 'active' | 'delayed' | 'inactive';
  lastUpdate: Date;
  criticalAlerts: number;
}

interface SystemStatusIndicatorProps {
  status?: SystemStatus;
  onStatusClick?: () => void;
}

const SystemStatusIndicator = ({ 
  status = {
    connection: 'connected',
    dataStream: 'active',
    lastUpdate: new Date(),
    criticalAlerts: 0
  },
  onStatusClick 
}: SystemStatusIndicatorProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getConnectionStatus = () => {
    switch (status.connection) {
      case 'connected':
        return {
          color: 'bg-success',
          icon: 'Wifi',
          label: 'Connected',
          description: 'All systems operational'
        };
      case 'degraded':
        return {
          color: 'bg-warning',
          icon: 'WifiOff',
          label: 'Degraded',
          description: 'Reduced performance detected'
        };
      case 'disconnected':
        return {
          color: 'bg-error',
          icon: 'WifiOff',
          label: 'Disconnected',
          description: 'Connection lost - attempting reconnect'
        };
      default:
        return {
          color: 'bg-muted',
          icon: 'Wifi',
          label: 'Unknown',
          description: 'Status unavailable'
        };
    }
  };

  const getDataStreamStatus = () => {
    switch (status.dataStream) {
      case 'active':
        return {
          color: 'bg-success',
          icon: 'Activity',
          label: 'Active',
          description: 'Real-time data streaming'
        };
      case 'delayed':
        return {
          color: 'bg-warning',
          icon: 'Clock',
          label: 'Delayed',
          description: 'Data stream experiencing delays'
        };
      case 'inactive':
        return {
          color: 'bg-error',
          icon: 'XCircle',
          label: 'Inactive',
          description: 'Data stream unavailable'
        };
      default:
        return {
          color: 'bg-muted',
          icon: 'Activity',
          label: 'Unknown',
          description: 'Status unavailable'
        };
    }
  };

  const formatTimeSince = (date: Date) => {
    const seconds = Math.floor((currentTime.getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const connectionStatus = getConnectionStatus();
  const dataStreamStatus = getDataStreamStatus();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onStatusClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors duration-150"
        aria-label="System status"
      >
        <div className="relative">
          <div className={`w-2 h-2 rounded-full ${connectionStatus.color} animate-pulse`}></div>
          {status.criticalAlerts > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full flex items-center justify-center">
              <span className="text-[8px] text-error-foreground font-bold">
                {status.criticalAlerts > 9 ? '9+' : status.criticalAlerts}
              </span>
            </div>
          )}
        </div>
        
        <div className="hidden md:flex items-center gap-1.5">
          <Icon name={connectionStatus.icon} size={16} strokeWidth={2} className="text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            {connectionStatus.label}
          </span>
        </div>
      </button>

      {showTooltip && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-popover border border-border rounded-lg shadow-xl z-[1200] animate-fade-in">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">System Status</h3>
              <span className="text-xs text-muted-foreground font-mono">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full ${connectionStatus.color} mt-1.5 flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Icon name={connectionStatus.icon} size={14} strokeWidth={2} className="text-muted-foreground" />
                    <span className="text-xs font-medium text-foreground">Connection</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {connectionStatus.description}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full ${dataStreamStatus.color} mt-1.5 flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Icon name={dataStreamStatus.icon} size={14} strokeWidth={2} className="text-muted-foreground" />
                    <span className="text-xs font-medium text-foreground">Data Stream</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {dataStreamStatus.description}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-muted mt-1.5 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Icon name="Clock" size={14} strokeWidth={2} className="text-muted-foreground" />
                    <span className="text-xs font-medium text-foreground">Last Update</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {formatTimeSince(status.lastUpdate)}
                  </p>
                </div>
              </div>

              {status.criticalAlerts > 0 && (
                <div className="flex items-start gap-3 pt-2 border-t border-border">
                  <div className="w-2 h-2 rounded-full bg-error mt-1.5 flex-shrink-0 animate-pulse"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Icon name="AlertOctagon" size={14} strokeWidth={2} className="text-error" />
                      <span className="text-xs font-medium text-error">Critical Alerts</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {status.criticalAlerts} active {status.criticalAlerts === 1 ? 'alert' : 'alerts'} requiring attention
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemStatusIndicator;