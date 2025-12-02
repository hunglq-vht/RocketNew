export interface AerialVehicle {
  id: string;
  callSign: string;
  type: 'drone' | 'uav' | 'helicopter' | 'fixed-wing';
  status: 'active' | 'idle' | 'emergency' | 'offline';
  position: {
    lat: number;
    lng: number;
    altitude: number;
  };
  heading: number;
  speed: number;
  battery: number;
  operator: string;
  flightPlan: string;
  lastUpdate: Date;
  image: string;
  alt: string;
}

export interface RestrictedZone {
  id: string;
  name: string;
  type: 'no-fly' | 'restricted' | 'temporary' | 'military';
  coordinates: Array<{ lat: number; lng: number }>;
  altitude: {
    min: number;
    max: number;
  };
  active: boolean;
  reason: string;
  validUntil?: Date;
}

export interface WeatherCondition {
  id: string;
  location: string;
  temperature: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  conditions: string;
  alerts: string[];
  timestamp: Date;
}

export interface TrafficMetric {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  icon: string;
  color: string;
}

export interface CriticalAlert {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: 'collision' | 'violation' | 'emergency' | 'weather' | 'system';
  title: string;
  description: string;
  vehicleId?: string;
  location: string;
  timestamp: Date;
  acknowledged: boolean;
}

export interface MapLayer {
  id: string;
  name: string;
  type: 'vehicles' | 'zones' | 'weather' | 'routes' | 'terrain';
  visible: boolean;
  icon: string;
}

export interface CommunicationChannel {
  id: string;
  name: string;
  frequency: string;
  active: boolean;
  participants: number;
}