import Icon from '../../../components/AppIcon';
import { Telemetry } from '../types';

interface TelemetryPanelProps {
  telemetry: Telemetry;
}

const TelemetryPanel = ({ telemetry }: TelemetryPanelProps) => {
  const getStatusColor = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value <= thresholds.critical) return 'text-error';
    if (value <= thresholds.warning) return 'text-warning';
    return 'text-success';
  };

  const getBatteryIcon = (battery: number) => {
    if (battery > 75) return 'BatteryFull';
    if (battery > 50) return 'BatteryMedium';
    if (battery > 25) return 'BatteryLow';
    return 'BatteryWarning';
  };

  const getSignalIcon = (signal: number) => {
    if (signal > 75) return 'Wifi';
    if (signal > 50) return 'Wifi';
    if (signal > 25) return 'WifiOff';
    return 'WifiOff';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Icon name="Activity" size={16} strokeWidth={2} className="text-primary" />
          Real-Time Telemetry
        </h3>
        <span className="text-xs text-muted-foreground font-mono">Live</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="Gauge" size={18} strokeWidth={2} className="text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">Altitude</span>
            </div>
            <span className="text-sm font-bold font-mono text-foreground">{Number(telemetry.altitude).toFixed(4)} ft</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="Zap" size={18} strokeWidth={2} className="text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">Speed</span>
            </div>
            <span className="text-sm font-bold font-mono text-foreground">{telemetry.speed} mph</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name={getBatteryIcon(telemetry.battery)} size={18} strokeWidth={2} className={getStatusColor(telemetry.battery, { warning: 30, critical: 15 })} />
              <span className="text-xs font-medium text-foreground">Battery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    telemetry.battery > 30 ? 'bg-success' : telemetry.battery > 15 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${telemetry.battery}%` }}
                ></div>
              </div>
              <span className={`text-sm font-bold font-mono ${getStatusColor(telemetry.battery, { warning: 30, critical: 15 })}`}>
                {telemetry.battery}%
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name={getSignalIcon(telemetry.signalStrength)} size={18} strokeWidth={2} className={getStatusColor(telemetry.signalStrength, { warning: 40, critical: 20 })} />
              <span className="text-xs font-medium text-foreground">Signal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    telemetry.signalStrength > 40 ? 'bg-success' : telemetry.signalStrength > 20 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${telemetry.signalStrength}%` }}
                ></div>
              </div>
              <span className={`text-sm font-bold font-mono ${getStatusColor(telemetry.signalStrength, { warning: 40, critical: 20 })}`}>
                {telemetry.signalStrength}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="Thermometer" size={18} strokeWidth={2} className="text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">Temperature</span>
            </div>
            <span className="text-sm font-bold font-mono text-foreground">{telemetry.temperature}°C</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="Navigation" size={18} strokeWidth={2} className="text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">GPS Accuracy</span>
            </div>
            <span className="text-sm font-bold font-mono text-foreground">±{telemetry.gpsAccuracy}m</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-border">
        <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon name="TrendingUp" size={18} strokeWidth={2} className="text-primary" />
            <span className="text-xs font-medium text-foreground">Vertical Speed</span>
          </div>
          <span className={`text-sm font-bold font-mono ${telemetry.verticalSpeed > 0 ? 'text-success' : telemetry.verticalSpeed < 0 ? 'text-warning' : 'text-foreground'}`}>
            {telemetry.verticalSpeed > 0 ? '+' : ''}{telemetry.verticalSpeed} ft/min
          </span>
        </div>
      </div>
    </div>
  );
};

export default TelemetryPanel;