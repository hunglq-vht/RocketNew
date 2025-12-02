import { FC } from 'react';
import Icon from '../../../components/AppIcon';
import { WeatherCondition } from '../types';

interface WeatherPanelProps {
  conditions: WeatherCondition[];
}

const WeatherPanel: FC<WeatherPanelProps> = ({ conditions }) => {
  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase();
    if (lower.includes('clear') || lower.includes('sunny')) return 'Sun';
    if (lower.includes('cloud')) return 'Cloud';
    if (lower.includes('rain')) return 'CloudRain';
    if (lower.includes('storm')) return 'CloudLightning';
    if (lower.includes('snow')) return 'Snowflake';
    if (lower.includes('fog')) return 'CloudFog';
    return 'Cloud';
  };

  const getVisibilityStatus = (visibility: number) => {
    if (visibility >= 10) return { label: 'Excellent', color: 'text-success' };
    if (visibility >= 5) return { label: 'Good', color: 'text-primary' };
    if (visibility >= 3) return { label: 'Moderate', color: 'text-warning' };
    return { label: 'Poor', color: 'text-error' };
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Icon name="CloudSun" size={20} strokeWidth={2} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Weather Conditions</h2>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {conditions.map((condition) => {
          const visibilityStatus = getVisibilityStatus(condition.visibility);
          
          return (
            <div key={condition.id} className="bg-background border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon
                      name={getWeatherIcon(condition.conditions)}
                      size={24}
                      strokeWidth={2}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-0.5">
                      {condition.location}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {condition.conditions}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">
                    {condition.temperature}°C
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Icon name="Wind" size={16} strokeWidth={2} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Wind</p>
                    <p className="text-sm font-medium text-foreground">
                      {condition.windSpeed} km/h {condition.windDirection}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Eye" size={16} strokeWidth={2} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Visibility</p>
                    <p className={`text-sm font-medium ${visibilityStatus.color}`}>
                      {condition.visibility} km ({visibilityStatus.label})
                    </p>
                  </div>
                </div>
              </div>

              {condition.alerts.length > 0 && (
                <div className="pt-3 border-t border-border">
                  <div className="flex items-start gap-2">
                    <Icon name="AlertTriangle" size={16} strokeWidth={2} className="text-warning flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-warning mb-1">Weather Alerts</p>
                      {condition.alerts.map((alert, index) => (
                        <p key={index} className="text-xs text-muted-foreground leading-relaxed">
                          {alert}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherPanel;