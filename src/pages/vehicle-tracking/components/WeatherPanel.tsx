import Icon from '../../../components/AppIcon';
import { WeatherCondition } from '../types';

interface WeatherPanelProps {
  weather: WeatherCondition;
}

const WeatherPanel = ({ weather }: WeatherPanelProps) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'clear':
        return 'Sun';
      case 'cloudy':
        return 'Cloud';
      case 'rain':
        return 'CloudRain';
      case 'storm':
        return 'CloudLightning';
      default:
        return 'Cloud';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'clear':
        return 'text-success';
      case 'cloudy':
        return 'text-accent';
      case 'rain':
        return 'text-warning';
      case 'storm':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getVisibilityStatus = (visibility: number) => {
    if (visibility >= 10) return { label: 'Excellent', color: 'text-success' };
    if (visibility >= 5) return { label: 'Good', color: 'text-accent' };
    if (visibility >= 3) return { label: 'Moderate', color: 'text-warning' };
    return { label: 'Poor', color: 'text-error' };
  };

  const visibilityStatus = getVisibilityStatus(weather.visibility);

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Icon name="Cloud" size={16} strokeWidth={2} className="text-primary" />
          Weather Conditions
        </h3>
        <div className={`flex items-center gap-1 ${getConditionColor(weather.condition)}`}>
          <Icon name={getWeatherIcon(weather.condition)} size={16} strokeWidth={2} />
          <span className="text-xs font-medium capitalize">{weather.condition}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Thermometer" size={16} strokeWidth={2} className="text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">Temperature</span>
          </div>
          <span className="text-lg font-bold font-mono text-foreground">{weather.temperature}°C</span>
        </div>

        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Wind" size={16} strokeWidth={2} className="text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">Wind Speed</span>
          </div>
          <span className="text-lg font-bold font-mono text-foreground">{weather.windSpeed} mph</span>
        </div>

        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Compass" size={16} strokeWidth={2} className="text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">Wind Direction</span>
          </div>
          <span className="text-lg font-bold font-mono text-foreground">{weather.windDirection}°</span>
        </div>

        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Eye" size={16} strokeWidth={2} className="text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">Visibility</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold font-mono text-foreground">{weather.visibility} km</span>
            <span className={`text-xs font-medium ${visibilityStatus.color}`}>({visibilityStatus.label})</span>
          </div>
        </div>
      </div>

      {weather.precipitation > 0 && (
        <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Droplets" size={16} strokeWidth={2} className="text-warning" />
            <span className="text-xs font-medium text-foreground">Precipitation</span>
          </div>
          <span className="text-sm font-bold font-mono text-foreground">{weather.precipitation} mm/hr</span>
        </div>
      )}

      {weather.alerts.length > 0 && (
        <div className="pt-3 border-t border-border space-y-2">
          <div className="flex items-center gap-2">
            <Icon name="AlertTriangle" size={16} strokeWidth={2} className="text-error" />
            <span className="text-xs font-semibold text-foreground">Weather Alerts</span>
          </div>
          {weather.alerts.map((alert, index) => (
            <div key={index} className="p-2 bg-error/10 border border-error/20 rounded-md">
              <p className="text-xs text-foreground leading-relaxed">{alert}</p>
            </div>
          ))}
        </div>
      )}

      <div className="pt-3 border-t border-border">
        <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-lg">
          <Icon name="Info" size={16} strokeWidth={2} className="text-accent flex-shrink-0 mt-0.5" />
          <p className="text-xs text-foreground leading-relaxed">
            Current weather conditions are suitable for flight operations. Monitor updates for any changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherPanel;