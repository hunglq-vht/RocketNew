import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { FlightRoute, WeatherCondition, CollisionAlert } from '../types';

interface FlightPlanningPanelProps {
  onPlanFlight: (route: Partial<FlightRoute>) => void;
}

const FlightPlanningPanel = ({ onPlanFlight }: FlightPlanningPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [altitude, setAltitude] = useState('');

  const mockWeather: WeatherCondition = {
    temperature: 22,
    windSpeed: 15,
    windDirection: 'NW',
    visibility: 10,
    precipitation: 0,
    conditions: 'Clear skies',
    severity: 'safe'
  };

  const mockCollisionAlerts: CollisionAlert[] = [
    {
      id: 'ca-001',
      flightId: 'FLT-2024-001',
      conflictingFlightId: 'FLT-2024-045',
      severity: 'medium',
      estimatedTime: new Date(Date.now() + 3600000),
      location: { lat: 40.7128, lng: -74.0060 },
      description: 'Potential path intersection detected',
      recommendedAction: 'Adjust altitude by 500ft or delay departure by 15 minutes'
    }
  ];

  const locationOptions = [
    { value: '', label: 'Select location' },
    { value: 'jfk', label: 'JFK International Airport' },
    { value: 'lga', label: 'LaGuardia Airport' },
    { value: 'ewr', label: 'Newark Liberty International' },
    { value: 'teb', label: 'Teterboro Airport' },
    { value: 'hpn', label: 'Westchester County Airport' }
  ];

  const handlePlanFlight = () => {
    if (origin && destination && altitude) {
      onPlanFlight({
        origin: {
          name: origin,
          coordinates: { lat: 40.7128, lng: -74.0060 }
        },
        destination: {
          name: destination,
          coordinates: { lat: 40.7589, lng: -73.9851 }
        },
        waypoints: [],
        distance: 15.5,
        estimatedDuration: 45
      });
    }
  };

  const getWeatherSeverityColor = (severity: string) => {
    switch (severity) {
      case 'safe':
        return 'text-success';
      case 'caution':
        return 'text-warning';
      case 'unsafe':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getCollisionSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-success/10 text-success border-success/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'high':
        return 'bg-error/10 text-error border-error/20';
      case 'critical':
        return 'bg-error/20 text-error border-error/30';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon name="Route" size={20} strokeWidth={2} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Flight Planning Tools</h3>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-muted rounded-md transition-colors duration-150"
          aria-label={isExpanded ? 'Collapse panel' : 'Expand panel'}
        >
          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={20} strokeWidth={2} />
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Origin"
              options={locationOptions}
              value={origin}
              onChange={(value) => setOrigin(value as string)}
              required
            />

            <Select
              label="Destination"
              options={locationOptions}
              value={destination}
              onChange={(value) => setDestination(value as string)}
              required
            />

            <Input
              label="Altitude (ft)"
              type="number"
              placeholder="Enter altitude"
              value={altitude}
              onChange={(e) => setAltitude(e.target.value)}
              required
            />
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="Cloud" size={18} strokeWidth={2} className="text-primary" />
              <h4 className="text-sm font-semibold text-foreground">Weather Conditions</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Temperature</p>
                <p className="text-sm font-medium text-foreground">{mockWeather.temperature}°C</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Wind</p>
                <p className="text-sm font-medium text-foreground">
                  {mockWeather.windSpeed} km/h {mockWeather.windDirection}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Visibility</p>
                <p className="text-sm font-medium text-foreground">{mockWeather.visibility} km</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Conditions</p>
                <p className={`text-sm font-medium ${getWeatherSeverityColor(mockWeather.severity)}`}>
                  {mockWeather.conditions}
                </p>
              </div>
            </div>
          </div>

          {mockCollisionAlerts.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="AlertTriangle" size={18} strokeWidth={2} className="text-warning" />
                <h4 className="text-sm font-semibold text-foreground">Collision Detection</h4>
              </div>
              {mockCollisionAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`border rounded-lg p-4 ${getCollisionSeverityColor(alert.severity)}`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">{alert.description}</p>
                      <p className="text-xs opacity-80">
                        Conflicting with {alert.conflictingFlightId} at{' '}
                        {alert.estimatedTime.toLocaleTimeString()}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-current/10 rounded text-xs font-medium uppercase">
                      {alert.severity}
                    </span>
                  </div>
                  <div className="bg-current/5 rounded p-2 mt-2">
                    <p className="text-xs font-medium">Recommended Action:</p>
                    <p className="text-xs opacity-90 mt-1">{alert.recommendedAction}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button
              variant="default"
              iconName="Route"
              iconPosition="left"
              onClick={handlePlanFlight}
              disabled={!origin || !destination || !altitude}
            >
              Optimize Route
            </Button>
            <Button variant="outline" iconName="Save" iconPosition="left">
              Save Draft
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightPlanningPanel;