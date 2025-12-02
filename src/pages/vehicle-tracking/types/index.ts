export interface Vehicle {
  id: string;
  name: string;
  type: 'drone' | 'helicopter' | 'fixed-wing';
  status: 'active' | 'idle' | 'maintenance' | 'emergency';
  operator: string;
  registration: string;
}

export interface Position {
  latitude: number;
  longitude: number;
  altitude: number;
  heading: number;
  timestamp: Date;
}

export interface Telemetry {
  altitude: number;
  speed: number;
  battery: number;
  signalStrength: number;
  temperature: number;
  gpsAccuracy: number;
  verticalSpeed: number;
}

export interface FlightPath {
  id: string;
  waypoints: Position[];
  estimatedTime: number;
  distance: number;
  status: 'planned' | 'active' | 'completed' | 'modified';
}

export interface WeatherCondition {
  temperature: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  precipitation: number;
  condition: 'clear' | 'cloudy' | 'rain' | 'storm';
  alerts: string[];
}

export interface MaintenanceAlert {
  id: string;
  type: 'routine' | 'urgent' | 'critical';
  component: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'scheduled' | 'completed';
}

export interface CommunicationLog {
  id: string;
  timestamp: Date;
  sender: string;
  receiver: string;
  message: string;
  type: 'voice' | 'text' | 'alert';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

export interface EmergencyControl {
  id: string;
  action: string;
  description: string;
  requiresConfirmation: boolean;
  icon: string;
}

export interface FlightHistoryPoint {
  timestamp: Date;
  position: Position;
  event?: string;
  eventType?: 'waypoint' | 'altitude-change' | 'deviation' | 'communication';
}

export interface VehicleTrackingData {
  vehicle: Vehicle;
  currentPosition: Position;
  telemetry: Telemetry;
  flightPath: FlightPath;
  weather: WeatherCondition;
  maintenanceAlerts: MaintenanceAlert[];
  communicationLogs: CommunicationLog[];
  performanceMetrics: PerformanceMetric[];
  emergencyControls: EmergencyControl[];
  flightHistory: FlightHistoryPoint[];
}